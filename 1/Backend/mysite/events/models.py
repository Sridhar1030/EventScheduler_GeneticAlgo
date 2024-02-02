from django.db import models

class Event(models.Model):
    name = models.CharField(max_length=255)

    class Meta:
        app_label = 'events'
    def __str__(self):
        return self.name