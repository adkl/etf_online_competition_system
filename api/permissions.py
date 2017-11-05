from rest_framework.permissions import BasePermission


class SubjectPermission(BasePermission):
    def has_permission(self, request, view):
        if view.action == 'list':
            return request.user.is_authenticated()
        else:
            return False