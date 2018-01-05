from django.db.models import F
from django.utils import timezone
from rest_framework.viewsets import ModelViewSet, ViewSet
from rest_framework.decorators import list_route, detail_route
from rest_framework.response import Response
from rest_framework.mixins import RetrieveModelMixin
from api.models import ScheduledTest
from api.serializers import ScheduledTestListSerializer, ScheduledTestDetailsSerializer, SubmittedTestListSerializer


class ScheduledTestViewSet(ModelViewSet, RetrieveModelMixin):

    queryset = ScheduledTest.objects.all()

    @list_route(methods=['GET'], url_path='available-tests')
    def get_available_scheduled_tests(self, request):
        user = request.user
        # available_tests = \
        #     self.queryset.filter(start__gte=timezone.now())\
        #                  .exclude(results__student__user_details=user)
        #                  .union(self.queryset.filter(start__range=(timezone.now(), timezone.now() + timezone.timedelta(hours=F('duration')))))

        available_tests = list(self.queryset.exclude(results__student__user_details=user))
        for test in available_tests:
            if test.start > timezone.now():
                continue
            if test.start <= timezone.now() <= test.start + timezone.timedelta(hours=float(test.duration)):
                continue
            available_tests.remove(test)

        serializer = ScheduledTestListSerializer(available_tests, many=True)
        return Response(serializer.data)

    @list_route(methods=['GET'], url_path='submitted-tests')
    def get_submitted_tests(self, request):
        user = request.user
        submitted_tests = self.queryset.filter(results__student__user_details=user)
        serializer = SubmittedTestListSerializer(submitted_tests, many=True, context={'user': user})
        return Response(serializer.data)

    # @detail_route(methods=['GET'], url_path='submitted-test')
    # def get_single_submitted_test(self, request, pk=None):
    #     raise NotImplemented

    def retrieve(self, request, *args, **kwargs):
        test_pk = kwargs.get('pk')
        user = request.user
        try:
            test = self.queryset.filter(start__lte=timezone.now())\
                .exclude(results__student__user_details=user)\
                .get(id=test_pk)
        except ScheduledTest.DoesNotExist:
            return Response({"error": "Please wait until the test get started"}, status=404)

        # check if a test has expired
        # noinspection PyTypeChecker
        if test.start <= timezone.now() < test.start + timezone.timedelta(hours=float(test.duration)):
            serializer = ScheduledTestDetailsSerializer(test)
            return Response(serializer.data)

        else:
            return Response({"error": "The test has expired"}, status=404)



