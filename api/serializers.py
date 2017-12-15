from rest_framework import serializers
from api.models import Subject, ScheduledTest, AppUser, TestSetup, Question, PredefinedAnswer, ScheduledTestResult, \
    Answer
from django.contrib.auth.models import User


class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = '__all__'


class ScheduledTestListSerializer(serializers.ModelSerializer):

    # subject = serializers.SerializerMethodField()
    #
    # def get_subject(self, obj):
    #     pass

    # start = serializers.DateTimeField()
    # duration = serializers.DecimalField(max_digits=5, decimal_places=2)

    class Meta:
        model = ScheduledTest
        fields = ['id', 'start', 'duration']


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
