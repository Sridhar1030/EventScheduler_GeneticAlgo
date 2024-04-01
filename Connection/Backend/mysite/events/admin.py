from django.contrib import admin
from .models import Event, SubEvent, RegisteredEvent

admin.site.register(Event)
admin.site.register(SubEvent)
admin.site.register(RegisteredEvent)

