from django.urls import path
from .views import ProfileView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("profile/", ProfileView.as_view(), name="profile"),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
