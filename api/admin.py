from django.contrib import admin
from api.models import TestSetup, ScheduledTestResult, ScheduledTest, Subject, Question, \
QuestionType, Answer, PredefinedAnswer, AppUser


class QuestionInline(admin.TabularInline):
    model = Question


class TestSetupAdmin(admin.ModelAdmin):
    inlines = [
        QuestionInline,
    ]


admin.site.register(TestSetup, TestSetupAdmin)
admin.site.register(ScheduledTest)
admin.site.register(ScheduledTestResult)
admin.site.register(Subject)
admin.site.register(QuestionType)
admin.site.register(Answer)
admin.site.register(PredefinedAnswer)
admin.site.register(Question)
admin.site.register(AppUser)


