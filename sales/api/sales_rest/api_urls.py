from django.contrib import admin
from django.urls import path, include
from .api_views import (
    api_salespersons,
    api_salesperson,
    api_customers,
    api_customer,
    api_list_sales,
)


urlpatterns = [
    path("salespersons/", api_salespersons, name="api_salespersons"),
    path("salespersons/<int:pk>/", api_salesperson, name="api_salespersons"),
    path("customers/", api_customers, name="api_customers"),
    path("customers/<int:pk>/", api_customer, name="api_customers"),
    path("sales/", api_list_sales, name="api_list_sales"),
    path("sales/<int:employee_id>/", api_list_sales, name="api_list_sales")
]
