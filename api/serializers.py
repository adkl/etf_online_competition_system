from rest_framework import serializers
from api.models import Subject, ScheduledTest


class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = '__all__'


class ScheduledTestListSerializer(serializers.ModelSerializer):

    subject = serializers.SerializerMethodField()

    def get_subject(self, obj):
        pass

    class Meta:
        model = ScheduledTest
        fields = ['start, duration']