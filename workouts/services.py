# workouts/services.py

from django.db import transaction
from .models import Workout, Set


@transaction.atomic
def create_workout(user):
    new_workout = Workout.objects.create(user=user)

    return new_workout


def create_set(workout, exercise, reps):
    new_set = Set.objects.create(workout=workout, exercise=exercise, reps=reps)

    return new_set


def create_full_workout(user, sets_data):
    new_workout = Workout.objects.create(user=user)

    for set_item in sets_data:
        Set.objects.create(
            workout=new_workout, exercise=set_item["exercise"], reps=set_item["reps"]
        )
    return new_workout


def update_set(set_instance, **kwargs):
    for key, value in kwargs.items():
        setattr(set_instance, key, value)

        set_instance.save()

        return set_instance


def delete_workout(workout):
    workout.delete()
