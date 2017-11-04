from django.db import models
from django.contrib.auth.models import User


class BaseModel(models.Model):
    class Meta:
        abstract = True


class AppUser(BaseModel):
    jmbg = models.CharField(max_length=11)

    user_details = models.OneToOneField(User)


class Subject(BaseModel):
    title = models.CharField(max_length=255)


class QuestionType(BaseModel):
    title = models.CharField(max_length=255)


class TestSetup(BaseModel):
    subject = models.ForeignKey(Subject, related_name="test_setups")
    creator = models.ForeignKey(AppUser, related_name="test_setups")


class Question(BaseModel):
    text = models.CharField(max_length=1023)

    test_setup = models.ForeignKey(TestSetup, on_delete=models.CASCADE, related_name="questions")
    question_type = models.ForeignKey(QuestionType, related_name="questions")


class ScheduledTest(BaseModel):
    start = models.DateTimeField()
    duration = models.DecimalField(max_digits=5, decimal_places=2)

    test_setup = models.ForeignKey(TestSetup, related_name="scheduled_tests")
    creator = models.ForeignKey(AppUser, related_name="scheduled_tests")


class ScheduledTestResult(BaseModel):
    comment = models.CharField(max_length=1024)

    scheduled_test = models.ForeignKey(ScheduledTest, related_name="results")
    student = models.ForeignKey(AppUser, related_name="results")
    reviewer = models.ForeignKey(AppUser, related_name="scheduled_test_results")


class PredefinedAnswer(BaseModel):
    text = models.CharField(max_length=1024)

    question = models.ForeignKey(Question, related_name="predefined_answers")


class Answer(BaseModel):
    text = models.CharField(max_length=4096)
    comment = models.CharField(max_length=4096)
    points = models.DecimalField(max_digits=5, decimal_places=2)

    question = models.ForeignKey(Question, related_name="answers")
    scheduled_test_result = models.ForeignKey(ScheduledTestResult, related_name="answers")
    predefined_answers = models.ManyToManyField(PredefinedAnswer, related_name="answers")






