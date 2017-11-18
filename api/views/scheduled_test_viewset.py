from django.utils import timezone
import datetime
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import list_route
from rest_framework.response import Response
from api.models import ScheduledTest
from api.serializers import ScheduledTestListSerializer


class ScheduledTestViewSet(ModelViewSet):

    queryset = ScheduledTest.objects.all()

    @list_route(methods=['GET'], url_path='available-tests')
    def get_available_scheduled_tests(self, request):
        available_test = self.queryset.filter(start__gt=timezone.now())
        serializer = ScheduledTestListSerializer(available_test, many=True)
        return Response(serializer.data)
