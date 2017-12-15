from rest_framework.mixins import CreateModelMixin
from rest_framework.viewsets import ModelViewSet

from api.models import ScheduledTestResult, PredefinedAnswer, ScheduledTest
from api.serializers import SubmitScheduledTestResultSerializer


class ScheduledTestResultViewSet(ModelViewSet, CreateModelMixin):

    queryset = ScheduledTestResult.objects.all()

    def get_serializer_class(self):
        return SubmitScheduledTestResultSerializer

    def perform_create(self, serializer):
        pass

    def __save_test_result(self, **kwargs):
        result = ScheduledTestResult()

        scheduled_test_id = kwargs.get('id')
        scheduled_test = \
            ScheduledTest.objects.prefetch_related('test_setup__questions') \
                                 .prefetch_related('test_setup__questions__predefined_answers')
        result.scheduled_test_id = scheduled_test_id
        # TODO Google queryset bulk create and create objects with many-to-many relations
        answers = kwargs.get('answers')
        for answer in answers:
            answer_id = answer.get('id')
            text = answer.get('text')
            selected = answer.get('selected')
            for predefined_answer_id in selected:
                predefined_answer = PredefinedAnswer.objects.get(id=predefined_answer_id)