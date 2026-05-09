# workouts/views.py

from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated

from .serializers import WorkoutSerializer
from .selectors import get_user_workouts



class WorkoutViewSet(ModelViewSet):
    serializer_class = WorkoutSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return get_user_workouts(user=self.request.user)

    def get_serializer_context(self):
        return {
            "request": self.request
        }
