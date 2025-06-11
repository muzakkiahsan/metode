release: python manage.py migrate --noinput
web: gunicorn metnumtrapesium.wsgi:application --bind 0.0.0.0:$PORT
