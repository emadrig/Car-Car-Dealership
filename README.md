# CarCar

Team:

- Edwin Madrigal - Service Microservice
- Person 2 - Which microservice?

## Design

## Service microservice

By creating models in the service microservice that include Technician, Service Appointment, and AutomobileVO, I am able to call service views that incorporate CRUD to create technicians, and services. By using a poller to get the latest automobile data from the inventory api, we create an automobile value object in the service api and can assign services to technicians without directly manipulating the inventory data. I have used RESTful api formatting to create urls that utilize CRUD design to get, post, put and delete as needed. In addition, I used React to send requests to the urls to perform CRUD operations and dynamically show those results to the user in the webbrowser. This creates a smooth experience for the user to navigate and perform any tasks that they choose.

## Sales microservice

Explain your models and integration with the inventory
microservice, here.
