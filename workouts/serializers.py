from rest_framework import serializers
from .models import Workout, Exercise, Set


class SetSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)

    class Meta:
        model = Set
        fields = ["id", "reps"]


class ExerciseSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    sets = SetSerializer(many=True)

    class Meta:
        model = Exercise
        fields = ["id", "name_of_exercise", "sets"]


class WorkoutSerializer(serializers.ModelSerializer):
    exercises = ExerciseSerializer(many=True)

    class Meta:
        model = Workout
        fields = ["id", "week", "day", "exercises"]

    # nema create() ni update() — serializer samo validira
