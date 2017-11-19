from rest_framework.viewsets import ModelViewSet
from api.models import AppUser
from api.serializers import AppUserSerializer


class UserProfileViewSet(ModelViewSet):
    queryset = AppUser.objects.all()
    serializer_class = AppUserSerializer
