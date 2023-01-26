import json
from django.db import IntegrityError
from django.http import JsonResponse
from .models import Technician, AutomobileVO, ServiceAppointment
from django.views.decorators.http import require_http_methods
from django.shortcuts import render
from common.encoders import TechnicianListEncoder, TechnicianDetailEncoder, ServiceAppointmentEncoder

# Create your views here.
@require_http_methods(["GET","POST"])
def api_list_technicians(request):
  if request.method == "GET":

    technicians = Technician.objects.all()
    return JsonResponse(
      {"technicians":technicians},
      encoder= TechnicianListEncoder,
      )
  else:
    try:
      content = json.loads(request.body)
      technician = Technician.objects.create(**content)
      return JsonResponse(
        {"technician":technician},
        encoder=TechnicianDetailEncoder,
        safe=False
      )

    except IntegrityError:
      return JsonResponse(
        {"message":"Technician employee number is already in use"},
        status = 400,
      )


@require_http_methods(["DELETE","GET","PUT"])
def api_show_technician(request,employee_number):
  if request.method == "GET":
    try:
      technician = Technician.objects.get(employee_number=employee_number)
      return JsonResponse(
        technician,
        encoder=TechnicianDetailEncoder,
        safe=False
      )
    except Technician.DoesNotExist:
      return JsonResponse(
        {"message":"Technician does not exist"},
        status = 404
      )
  elif request.method=="DELETE":
    try:
      count, _ = Technician.objects.filter(employee_number=employee_number).delete()
      return JsonResponse({"deleted":count> 0})
    except Technician.DoesNotExist:
      return JsonResponse(
        {"message":"Technician does not exist"},
        status = 404
      )
  else:
    try:
      content = json.loads(request.body)
      Technician.objects.filter(employee_number=employee_number).update(**content)
      technician = Technician.objects.get(employee_number=employee_number)

      return JsonResponse(
        technician,
        encoder=TechnicianDetailEncoder,
        safe=False,
        )
    except Technician.DoesNotExist:
        return JsonResponse(
        {"message":"Technician does not exist"},
        status = 404)



@require_http_methods(["GET","POST"])
def api_list_services(request,vin=None):
  if request.method == "GET":
    if vin is not None:
      services = ServiceAppointment.objects.filter(vin=vin)
    else:
      services = ServiceAppointment.objects.all()

    return JsonResponse(
      {"services": services},
      encoder=ServiceAppointmentEncoder
    )
  else:
    try:
      content = json.loads(request.body)
      employee_number= content["technician"]
      technician = Technician.objects.get(employee_number=employee_number)
      content["technician"]=technician

      automobile_vin = content["vin"]
      vin = AutomobileVO.objects.get(vin=automobile_vin)
      content["vin"]=vin
      content["is_vip"]=True

    except AutomobileVO.DoesNotExist:
      return JsonResponse(
        {"message":"Invalid technician id"},
        status = 400
      )

    service = ServiceAppointment.objects.create(**content)
    return JsonResponse(
      service,
      encoder = ServiceAppointmentEncoder,
      safe=False
    )

@require_http_methods(["DELETE","GET","PUT"])
def api_show_service(request,service_id):
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
