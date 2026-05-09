# config/urls.py

from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/accounts/", include("accounts.urls")),
    path("api/workouts/", include("workouts.urls")),
]


def custom_404(request, exception):
    return JsonResponse({"error": "Not found"}, status=404)


def custom_500(request):
    return JsonResponse({"error": "Server error"}, status=500)


handler404 = "config.urls.custom_404"
handler500 = "config.urls.custom_500"
