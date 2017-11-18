from rest_framework import serializers
from api.models import Subject, ScheduledTest, AppUser
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


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'username']


class AppUserSerializer(serializers.ModelSerializer):

    user_details = UserSerializer()

    class Meta:
        model = AppUser
        fields = '__all__'

