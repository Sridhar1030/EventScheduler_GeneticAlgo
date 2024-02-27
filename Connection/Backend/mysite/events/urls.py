from django.urls import path
from .views import create_event, get_events, register_event, get_sub_events  # Import the get_sub_events view
from . import views
urlpatterns = [
    path('create-event/', create_event, name='create_event'),
    path('get-events/', get_events, name='get_events'),
    path('clear-database/', views.clear_database, name='clear_database'),
    path('get-registered-events/', views.get_registered_events, name='get_registered_events'),
    path('register-event/', register_event, name='register_event'),
    path('get-sub-events/<str:event_name>/', get_sub_events, name='get_sub_events'),  # Add this URL pattern
]
