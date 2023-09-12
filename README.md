# Microservices-DeliveryApp

This is .NET-Angular application for food delivery from one restaurant. It contains Angular client app and .NET server side. 

Server side is devided into three projects: APIGateway, UserService and ProductService.

## UserService

UserService is .NET API which is used for authentication. 
It contains database with registrated users and it returns JWT on authentication. 

## ProductService

ProductService is .NET API which is used for all actions related to working with products including:
- adding new products,
- creating orders,
- changing order state etc. 


## APIGateway

APIGateway is lightweight app for routing HTTP requests from client app to ProductService and UserService.

