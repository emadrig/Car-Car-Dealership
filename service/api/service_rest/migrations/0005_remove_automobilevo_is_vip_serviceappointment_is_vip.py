# Generated by Django 4.0.3 on 2023-01-25 16:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0004_automobilevo_is_vip'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='automobilevo',
            name='is_vip',
        ),
        migrations.AddField(
            model_name='serviceappointment',
            name='is_vip',
            field=models.BooleanField(default=False),
        ),
    ]
