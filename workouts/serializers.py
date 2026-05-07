# workouts/serializers.py

from rest_framework import serializers
from .models import Workout, Set


class SetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Set
        fields = ["id", "exercise", "reps"]


class WorkoutSerializer(serializers.ModelSerializer):
    sets = SetSerializer(many=True, read_only=True)

    class Meta:
        model = Workout
        fields = ["id", "user", "date", "sets"]
