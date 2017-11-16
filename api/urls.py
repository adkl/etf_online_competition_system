from django.conf.urls import url, include
from rest_framework.routers import SimpleRouter

from api.views import SubjectViewSet, oracle_view


router = SimpleRouter()
router.register(r'subjects', SubjectViewSet)


urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'oracle-query/', oracle_view)
]
