from django.urls import path
from .views import IntegralTrapesiumView

urlpatterns = [
    path('integral/', IntegralTrapesiumView.as_view(), name='integral'),
]
