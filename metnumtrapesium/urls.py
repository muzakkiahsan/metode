from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView # Untuk melayani index.html

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('trapesiumapp.urls')),  # pastikan nama app benar
    re_path(r'^.*', TemplateView.as_view(template_name='index.html')),
]
