from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.http import require_http_methods
import json

from common.json import ModelEncoder
from .models import AutomobileVO, SalesPerson, Customer, Sale
# Create your views here.
class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO,
    properties = ["import_href","vin","is_sold"]


class SalesPersonEncoder(ModelEncoder):
    model = SalesPerson
    properties = ["name", "employee_id", "email"]

class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = ["name", "email", "phone_number"]

@require_http_methods(["GET", "POST"])
def api_salespersons(request):
    if request.method == "GET":
        salespersons = SalesPerson.objects.all()
        return JsonResponse(
            {"salesperson": salespersons},
            encoder=SalesPersonEncoder,
            safe=False
        )
    else:
        try:
            content = json.loads(request.body)
            salesperson = SalesPerson.objects.create(**content)
            return JsonResponse(
                salesperson,
                encoder=SalesPersonEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create the sales person"}
            )
            response.status_code = 400
            return response

@require_http_methods(["PUT","DELETE"])
def api_salesperson(request, pk):
    if request.method == "DELETE":
        try:
            salesperson = SalesPerson.objects.get(pk=pk)
            salesperson.delete()
            return JsonResponse(
                salesperson,
                encoder=SalesPersonEncoder,
                safe=False,
            )
        except SalesPerson.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
    else:
        try:
            content = json.loads(request.body)
            salesperson = SalesPerson.objects.get(id=pk)

            props = ["name", "employee_id", "email"]
            for prop in props:
                if prop in content:
                    setattr(salesperson, prop, content[prop])
            salesperson.save()
            return JsonResponse(
                salesperson,
                encoder=SalesPersonEncoder,
                safe=False,
            )
        except SalesPerson.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response


@require_http_methods(["GET","POST"])
def api_customers(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerEncoder,
            safe=False
        )
    else:
        try:
            content = json.loads(request.body)
            customers = Customer.objects.create(**content)
            return JsonResponse(
                customers,
                encoder=CustomerEncoder,
                safe=False
            )
        except:
            response = JsonResponse(
                {"message":"Could not create the customer"}
            )
            response.status_code = 400
            return response

@require_http_methods(["PUT","DELETE"])
def api_customer(request, pk):
    if request.method == "DELETE":
        try:
            customer = Customer.objects.get(pk=pk)
            customer.delete()
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False
            )
        except Customer.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
    else:
        try:
            content = json.loads(request.body)
            customer = Customer.objects.get(id=pk)

            props = ["name", "email", "phone_number"]
            for prop in props:
                if prop in content:
                    setattr(customer, prop, content[prop])
            customer.save()
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False
            )
        except Customer.DoesNotExist:
            response = JsonResponse({"message": "Customer Does not excist"})
            response.status_code = 404
            return response
