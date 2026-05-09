# workouts/services.py

from django.db import transaction
from django.shortcuts import get_object_or_404
from rest_framework.exceptions import ValidationError
from .models import Workout, Exercise, Set


@transaction.atomic
def create_workout(*, user, week, day):
    if Workout.objects.filter(user=user, week=week, day=day).exists():
        raise ValidationError("Workout already exists")

    return Workout.objects.create(user=user, week=week, day=day)


@transaction.atomic
def create_exercise(*, workout, name_of_exercise):
    new_exercise = Exercise.objects.create(
        workout=workout, name_of_exercise=name_of_exercise
    )

    return new_exercise


@transaction.atomic
def create_set(*, exercise, reps):
    new_set = Set.objects.create(exercise=exercise, reps=reps)

    return new_set


@transaction.atomic
def create_full_workout(*, user, week, day, exercises_data):

    workout = Workout.objects.create(user=user, week=week, day=day)

    for exercise_data in exercises_data:
        exercise = create_exercise(
            workout=workout,
            name_of_exercise=exercise_data["name_of_exercise"]
        )

        for set_data in exercise_data["sets"]:
            create_set(
                exercise=exercise,
                reps=set_data["reps"]
            )

    return workout


def delete_workout(*, workout_id, user):

    workout = get_object_or_404(Workout, id=workout_id)

    if workout.user != user:
        raise ValidationError("You cannot delete this workout")

    workout.delete()
