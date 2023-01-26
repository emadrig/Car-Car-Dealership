# Generated by Django 4.0.3 on 2023-01-25 00:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sales_rest', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='sale',
            name='sales_date',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
        migrations.AddField(
            model_name='sale',
            name='sales_price',
            field=models.PositiveIntegerField(null=True),
        ),
    ]