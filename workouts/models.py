# workouts/models.py

from django.db import models
from django.conf import settings


class Workout(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "workout"


class Exercise(models.Model):
    exercise = models.CharField(max_length=100)

    class Meta:
        db_table = "exercise"


class Set(models.Model):
    reps = models.IntegerField()
    workout = models.ForeignKey(Workout, on_delete=models.CASCADE, related_name="sets")
    exercise = models.ForeignKey(Exercise, on_delete=models.CASCADE)

    class Meta:
        db_table = "set"
