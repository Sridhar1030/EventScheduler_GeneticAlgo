from django.urls import path
from .views import create_event, get_events


urlpatterns = [
    path('create-event/', create_event, name='create_event'),
    path('get-events/', get_events, name='get_events'),
    
]
