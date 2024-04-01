from django.db import models
from datetime import time
from django.utils import timezone

class Event(models.Model): 
    name = models.CharField(max_length=255)
    date = models.DateField(default=timezone.now)  # First date field
    another_date = models.DateField(default=timezone.now)  # Second date field
    time = models.DateTimeField(default=timezone.now)  # Change to DateTimeField to store both date and time
    endtime = models.DateTimeField(default=timezone.now)  # Change to DateTimeField to store both date and time
    
    class Meta:
        managed = True
        app_label = 'events'

    def __str__(self):
        return self.name


class SubEvent(models.Model):
    name = models.CharField(max_length=255)
    duration = models.IntegerField(default=0)  # Add duration field
    event = models.ForeignKey('Event', on_delete=models.CASCADE, related_name='subevents')
    space_number = models.PositiveIntegerField(default=0)  # Add space_number field

    def __str__(self):
        return self.name



class RegisteredEvent(models.Model):
    username = models.CharField(max_length=150)
    sub_event_name = models.CharField(max_length=255)  # New field for sub-event name
    event_name = models.CharField(max_length=255)
    space_number = models.IntegerField()  # Add the space_number field
    time = models.DateTimeField(default=timezone.now)  # Add the time field

    def __str__(self):
        return f"{self.username} - {self.event_name} - {self.sub_event_name}"
