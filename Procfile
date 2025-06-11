release: bash -c "cd trapesium-frontend && npm install && npm run build && cd .. && python manage.py collectstatic --noinput && python manage.py migrate --noinput"
web: gunicorn metnumtrapesium.wsgi:application --bind 0.0.0.0:$PORT
