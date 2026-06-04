from django.db import transaction
from django.shortcuts import get_object_or_404
from rest_framework.exceptions import ValidationError
from .models import Workout, Exercise, Set


@transaction.atomic
def create_full_workout(*, user, week, day, notes="", exercises_data):
    if Workout.objects.filter(user=user, week=week, day=day).exists():
        raise ValidationError("Workout already exists")

    workout = Workout.objects.create(
        user=user,
        week=week,
        day=day,
        notes=notes,
    )

    for exercise_data in exercises_data:
        exercise = create_exercise(
            workout=workout, name_of_exercise=exercise_data["name_of_exercise"]
        )
        for set_data in exercise_data["sets"]:
            create_set(exercise=exercise, reps=set_data["reps"])

    return workout


@transaction.atomic
def update_full_workout(*, workout_id, week, day, notes="", exercises_data):
    workout = get_object_or_404(Workout, id=workout_id)

    workout.week = week
    workout.day = day
    workout.notes = notes
    workout.save()

    incoming_exercise_ids = {ex["id"] for ex in exercises_data if ex.get("id")}
    workout.exercises.exclude(id__in=incoming_exercise_ids).delete()

    for exercise_data in exercises_data:
        exercise_id = exercise_data.get("id")

        if exercise_id:
            exercise = get_object_or_404(Exercise, id=exercise_id, workout=workout)
            exercise.name_of_exercise = exercise_data["name_of_exercise"]
            exercise.save()
        else:
            exercise = create_exercise(
                workout=workout, name_of_exercise=exercise_data["name_of_exercise"]
            )

        incoming_set_ids = {s["id"] for s in exercise_data["sets"] if s.get("id")}
        exercise.sets.exclude(id__in=incoming_set_ids).delete()

        for set_data in exercise_data["sets"]:
            set_id = set_data.get("id")

            if set_id:
                workout_set = get_object_or_404(Set, id=set_id, exercise=exercise)
                workout_set.reps = set_data["reps"]
                workout_set.save()
            else:
                create_set(exercise=exercise, reps=set_data["reps"])

    return workout


# def delete_workout(*, workout_id, user):
#     workout = get_object_or_404(Workout, id=workout_id)

#     workout.delete()


def create_exercise(*, workout, name_of_exercise):
    return Exercise.objects.create(workout=workout, name_of_exercise=name_of_exercise)


def create_set(*, exercise, reps):
    return Set.objects.create(exercise=exercise, reps=reps)
