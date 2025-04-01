from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User

from blog.models import Blog

# Extend the default UserAdmin
class CustomUserAdmin(UserAdmin):
    list_display = ('id', 'username', 'email', 'is_staff', 'is_active', 'date_joined')
    list_filter = ('is_staff', 'is_active')
    search_fields = ('username', 'email')

# Register the extended UserAdmin
admin.site.unregister(User)  # Unregister default UserAdmin
admin.site.register(User, CustomUserAdmin)
admin.site.register(Blog)