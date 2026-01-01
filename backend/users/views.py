from rest_framework import generics, permissions
from .serializers import UserSerializer
from .models import User

class ProfileView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    # fetch only logged-in user
    def get_object(self):
        return self.request.user

