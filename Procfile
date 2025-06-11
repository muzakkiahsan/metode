web: gunicorn trapesiumapp.wsgi:application --bind 0.0.0.0:$PORT
web: gunicorn trapesiumapp.wsgi --log-file - 
#or works good with external database
web: python manage.py migrate && gunicorn trapesiumapp.wsgi
