# noinspection PyUnresolvedReferences
from django.contrib import admin
from django.db import models
from django import forms
from django.contrib.admin import AdminSite
from django.contrib.auth.models import Group
# noinspection PyUnresolvedReferences
from api.models import TestSetup, ScheduledTestResult, ScheduledTest, Subject, Question, QuestionType, Answer, \
    PredefinedAnswer, AppUser, User
from nested_admin import nested


class ETFOCSAdminSite(AdminSite):
    site_header = 'ETF Online Competition System - ADMINISTRATION PANEL'


class ScheduledTestAdmin(nested.NestedModelAdmin):
    readonly_fields = ['creator']

    def save_model(self, request, obj, form, change):
        app_user = AppUser.objects.get(user_details=request.user)
        obj.creator = app_user
        super(ScheduledTestAdmin, self).save_model(request, obj, form, change)


class PredefinedAnswerAdminInline(nested.NestedStackedInline):
    model = PredefinedAnswer
    formfield_overrides = {
        models.CharField: {'widget': forms.TextInput(attrs={'size': 130})}
    }
    extra = 0


class QuestionAdminInline(nested.NestedStackedInline):
    model = Question
    inlines = [
        PredefinedAnswerAdminInline
    ]
    extra = 3
    formfield_overrides = {
        models.CharField: {'widget': forms.Textarea(attrs={'rows': 4, 'cols': 130})}
    }


class TestSetupAdmin(nested.NestedModelAdmin):
    inlines = [
        QuestionAdminInline,
    ]
    formfield_overrides = {
        models.CharField: {'widget': forms.TextInput(attrs={'size': 60})}
    }
    readonly_fields = ['creator']

    def save_model(self, request, obj, form, change):
        app_user = AppUser.objects.get(user_details=request.user)
        obj.creator = app_user
        super(TestSetupAdmin, self).save_model(request, obj, form, change)


# noinspection SpellCheckingInspection
class UserAdminForm(forms.ModelForm):
    jmbg = forms.CharField(max_length=13, required=True, label="JMBG")

    def save(self, commit=True):
        return super(UserAdminForm, self).save(commit=commit)

    class Meta:
        model = User
        fields = '__all__'


class UserAdmin(nested.NestedModelAdmin):
    form = UserAdminForm

    def save_model(self, request, obj, form, change):
        # TODO A.A: This is not working but will fix it soon (hope so) :D
        app_user = AppUser(jmbg=form.cleaned_data.get('jmbg'))
        app_user.user_details = obj
        obj.save()


class AnswerAdminInline(nested.NestedStackedInline):
    model = Answer
    formfield_overrides = {
        models.CharField: {'widget': forms.Textarea(attrs={'rows': 2, 'cols': 130})}
    }
    readonly_fields = [
        'question', 'text', 'predefined_answers'
    ]
    fields = ('question', 'text', 'predefined_answers', 'points', 'comment')


class ScheduledTestResultAdmin(nested.NestedModelAdmin):
    inlines = [
        AnswerAdminInline
    ]
    readonly_fields = ['scheduled_test', 'student', 'reviewer']
    fields = ('scheduled_test', 'student', 'reviewer')

    def save_model(self, request, obj, form, change):
        app_user = AppUser.objects.get(user_details=request.user)
        obj.reviewer = app_user
        super(ScheduledTestResultAdmin, self).save_model(request, obj, form, change)


admin_site = ETFOCSAdminSite(name='admin')
admin_site.register(TestSetup, TestSetupAdmin)
admin_site.register(ScheduledTest, ScheduledTestAdmin)
admin_site.register(ScheduledTestResult, ScheduledTestResultAdmin)
admin_site.register(Subject)
# admin_site.register(QuestionType)
# admin_site.register(Answer)
# admin_site.register(PredefinedAnswer)
# admin_site.register(Question)
admin_site.register(AppUser)
admin_site.register(User, UserAdmin)
admin_site.register(Group)
