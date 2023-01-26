from django.db import models
from django.urls import reverse

# Create your models here.
class Technician(models.Model):
  name = models.CharField(max_length=50)
  employee_number = models.CharField(max_length=50, unique=True)


class AutomobileVO(models.Model):
  import_href =models.CharField(max_length=200, unique=True)
  vin = models.CharField(max_length=17)
  # is_vip = models.BooleanField(default=False)


class ServiceAppointment(models.Model):
  href=models.CharField(max_length=200, null = True)
  customer_name = models.CharField(max_length=100)
  date_time = models.DateTimeField()
  reason= models.TextField()
  is_vip=models.BooleanField(default=False)

  technician = models.ForeignKey(
    Technician,
    related_name="apointments",
    on_delete=models.CASCADE,)

  vin= models.ForeignKey(
    AutomobileVO,
    related_name="appointments",
    on_delete=models.CASCADE
  )

  def get_api_url(self):
    return reverse("api_show_service", kwargs={"vin": self.vin})
