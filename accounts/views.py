# accounts/views.py

from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from .serializers import RegisterSerializer, LoginSerializer, UserSerializer
from .services import register_user, login_user, logout_user
from .selectors import get_current_user


@method_decorator(ensure_csrf_cookie, name="dispatch")
class CSRFView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        return Response({"detail": "CSRF cookie set"})

@method_decorator(csrf_exempt, name="dispatch")
class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = register_user(
            username=serializer.validated_data["username"],
            password=serializer.validated_data["password"],
        )

        return Response(UserSerializer(user).data, status=201)


@method_decorator(csrf_exempt, name="dispatch")  # ← dodaj ovo
class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user, token = login_user(
            request=request,
            username=serializer.validated_data["username"],
            password=serializer.validated_data["password"],
        )

        return Response({
            "user": UserSerializer(user).data,
            "token": token
        })


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        logout_user(request=request)
        return Response(status=204)


class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = get_current_user(request=request)
        return Response(UserSerializer(user).data)