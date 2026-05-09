# workouts/models.py

from django.db import models
from django.conf import settings


class Workout(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="workouts"
    )

    week = models.PositiveIntegerField()

    day = models.PositiveIntegerField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - Week {self.week} Day {self.day}"

    class Meta:
        db_table = "workout"


class Exercise(models.Model):
    workout = models.ForeignKey(
        Workout, on_delete=models.CASCADE, related_name="exercises"
    )

    name_of_exercise = models.CharField(max_length=100)

    def __str__(self):
        return self.name_of_exercise

    class Meta:
        db_table = "name_of_exercise"


class Set(models.Model):
    exercise = models.ForeignKey(
        Exercise, on_delete=models.CASCADE, related_name="sets"
    )

    reps = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.reps} reps"

    class Meta:
        db_table = "sets"
