import json
from django.db import IntegrityError
from django.http import JsonResponse
from .models import Technician, AutomobileVO, ServiceAppointment
from django.views.decorators.http import require_http_methods
from django.shortcuts import render
from common.encoders import TechnicianListEncoder, TechnicianDetailEncoder, ServiceAppointmentEncoder

# Create your views here.
@require_http_methods(["GET","POST"])
def api_list_technicians(request, employee_number=None):
  if request.method == "GET":

    technicians = Technician.objects.all()

    return JsonResponse(
      {"technicians":technicians},
      encoder= TechnicianListEncoder,
      )
  else:
    content = json.loads(request.body)
    try:
      technician = Technician.objects.create(**content)

    except IntegrityError:
      return JsonResponse(
        {"message":"Technician employee number is already in use"},
        status = 400,
      )

    return JsonResponse(
      {"technician":technician},
      encoder=TechnicianDetailEncoder,
      safe=False
    )

@require_http_methods(["DELETE","GET","PUT"])
def api_show_technician(request,employee_number):
  if request.method == "GET":
    technician = Technician.objects.get(employee_number=employee_number)
    return JsonResponse(
      technician,
      encoder=TechnicianDetailEncoder,
      safe=False
    )
  elif request.method=="DELETE":
    count, _ = Technician.objects.filter(employee_number=employee_number).delete()
    return JsonResponse({"deleted":count> 0})
  else:
    content = json.loads(request.body)
    Technician.objects.filter(employee_number=employee_number).update(**content)
    technician = Technician.objects.get(employee_number=employee_number)
    return JsonResponse(
      technician,
      encoder=TechnicianDetailEncoder,
      safe=False,)



@require_http_methods(["GET","POST"])
def api_list_services(request,vin):
  if request.method == "GET":
    if vin is not None:
      services = ServiceAppointment.objects.filter(vin=vin)
    else:
      services = ServiceAppointment.objects.all()

    return JsonResponse(
      {"Services": services},
      encoder=ServiceAppointmentEncoder
    )
  else:
    content = json.loads(request)

    try:
      automobile_href= content["automobile"]
      automobile = AutomobileVO.objects.get(import_href=automobile_href)
      content["automobile"]=automobile
    except AutomobileVO.DoesNotExist:
      return JsonResponse(
        {"message":"Invalid automobile id"},
        status = 400
      )
    service = ServiceAppointment.objects.create(**content)
    return JsonResponse(
      service,
      encoder = ServiceAppointmentEncoder,
      safe=False
    )

# @require_http_methods(["GET"])
# def api_show_service(request, vin):
