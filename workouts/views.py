# workouts/views.py

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import Workout, Set
from .serializers import WorkoutSerializer, SetSerializer
from .services import create_workout, delete_workout, update_set
from .selectors import get_user_workouts


# ---------------- WORKOUT LIST + CREATE ----------------
class WorkoutListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        workouts = get_user_workouts(request.user)
        serializer = WorkoutSerializer(workouts, many=True)
        return Response(serializer.data)

    def post(self, request):
        workout = create_workout(user=request.user)
        serializer = WorkoutSerializer(workout)
        return Response(serializer.data, status=201)


# ---------------- WORKOUT DETAIL (READ + DELETE) ----------------
class WorkoutDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        workout = Workout.objects.get(id=pk, user=request.user)
        serializer = WorkoutSerializer(workout)
        return Response(serializer.data)

    def delete(self, request, pk):
        workout = Workout.objects.get(id=pk, user=request.user)
        delete_workout(workout)
        return Response({"detail": "Deleted"})


# ---------------- SET UPDATE ----------------
class SetUpdateView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, pk):
        set_instance = Set.objects.get(id=pk, workout__user=request.user)

        updated_set = update_set(set_instance, **request.data)

        serializer = SetSerializer(updated_set)
        return Response(serializer.data)
