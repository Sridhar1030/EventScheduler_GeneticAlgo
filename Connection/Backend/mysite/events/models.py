from django.db import models; from django.utils import timezone; from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin



class Event(models.Model): 
    name = models.CharField(max_length=255)
    date = models.DateField(default=timezone.now)  # First date field
    another_date = models.DateField(default=timezone.now)  # Second date field

    class Meta:
        managed = True  # Ensure managed is set to True
        app_label = 'events'

    def __str__(self):
        return self.name

class CustomUserManager(BaseUserManager):
    def create_user(self, email, username=None, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        if not username:
            username = 'default_username'  # Set a default username if not provided
        email = self.normalize_email(email)
        user = self.model(email=email, username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        if not username:
            username = 'default_superuser'  # Set a default username if not provided
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
    event_name = models.CharField(max_length=255)  # Change to CharField or appropriate field type

    def __str__(self):
        return f"{self.user.email} - {self.event.name}"
