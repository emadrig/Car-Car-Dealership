# Generated by Django 4.0.3 on 2023-01-25 01:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0003_serviceappointment_vin'),
    ]

    operations = [
        migrations.AddField(
            model_name='automobilevo',
            name='is_vip',
            field=models.BooleanField(default=False),
        ),
    ]
