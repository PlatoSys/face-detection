"""Admin Module for API"""
from django.contrib.admin import ModelAdmin, register, action
from import_export.admin import ImportExportActionModelAdmin
import cloudinary
from .models import DetectionImage, User
from .resources import DetectionImageResource


@register(User)
class UserAdmin(ModelAdmin):
    """User Admin"""

    list_display = ('email', 'firstname',  'is_active')
    search_fields = ('email', 'firstname')


@action(description='Delete From Cloudinary')
def delete_from_cloud(modeladmin, request, queryset):
    """Delete Images From Cloudinary"""

    def remove_folders(path):
        """Remove Empty Folders"""
        to_delete = []
        res = cloudinary.api.subfolders(path)
        for resource in res['folders']:
            to_delete.append(resource['path'])

        for folder in to_delete:
            cloudinary.api.delete_folder(folder)

    for instance in queryset:
        cloudinary.uploader.destroy(instance.originalPublicId)
        cloudinary.uploader.destroy(instance.processedPublicId)
        instance.delete()

    if DetectionImage.objects.count() == len(queryset):
        remove_folders('live_images')
        remove_folders('processed_images')
        remove_folders('original_images')


@register(DetectionImage)
class DetectionImageAdmin(ImportExportActionModelAdmin):
    """DetectionImage Admin"""

    list_display = ('user', 'filename', 'image', 'processedImage', 'isLive',
                    'width', 'height')
    search_fields = ('email', 'firstname')
    actions = [delete_from_cloud]
    resource_class = DetectionImageResource
