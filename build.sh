#!/usr/bin/env bash
set -e

pip install -r requirements.txt
python manage.py migrate
python manage.py collectstatic --noinput
python manage.py create_superuser_if_none