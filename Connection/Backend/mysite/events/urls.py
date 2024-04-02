from django.urls import path
from .views import create_event, get_events, register_event, get_sub_events, clear_database, get_registered_events,getRoutes,run_genetic_algorithm  # Import the run_genetic_algorithm view
from .views import MyTokenObtainPairView

from rest_framework_simplejwt.views import (
    
    TokenRefreshView,
)





urlpatterns = [
    path ('',getRoutes, name='routes'),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('create-event/', create_event, name='create_event'),
    path('get-events/', get_events, name='get_events'),
    path('clear-database/', clear_database, name='clear_database'),
    path('get-registered-events/', get_registered_events, name='get_registered_events'),
    path('register-event/', register_event, name='register_event'),
    path('get-sub-events/<str:event_name>/', get_sub_events, name='get_sub_events'),
    path('run-genetic-algorithm/', run_genetic_algorithm, name='run_genetic_algorithm'),  # Add this URL pattern
]
