from django.contrib import admin
from django.contrib.admin import AdminSite
from django.contrib.auth.models import Group
from api.models import TestSetup, ScheduledTestResult, ScheduledTest, Subject, Question, \
QuestionType, Answer, PredefinedAnswer, AppUser, User
from nested_admin import nested

class ETFOCSAdminSite(AdminSite):
    site_header = 'ETF Online Competition System - ADMINISTRATION PANEL'


class PredefinedAnswerInline(nested.NestedStackedInline):
    model = PredefinedAnswer


class QuestionInline(nested.NestedStackedInline):
    model = Question
    inlines = [
        PredefinedAnswerInline
    ]


class TestSetupAdmin(nested.NestedModelAdmin):
    exclude = ['creator']
    inlines = [
        QuestionInline,
    ]

    def save_model(self, request, obj, form, change):
        app_user = AppUser.objects.get(user_details=request.user)
        obj.creator = app_user
        super(TestSetupAdmin, self).save_model(request, obj, form, change)


admin_site = ETFOCSAdminSite(name='admin')
admin_site.register(TestSetup, TestSetupAdmin)
admin_site.register(ScheduledTest)
admin_site.register(ScheduledTestResult)
admin_site.register(Subject)
admin_site.register(QuestionType)
admin_site.register(Answer)
admin_site.register(PredefinedAnswer)
admin_site.register(Question)
admin_site.register(AppUser)
admin_site.register(User)
admin_site.register(Group)

