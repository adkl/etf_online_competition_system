from django.contrib import admin
from api.models import TestSetup, ScheduledTestResult, ScheduledTest, Subject, Question, \
QuestionType, Answer, PredefinedAnswer, AppUser

admin.site.register(TestSetup)
admin.site.register(ScheduledTest)
admin.site.register(ScheduledTestResult)
admin.site.register(Subject)
admin.site.register(QuestionType)
admin.site.register(Answer)
admin.site.register(PredefinedAnswer)
admin.site.register(Question)
admin.site.register(AppUser)
