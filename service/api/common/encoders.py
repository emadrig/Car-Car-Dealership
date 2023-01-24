from .json import ModelEncoder
from service_rest.models import AutomobileVO


class AutomobileVODetailEncoder(ModelEncoder):
  model= AutomobileVO
  properites = [""]
