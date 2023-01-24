from django.db import models
from django.urls import reverse

# Create your models here.
class AutomobileVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    vin = models.CharField(max_length=17, unique=True)
    is_sold = models.BooleanField(default=False)

class SalesPerson(models.Model):
    name = models.CharField(max_length=50)
    employee_id = models.CharField(max_length=6)
    email = models.EmailField()

    def get_api_url(self):
        return reverse("api_salespersons",kwargs={"employee_id": self.employee_id})


class Customer(models.Model):
    name = models.CharField(max_length=50)
    email = models.EmailField()
    phone_number = models.CharField(max_length=20)

    def get_api_url(self):
        return reverse("api_customers",kwargs={"pk": self.pk})

class Sale(models.Model):
    salesperson = models.ForeignKey (
        SalesPerson,
        on_delete=models.CASCADE
    )

    customer = models.ForeignKey (
        Customer,
        on_delete=models.CASCADE
    )

    automobile = models.ForeignKey (
        AutomobileVO,
        on_delete=models.CASCADE
    )
    sales_date = models.DateTimeField(auto_now_add=True)
    sales_price = models.PositiveIntegerField(null=True)
