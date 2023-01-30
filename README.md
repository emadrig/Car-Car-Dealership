# CarCar

Team:

- Edwin Madrigal - Service Microservice
- Person 2 - Which microservice?

## Design

## Service microservice

By creating models in the service microservice that include Technician, Service Appointment, and AutomobileVO, I am able to call service views that incorporate CRUD to create technicians, and services. By using a poller to get the latest automobile data from the inventory api, we create an automobile value object in the service api and can assign services to technicians without directly manipulating the inventory data. I have used RESTful api formatting to create urls that utilize CRUD design to get, post, put and delete as needed. In addition, I used React to send requests to the urls to perform CRUD operations and dynamically show those results to the user in the webbrowser. This creates a smooth experience for the user to navigate and perform any tasks that they choose.

## Sales microservice

The sales microservice application includes several models, such as Customer, Sales Order, and AutomobileVO, that allow us to manage the sales process efficiently. We use CRUD operations to create, read, update, and delete customer and sales order information. The sales microservice also integrates with the inventory microservice, allowing us to retrieve the latest automobile data in real-time. We use a poller to access the inventory API and retrieve the latest automobile data, which is then used to create an automobile value object in the sales microservice. This allows us to assign sales orders to customers without directly manipulating the inventory data.The sales microservice implements RESTful API formatting, with URLs that support CRUD operations for data management. To provide a smooth user experience, we use React to send requests to the URLs and dynamically display the results in the web browser. This allows the user to easily navigate and perform sales-related tasks with ease.