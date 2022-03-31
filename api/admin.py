from django.contrib import admin
from .models import Face, User


class UserAdmin(admin.ModelAdmin):
    list_display = ('email', 'firstname',  'is_active')
    search_fields = ('email', 'firstname')


admin.site.register(User, UserAdmin)


class FaceAdmin(admin.ModelAdmin):
    list_display = ('user', 'filename', 'image', 'processedImage', 'isLive')
    search_fields = ('email', 'firstname')


admin.site.register(Face, FaceAdmin)
