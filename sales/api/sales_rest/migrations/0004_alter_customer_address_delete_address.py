# Generated by Django 4.0.3 on 2023-01-25 17:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sales_rest', '0003_address_customer_address'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customer',
            name='address',
            field=models.CharField(max_length=250),
        ),
        migrations.DeleteModel(
            name='Address',
        ),
    ]