from django.utils import timezone
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import list_route
from rest_framework.response import Response
from rest_framework.mixins import RetrieveModelMixin
from api.models import ScheduledTest
from api.serializers import ScheduledTestListSerializer, ScheduledTestDetailsSerializer, SubmittedTestListSerializer


class ScheduledTestViewSet(ModelViewSet, RetrieveModelMixin):

    queryset = ScheduledTest.objects.all()

    @list_route(methods=['GET'], url_path='available-tests')
    def get_available_scheduled_tests(self, request):
        user = request.user
        available_tests = self.queryset.filter(start__gt=timezone.now()).exclude(results__student__user_details=user)
        serializer = ScheduledTestListSerializer(available_tests, many=True)
        return Response(serializer.data)

    @list_route(methods=['GET'], url_path='submitted-tests')
    def get_submitted_tests(self, request):
        user = request.user
        submitted_tests = self.queryset.filter(results__student__user_details=user)
        serializer = SubmittedTestListSerializer(submitted_tests, many=True, context={'user': user})
        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        test_pk = kwargs.get('pk')
        user = request.user
        test = self.queryset.filter(start__gt=timezone.now())\
            .exclude(results__student__user_details=user)\
            .get(id=test_pk)
        serializer = ScheduledTestDetailsSerializer(test)
        return Response(serializer.data)


