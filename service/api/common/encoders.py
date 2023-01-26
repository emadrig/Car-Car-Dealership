from .json import ModelEncoder
from service_rest.models import AutomobileVO, Technician, ServiceAppointment


class AutomobileVODetailEncoder(ModelEncoder):
  model= AutomobileVO
  properties = ["import_href","vin"]


class TechnicianDetailEncoder(ModelEncoder):
  model = Technician
  properties = ["name","employee_number"]


class TechnicianListEncoder(ModelEncoder):
  model=Technician
  properties = ["name","employee_number"]


class ServiceAppointmentEncoder(ModelEncoder):
  model = ServiceAppointment
  properties = ["href","vin","customer_name","date_time","reason", "technician","is_vip"]

  encoders = {
    "technician":TechnicianDetailEncoder(),
    "vin":AutomobileVODetailEncoder()
  }
