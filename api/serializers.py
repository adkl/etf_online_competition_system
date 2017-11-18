from rest_framework import serializers
from api.models import Subject, ScheduledTest


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