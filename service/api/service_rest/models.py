from django.db import models

# Create your models here.
class Technician(models.Model):
  name = models.CharField(max_length=50)
  employee_number = models.CharField(max_length=50, unique=True)


# class Appointment(models.Model):
#   owner_name = models.CharField(max_length=100)
#   date_time = models.DateTimeField()
#   reason= models.TextField()

#   technician = models.ForeignKey(
#     Technician,
#     related_name="apointments",
#     on_delete=models.CASCADE,
#   )


class AutomobileVO(models.Model):
  import_href =models.CharField(max_length=200, unique=True)
  vin = models.CharField(max_length=17)
