from django.contrib import admin
import cloudinary
from .models import Face, User


class UserAdmin(admin.ModelAdmin):
    list_display = ('email', 'firstname',  'is_active')
    search_fields = ('email', 'firstname')


admin.site.register(User, UserAdmin)


@admin.action(description='Delete From Cloudinary')
def delete_from_cloud(modeladmin, request, queryset):

    def remove_folders(path):
        to_delete=[]
        res = cloudinary.api.subfolders(path)
        for resource in res['folders']:
            to_delete.append(resource['path'])

        for folder in to_delete:
            cloudinary.api.delete_folder(folder)

    for instance in queryset:
        cloudinary.uploader.destroy(instance.originalPublicId)
        cloudinary.uploader.destroy(instance.processedPublicId)
        instance.delete()

    remove_folders('live_images')
    remove_folders('processed_images')
    remove_folders('original_images')



class FaceAdmin(admin.ModelAdmin):
    list_display = ('user', 'filename', 'image', 'processedImage', 'isLive', 'originalPublicId')
    search_fields = ('email', 'firstname')
    actions = [delete_from_cloud]

admin.site.register(Face, FaceAdmin)
