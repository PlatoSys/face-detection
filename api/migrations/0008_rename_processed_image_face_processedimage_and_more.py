# Generated by Django 4.0.3 on 2022-03-29 13:40

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_rename__id_face_id'),
    ]

    operations = [
        migrations.RenameField(
            model_name='face',
            old_name='processed_image',
            new_name='processedImage',
        ),
        migrations.AddField(
            model_name='face',
            name='createdAt',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='face',
            name='isLive',
            field=models.BooleanField(default=False),
        ),
    ]
