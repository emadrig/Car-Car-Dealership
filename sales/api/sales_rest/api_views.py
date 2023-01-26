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
    properties = ["name", "email", "phone_number", "address"]

class SaleEncoder(ModelEncoder):
    model = Sale
    properties = ["salesperson", "customer", "automobile", "sales_date", "sales_price"]

    encoders = {
        "automobile": AutomobileVOEncoder(),
        "salesperson": SalesPersonEncoder(),
        "customer": CustomerEncoder()
    }

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

            props = ["name", "email", "phone_number", "address"]
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
            response = JsonResponse({"message": "Customer Does not exist"})
            response.status_code = 404
            return response

@require_http_methods(["GET", "POST"])
def api_list_sales(request, employee_id=None):
    if request.method == "GET":
        if employee_id is not None:
            content = json.loads(request.body)
            salesperson = SalesPerson.objects.get(employee_id=employee_id)
            sales = Sale.objects.filter(salesperson=salesperson)
        else:
            sales = Sale.objects.all()
        return JsonResponse (
            {"sales": sales},
            encoder=SaleEncoder,
        )
    else:
        content = json.loads(request.body)
        print(content)
        try:
            salesperson_employee_id = content["salesperson"]
            salesperson = SalesPerson.objects.get(employee_id=salesperson_employee_id)
            customer_id = content["customer"]
            customer = Customer.objects.get(id=customer_id)
            automobile_vin = content["automobile"]
            automobile = AutomobileVO.objects.get(vin=automobile_vin)
            if automobile.is_sold == True:
                response = JsonResponse({"message": "This vehicle has already been sold."})
                response.status_code=400
                return response               
            content["salesperson"] = salesperson
            content["customer"] = customer
            content["automobile"] = automobile
        except SalesPerson.DoesNotExist:
            return JsonResponse (
                {"message": "Invalid Employee ID"},
                status=400,
            )
        
        sale = Sale.objects.create(**content)
        automobile.is_sold = True
        automobile.save()

        return JsonResponse(
            sale,
            encoder=SaleEncoder,
            safe=False,
        )

@require_http_methods(["PUT", "DELETE"])
def api_show_sale(request, pk):
    if request.method == "DELETE":
        try:
            sale = Sale.objects.get(pk=pk)
            sale.delete()
            return JsonResponse(
                sale,
                encoder=SaleEncoder,
                safe=False
            )
        except Sale.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
    else:
        try:
            content = json.loads(request.body)
            sale = Sale.objects.get(pk=pk)

            props = ["salesperson", "customer", "automobile", "sales_date", "sales_price"]
            for prop in props:
                if prop in content:
                    setattr(sale, prop, content[prop])
                sale.save()
                return JsonResponse(
                    sale,
                    encoder=SaleEncoder,
                    safe=False
                )
        except Customer.DoesNotExcist:
            response = JsonResponse({"message": "Sale does not exist"})
            response.status_code = 404
            return response