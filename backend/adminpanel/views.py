# adminpanel/views.py
from rest_framework import viewsets, filters, permissions
from users.models import User
from .serializers import AdminUserSerializer

class AdminUserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('id')
    serializer_class = AdminUserSerializer
    permission_classes = [permissions.IsAdminUser]
    filter_backends = [filters.SearchFilter]
    search_fields = ['username', 'email']
