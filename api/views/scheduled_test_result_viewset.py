from rest_framework import status
from rest_framework.mixins import CreateModelMixin
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from api.models import ScheduledTestResult, PredefinedAnswer, ScheduledTest, AppUser, Answer
from api.serializers import SubmitScheduledTestResultSerializer


class ScheduledTestResultViewSet(ModelViewSet, CreateModelMixin):

    queryset = ScheduledTestResult.objects.all()

    def get_serializer_class(self):
        return SubmitScheduledTestResultSerializer

    def create(self, request, *args, **kwargs):
        self.__save_test_result(**{**request.data, "student": request.user})
        return Response(status=status.HTTP_201_CREATED)

    def __save_test_result(self, **kwargs):
        # TODO: ANISA -> put an if statement to check if a user already submitted a test

        result = ScheduledTestResult()

        scheduled_test_id = kwargs.get('id')
        answers = kwargs.get('answers')
        scheduled_test = \
            ScheduledTest.objects.prefetch_related('test_setup__questions') \
                                 .prefetch_related('test_setup__questions__predefined_answers') \
                                 .get(id=scheduled_test_id)
        result.scheduled_test = scheduled_test
        result.student = AppUser.objects.get(user_details=kwargs.get('student'))
        result.save()

        # TODO Google queryset bulk create and create objects with many-to-many relations -> pava Google..
        for answer in answers:
            new_answer = Answer()

            question_id = answer.get('id')
            answer_text = answer.get('text')
            selected_answers = answer.get('selected')

            predefined_answers = []
            for predefined_answer_id in selected_answers:
                predefined_answer = PredefinedAnswer.objects.get(id=predefined_answer_id)
                predefined_answers.append(predefined_answer)

            if answer_text is not None:
                new_answer.text = answer_text
            new_answer.question_id = question_id
            new_answer.scheduled_test_result = result
            new_answer.save()

            if len(selected_answers) > 0:
                new_answer.predefined_answers = predefined_answers
                new_answer.save()

        result.save()