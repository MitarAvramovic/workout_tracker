# workouts/selectors.py


from .models import Workout


def get_user_workouts(user):
    return Workout.objects.filter(user=user).prefetch_related("exercises__sets")
