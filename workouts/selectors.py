# workouts/selectors.py


from .models import Workout

VALID_ORDERING_FIELDS = ["week", "day", "-week", "-day", "created_at", "-created_at"]


def get_user_workouts(*, user, search=None, week=None, day=None, ordering=None):
    queryset = Workout.objects.filter(user=user).prefetch_related("exercises__sets")

    # Pretrazuje naziv vezbi unutar workouta
    if search:
        queryset = queryset.filter(
            exercises__name_of_exercise__icontains=search
        ).distinct()
        # distinct zato sto jedan workout moze imati vise vezbi, bez njega bi se isti workout pojavio vise puta

    # Filter po nedelji
    if week is not None:
        queryset = queryset.filter(week=week)

    # Filter po danu
    if day is not None:
        queryset = queryset.filter(day=day)

    # SORT - Proveravamo da li je validan field da korisnik ne moze da posalje npr. ordering=password
    if ordering and ordering in VALID_ORDERING_FIELDS:
        queryset = queryset.order_by(ordering)

    else:
        queryset = queryset.order_by("-created_at")

    return queryset
