release: python manage.py migrate --noinput
web: gunicorn metnumtrapesium.wsgi:application --bind 0.0.0.0:$PORT
web: /opt/venv/bin/python manage.py runserver 0.0.0.0:$PORT
