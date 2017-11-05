from rest_framework.viewsets import ModelViewSet

from api.models import Subject
from api.permissions import SubjectPermission
from api.serializers import SubjectSerializer


class SubjectViewSet(ModelViewSet):
    queryset = Subject.objects.all()
    # permission_classes = SubjectPermission
    serializer_class = SubjectSerializer
