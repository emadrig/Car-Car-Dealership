# Generated by Django 4.0.3 on 2023-01-26 22:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0010_remove_serviceappointment_href_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='serviceappointment',
            name='vin',
            field=models.CharField(max_length=17),
        ),
    ]
