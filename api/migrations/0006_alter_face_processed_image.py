# Generated by Django 4.0.3 on 2022-03-28 07:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_alter_face_processed_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='face',
            name='processed_image',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
    ]