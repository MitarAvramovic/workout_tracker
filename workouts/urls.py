# workouts/urls.py

from django.urls import path

from .views import WorkoutListView, WorkoutDetailView, SetUpdateView

urlpatterns = [
    path("", WorkoutListView.as_view(), name="workout-list-create"),
    path("<int:pk>/", WorkoutDetailView.as_view(), name="workout-detail"),
    # SETS
    path("sets/<int:pk>/", SetUpdateView.as_view(), name="set-update"),
]
