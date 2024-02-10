from django.contrib import admin
from .models import CustomUserModel

class CustomUserModelAdmin(admin.ModelAdmin):
    list_display = ('email',)  # fields to display in list view
    search_fields = [ 'email']  # fields to search in the admin interface

admin.site.register(CustomUserModel, CustomUserModelAdmin)
