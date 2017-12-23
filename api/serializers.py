from django.db.models import Sum
from rest_framework import serializers
from api.models import Subject, ScheduledTest, AppUser, TestSetup, Question, PredefinedAnswer, ScheduledTestResult, \
    Answer
from django.contrib.auth.models import User


class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = '__all__'


class ScheduledTestListSerializer(serializers.ModelSerializer):

    subject = serializers.SerializerMethodField()
    title = serializers.SerializerMethodField()

    def get_subject(self, scheduled_test):
        return scheduled_test.test_setup.subject.title

    def get_title(self, scheduled_test):
        return scheduled_test.test_setup.title

    class Meta:
        model = ScheduledTest
        fields = ['id', 'start', 'duration', 'subject', 'title']


class SubmittedTestListSerializer(serializers.ModelSerializer):

    reviewed = serializers.SerializerMethodField()
    subject = serializers.SerializerMethodField()
    title = serializers.SerializerMethodField()
    points_sum = serializers.SerializerMethodField()

    class Meta:
        model = ScheduledTest
        fields = ['id', 'subject', 'title', 'reviewed', 'points_sum']

    def get_reviewed(self, scheduled_test):
        user = self.context.get('user')
        reviewer = scheduled_test.results.get(student__user_details=self.context.get('user')).reviewer
        return True if reviewer is not None else False

    def get_subject(self, scheduled_test):
        return scheduled_test.test_setup.subject.title

    def get_title(self, scheduled_test):
        return scheduled_test.test_setup.title

    def get_points_sum(self, scheduled_test):
        reviewer = scheduled_test.results.get(student__user_details=self.context.get('user')).reviewer
        if reviewer is not None:
            user_result: ScheduledTestResult = scheduled_test.results.get(student__user_details=self.context.get('user'))
            return user_result.answers.aggregate(Sum('points')).get('points__sum')
        else:
            return None



class PredefinedAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = PredefinedAnswer
        fields = '__all__'


class QuestionSerializer(serializers.ModelSerializer):

    predefined_answers = PredefinedAnswerSerializer(many=True)

    class Meta:
        model = Question
        fields = '__all__'


class TestSetupSerializer(serializers.ModelSerializer):

    questions = QuestionSerializer(many=True)

    class Meta:
        model = TestSetup
        fields = '__all__'


class ScheduledTestDetailsSerializer(serializers.ModelSerializer):

    test_setup = TestSetupSerializer()

    class Meta:
        model = ScheduledTest
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'username']


class AppUserSerializer(serializers.ModelSerializer):

    user_details = UserSerializer()

    class Meta:
        model = AppUser
        fields = '__all__'


class SubmitAnswerSerializer(serializers.ModelSerializer):

    id = serializers.IntegerField()
    selected = serializers.ListField(child=serializers.IntegerField())

    class Meta:
        model = Answer
        fields = ['id', 'selected']


class SubmitScheduledTestResultSerializer(serializers.ModelSerializer):

    id = serializers.IntegerField()
    answers = SubmitAnswerSerializer(many=True)

    class Meta:
        model = ScheduledTestResult
        fields = ['id', 'answers']
