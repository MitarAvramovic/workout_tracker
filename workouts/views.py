from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated

from .serializers import WorkoutSerializer
from .selectors import get_user_workouts
from .services import create_full_workout, update_full_workout


class WorkoutViewSet(ModelViewSet):
    serializer_class = WorkoutSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        params = self.request.query_params

        return get_user_workouts(
            user=self.request.user,
            search=params.get("search"),
            week=params.get("week"),
            day=params.get("day"),
            ordering=params.get("ordering"),
        )

    def perform_create(self, serializer):
        create_full_workout(
            user=self.request.user,
            week=serializer.validated_data["week"],
            day=serializer.validated_data["day"],
            exercises_data=serializer.validated_data["exercises"],
        )

    def perform_update(self, serializer):
        update_full_workout(
            workout_id=self.get_object().id,
            user=self.request.user,
            week=serializer.validated_data["week"],
            day=serializer.validated_data["day"],
            exercises_data=serializer.validated_data["exercises"],
        )
