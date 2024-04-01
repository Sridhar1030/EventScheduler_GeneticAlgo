from django.db import models
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
    event = models.ForeignKey('Event', on_delete=models.CASCADE, related_name='subevents')

    def __str__(self):
        return self.name





class RegisteredEvent(models.Model):
    username = models.CharField(max_length=150)
    sub_event_name = models.CharField(max_length=255)  # New field for sub-event name
    event_name = models.CharField(max_length=255)
    time = models.DateTimeField(default=timezone.now)  # Add the time field

    def __str__(self):
        return f"{self.username} - {self.event_name} - {self.sub_event_name}"
