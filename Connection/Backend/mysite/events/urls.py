from django.urls import path
from .views import create_event, get_events,register_event
from . import views

urlpatterns = [
    path('create-event/', create_event, name='create_event'),
    path('get-events/', get_events, name='get_events'),
    path('clear-database/', views.clear_database, name='clear_database'),
    path('get-registered-events/', views.get_registered_events, name='get_registered_events'),
    path('register-event/', register_event, name='register_event'),
]
