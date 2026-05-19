#workouts/serializers.py

from rest_framework import serializers
from .models import Workout, Exercise, Set


class SetSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)

    class Meta:
        model = Set
        fields = ["id", "reps"]

    def validate_reps(self, value):
        
        if value < 1:
            raise serializers.ValidationError("Reps must be at least 1.")
        
        if value > 10000:
            raise serializers.ValidationError("Reps cannot exceed 10000.")
        
        return value

class ExerciseSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    sets = SetSerializer(many=True)

    class Meta:
        model = Exercise
        fields = ["id", "name_of_exercise", "sets"]

    def validate_exercise_name(self, value):
        
        if len(value.strip()) < 2:
            raise serializers.ValidationError("Exercise name must be at least 2 characters.")
        
        return value.strip()
    
    def valdate_sets(self, value):

        if len(value) < 1:
            raise serializers.ValidationError("Exercise must have at least 1 set.")
        
        return value


class WorkoutSerializer(serializers.ModelSerializer):
    exercises = ExerciseSerializer(many=True)
    
    class Meta:
        model = Workout
        fields = ["id", "week", "day", "exercises"]


    def validate_week(self, value):
        
        if value < 1:
            raise serializers.ValidationError("Week must be at least 1")
        
        return value
    
    def validate_day(self, value):

        if value < 1:
            raise serializers.ValidationError("Day must be at least 1")
        
        if value > 7:
            raise serializers.ValidationError("Day cannot exceed7.")
        
        return value

    def validate_exercises(self, value):

        if len(value) < 1:
            raise serializers.ValidationError("Workout must have at least 1 exercise")
        
        return value
