# config/responses.py

from rest_framework.response import Response


def success_response(data=None, message=None, status=200):
    return Response(
        {
            "data": data,
            "message": message,
        },
        status=status,
    )