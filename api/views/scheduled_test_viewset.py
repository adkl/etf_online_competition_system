from django.utils import timezone
import datetime
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import list_route
from rest_framework.response import Response
from rest_framework.mixins import RetrieveModelMixin
from api.models import ScheduledTest
from api.serializers import ScheduledTestListSerializer, ScheduledTestDetailsSerializer


class ScheduledTestViewSet(ModelViewSet, RetrieveModelMixin):

    queryset = ScheduledTest.objects.all()

    @list_route(methods=['GET'], url_path='available-tests')
    def get_available_scheduled_tests(self, request):
        available_tests = self.queryset.filter(start__gt=timezone.now())
        serializer = ScheduledTestListSerializer(available_tests, many=True)
        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        test_pk = kwargs.get('pk')
        test = self.queryset.filter(start__gt=timezone.now()).get(id=test_pk)
        serializer = ScheduledTestDetailsSerializer(test)
        return Response(serializer.data)


