import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

# Template configuration
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            BASE_DIR / 'templates',  # Folder templates di root project
            BASE_DIR / 'trapesium-frontend' / 'templates',  # Jika template ada di frontend folder
            os.path.join(BASE_DIR, 'templates'),  # Alternative path
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# Static files configuration
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

STATICFILES_DIRS = [
    BASE_DIR / 'static',
    BASE_DIR / 'trapesium-frontend' / 'static',  # Jika ada static files di frontend
]

# Media files (jika diperlukan)
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# Allowed hosts untuk Railway
ALLOWED_HOSTS = [
    'localhost',
    '127.0.0.1',
    '.railway.app',  # Untuk Railway deployment
    '.up.railway.app',
]

# Database configuration (contoh untuk Railway PostgreSQL)
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# Jika menggunakan PostgreSQL di Railway, uncomment ini:
# import dj_database_url
# DATABASES = {
#     'default': dj_database_url.config(
#         default='sqlite:///' + str(BASE_DIR / 'db.sqlite3')
#     )
# }
