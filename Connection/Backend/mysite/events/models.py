from django.db import models
from datetime import time
from django.utils import timezone
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

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

    def __str__(self):
        return self.name



class CustomUserManager(BaseUserManager):
    def create_user(self, email, username=None, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        if not username:
            username = 'default_username'
        email = self.normalize_email(email)
        user = self.model(email=email, username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        if not username:
            username = 'default_superuser'
        return self.create_user(email, username, password, **extra_fields)


class CustomUserModel(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=150, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email

class RegisteredEvent(models.Model):
    username = models.CharField(max_length=150)
    sub_event_name = models.CharField(max_length=255)  # New field for sub-event name
    event_name = models.CharField(max_length=255)
    time = models.DateTimeField(default=timezone.now)  # Add the time field

    def __str__(self):
        return f"{self.username} - {self.event_name} - {self.sub_event_name}"
