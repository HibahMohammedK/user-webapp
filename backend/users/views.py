from rest_framework import generics, permissions
from .serializers import UserSerializer
from .models import User

# Get or update profile
class ProfileView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    # make it fetch only the logged-in user
    def get_object(self):
        return self.request.user
