# workouts/models.py

from django.db import models
from django.conf import settings


class Workout(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="workouts"
    )

    week = models.PositiveIntegerField()

    day = models.PositiveIntegerField()

    notes = models.TextField(blank=True, default="")

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - Week {self.week} Day {self.day}"

    class Meta:
        db_table = "workout"


class Exercise(models.Model):
    class Category(models.TextChoices):
        PUSH = "push", "Push"
        PULL = "pull", "Pull"
        LEGS = "legs", "Legs"
        CARDIO = "cardio", "Cardio"
        OTHER = "other", "Other"

    workout = models.ForeignKey(
        Workout, on_delete=models.CASCADE, related_name="exercises"
    )

    name_of_exercise = models.CharField(max_length=100)
    category = models.CharField(
        max_length=10,
        choices=Category.choices,
        default=Category.OTHER,
    )

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
