from django.db import models, IntegrityError
from django.urls import reverse
from django.http import JsonResponse
import random 
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
        return reverse("api_salespersons",kwargs={"pk": self.pk})


class Customer(models.Model):
    name = models.CharField(max_length=50)
    email = models.EmailField()
    address = models.CharField
    phone_number = models.CharField(max_length=20)
    address = models.CharField(max_length=250)

    def get_api_url(self):
        return reverse("api_customers",kwargs={"pk": self.pk})

class Sale(models.Model):
    sale_number = models.PositiveIntegerField(max_length=10, unique=True, null=True)
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
    sales_price = models.PositiveIntegerField()

    def get_api_url(self):
        return reverse("api_list_sales", kwargs={"pk": self.pk})

    def save(self):
        if not self.sale_number:
            while True:
                random_number = random.randint(100000, 999999)
                self.sale_number = '420' + str(random_number)
                try:
                    super(Sale, self).save()
                except IntegrityError:
                    continue
                break
        else:
            super(Sale, self).save()
