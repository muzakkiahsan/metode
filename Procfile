release: python manage.py collectstatic --noinput
web: gunicorn metnumtrapesium.wsgi:application --bind 0.0.0.0:$PORT
