from django.db import models
from django.contrib.auth.models import User


class BaseModel(models.Model):
    class Meta:
        abstract = True


class AppUser(BaseModel):
    jmbg = models.CharField(max_length=13)

    user_details = models.OneToOneField(User)

    def __str__(self):
        return self.user_details.first_name + " " + self.user_details.last_name \
                + " | " + self.user_details.groups.first().name


class Subject(BaseModel):
    title = models.CharField(max_length=255)

    def __str__(self):
        return self.title


class QuestionType(BaseModel):
    title = models.CharField(max_length=255)

    def __str__(self):
        return self.title


class TestSetup(BaseModel):
    title = models.CharField(max_length=255)

    subject = models.ForeignKey(Subject, related_name="test_setups")
    creator = models.ForeignKey(AppUser, related_name="test_setups")

    def __str__(self):
        return self.title


class Question(BaseModel):
    text = models.CharField(max_length=1023)

    test_setup = models.ForeignKey(TestSetup, on_delete=models.CASCADE, related_name="questions")
    question_type = models.ForeignKey(QuestionType, related_name="questions")

    def __str__(self):
        if len(self.text) > 100:
            return self.text[:100].join("...")
        return self.text


class ScheduledTest(BaseModel):
    start = models.DateTimeField()
    duration = models.DecimalField(verbose_name="Duration (in hours)", max_digits=5, decimal_places=2)

    test_setup = models.ForeignKey(TestSetup, related_name="scheduled_tests")
    creator = models.ForeignKey(AppUser, related_name="scheduled_tests")

    def __str__(self):
        return self.test_setup.title +  " | " + self.test_setup.subject.title + \
               " | {}".format(self.start.date()) + " | Duration: {} h".format(self.duration)


class ScheduledTestResult(BaseModel):
    comment = models.CharField(max_length=1024, null=True)

    scheduled_test = models.ForeignKey(ScheduledTest, related_name="results")
    student = models.ForeignKey(AppUser, related_name="results")
    reviewer = models.ForeignKey(AppUser, related_name="scheduled_test_results", null=True)

    def __str__(self):
        return self.scheduled_test.test_setup.title + " | Student: " + self.student.user_details.first_name + \
                " " + self.student.user_details.last_name


class PredefinedAnswer(BaseModel):
    text = models.CharField(max_length=1024)

    question = models.ForeignKey(Question, related_name="predefined_answers")

    def __str__(self):
        return self.text


class Answer(BaseModel):
    text = models.CharField(max_length=4096)
    comment = models.CharField(max_length=4096, null=True)
    points = models.DecimalField(max_digits=5, decimal_places=2, null=True)

    question = models.ForeignKey(Question, related_name="answers")
    scheduled_test_result = models.ForeignKey(ScheduledTestResult, null=True, related_name="answers")
    predefined_answers = models.ManyToManyField(PredefinedAnswer, null=True, related_name="answers")

    def __str__(self):
        return self.text






