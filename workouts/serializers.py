# workouts/serializers.py

from rest_framework import serializers
from .models import Workout, Exercise, Set
from .services import create_full_workout


class SetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Set
        fields = ["id", "reps"]


class ExerciseSerializer(serializers.ModelSerializer):
    sets = SetSerializer(many=True)

    class Meta:
        model = Exercise
        fields = ["id", "name_of_exercise", "sets"]


class WorkoutSerializer(serializers.ModelSerializer):
    exercises = ExerciseSerializer(many=True)

    class Meta:
        model = Workout
        fields = ["id", "week", "day", "exercises"]

    def create(self, validated_data):

        exercises_data = validated_data.pop("exercises", [])

        user = self.context["request"].user

        workout = create_full_workout(
            user=user,
            week=validated_data["week"],
            day=validated_data["day"],
            exercises_data=exercises_data,
        )

        return workout
