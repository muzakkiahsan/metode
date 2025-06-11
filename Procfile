mweb: gunicorn metnumtrapesium.wsgi:application --bind 0.0.0.0:$PORT
web: gunicorn metnumtrapesium.wsgi --log-file - 
#or works good with external database
web: python manage.py migrate && gunicorn metnumtrapesium.wsgi
