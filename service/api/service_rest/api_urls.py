from django.urls import path

from .views import api_list_technicians, api_show_technician, api_list_services, api_show_service
# , api_list_services, api_show_service

urlpatterns = [
    path("technicians/", api_list_technicians, name="api_create_technician"),
    path("technicians/<int:employee_number>/",api_show_technician,name="api_list_technicians"),
    path("services/", api_list_services, name = "api_list_services"),
    path("services/<str:vin>/", api_show_service, name = "api_show_service"),
]
