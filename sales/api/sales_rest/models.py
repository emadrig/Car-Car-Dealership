from django.db import models

# Create your models here.
class AutoVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    vin = models.CharField(max_length=17, unique=True)
    is_sold = models.BooleanField(default=False)