# adminpanel/urls.py
from rest_framework.routers import DefaultRouter
from .views import AdminUserViewSet
from django.urls import path, include

router = DefaultRouter()
router.register(r'users', AdminUserViewSet, basename='admin-users')

urlpatterns = [
    path('', include(router.urls)),
]
