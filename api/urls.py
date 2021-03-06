from django.conf.urls import url, include
from rest_framework.routers import SimpleRouter

from api.views import SubjectViewSet, oracle_view, ScheduledTestViewSet, UserProfileViewSet
from api.views.scheduled_test_result_viewset import ScheduledTestResultViewSet

router = SimpleRouter()
router.register(r'subjects', SubjectViewSet)
router.register(r'scheduled-tests', ScheduledTestViewSet)
router.register(r'scheduled-test-result', ScheduledTestResultViewSet)
router.register(r'user', UserProfileViewSet)


urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^oracle-query/', oracle_view)
]
