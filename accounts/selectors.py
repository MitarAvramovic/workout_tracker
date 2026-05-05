# accounts/selectors.py

from django.contrib.auth import get_user_model

User = get_user_model()


def get_user(*, user_id: int):
    return User.objects.filter(id=user_id).first()


def get_current_user(*, request):
    return request.user
