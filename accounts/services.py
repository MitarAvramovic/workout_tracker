# accounts/services.py

from django.contrib.auth import authenticate, login, logout
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth import get_user_model

User = get_user_model()


def register_user(*, username: str, password: str):
    return User.objects.create_user(username=username, password=password)


def login_user(*, request, username, password):
    user = authenticate(request, username=username, password=password)

    if user is None:
        raise AuthenticationFailed("Invalid credentials")

    login(request, user)
    return user


def logout_user(*, request):
    logout(request)
