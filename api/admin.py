from django.contrib import admin
from .models import User


class UserAdmin(admin.ModelAdmin):
    list_display = ('email', 'firstname',  'is_active')
    search_fields = ('email', 'firstname')

admin.site.register(User, UserAdmin)
