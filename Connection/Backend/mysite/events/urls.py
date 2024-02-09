from django.urls import path
from .views import create_event, get_events
from . import views

urlpatterns = [
    path('create-event/', create_event, name='create_event'),
    path('get-events/', get_events, name='get_events'),
    path('clear-database/', views.clear_database, name='clear_database'),
    
]
