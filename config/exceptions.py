#config/exceptions.py

from rest_framework.views import exception_handler
from rest_framework.response import Response


def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)

    if response is not None:
        error_message = None

        if isinstance(response.data, dict):
            if "detail" in response.data:

                error_message = str (response.data["detail"])

            else:

                first_key = next(iter(response.data))
                first_value = response.data[first_key]
                if isinstance(first_value, list):
                    error_message = f"{first_key}: {first_value[0]}"

                else:
                    error_message = str(first_value)
        
        elif isinstance(response.data, list):
            error_message = str(response.data[0])
        else:
            error_message = str(response)

        response.data = {"error": error_message}

    return response