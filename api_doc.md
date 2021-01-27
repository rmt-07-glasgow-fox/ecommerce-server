**E-commerce CMS**
----
    Membuat website E-commerce


* **URL**
    http://localhost:3000


* **List Endpoint**
  
  &nbsp;

## POST /register
_Request Header_
```
{
  not needed
}
```

_Request Body_
```
{
  "email": "<email to get insert into>",
  "password": "<password to get insert into>"
}
```
_Response (201 - OK)_
```
{
  "id": "<id auto insert from the system>",
  "email": "<email to get insert into>",
  "role": "<role to get insert into>"
}
```
_Response (400 - Bad Request)_
```
{
  Error message from SequelizeValdationError
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "error from the server"
}
```
&nbsp;

## POST /login
_Request Header_
```
{
  not needed
}
```

_Request Body_
```
{
  "email": "<email to get insert into>",
  "password": "<password to get insert into>"
}
```
_Response (200 - OK)_
```
{
  "access_token": "<access_token>"
}
```
_Response (400 - Bad Request)_
```
{
  Error message from SequelizeValdationError
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "error from the server"
}
```
&nbsp;

## POST /loginCustomer
_Request Header_
```
{
  not needed
}
```

_Request Body_
```
{
  "email": "<email to get insert into>",
  "password": "<password to get insert into>"
}
```
_Response (200 - OK)_
```
{
  "access_token": "<access_token>"
}
```
_Response (400 - Bad Request)_
```
{
  Error message from SequelizeValdationError
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "error from the server"
}
```
&nbsp;

## POST /products
_Request Header_
```
{
  "access_token": "<access_token>"
}
```
_Request Body_
```
{
  "name": "<name to get insert into>",
  "image_url": "<image_url to get insert into>",
  "price": "<price to get insert into>",
  "stock": "<stock to get insert into>"
}
```
_Response (201 - OK)_
```
{
  "id": "<give id by system>",
  "name": "<posted name>",
  "image_url": "<posted image_url>",
  "price": "<posted price>",
  "stock": "<posted stock>",
  "createdAt: "<automatically inserted system>",
  "updatedAt: "<automatically inserted system>"
}
```
_Response (400 - Bad Request)_
```
{
  Error message from SequelizeValdationError
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "error from the server"
}
```
&nbsp;

## GET /products
_Request Header_
```
{
  "access_token": "<access_token>"
}
```
_Request Body_
```
not needed
```
_Response (200 - OK)_
```
[
  {
  "id": "<give id by system>",
  "name": "<posted name>",
  "image_url": "<posted image_url>",
  "price": "<posted price>",
  "stock": "<posted stock>",
  "createdAt: "<automatically inserted system>",
  "updatedAt: "<automatically inserted system>"
  }
]
```
_Response (500 - Internal Server Error)_
```
{
  "message": "error from the server"
}
```
&nbsp;

## GET /products/:id
_Request Header_
```
{
  "access_token": "<access_token>"
}
```
_Request Body_
```
not needed
```
_Request Params_
```
{
  "id": "<depend on user login id>"
}
```
_Response (200 - OK)_
```
{
"id": "<give id by system>",
"name": "<posted name>",
"image_url": "<posted image_url>",
"price": "<posted price>",
"stock": "<posted stock>",
"createdAt: "<automatically inserted system>",
"updatedAt: "<automatically inserted system>"
}
```
_Response (401 - accessDenied)_
```
{
  "message": "no access for this action"
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "error from the server"
}
```
&nbsp;

## PUT /products/:id
_Request Header_
```
{
  "access_token": "<access_token>"
}
```
_Request Params_
```
{
  "id": "<depend on product id>"
}
```
_Request Body_
```
{
  "name": "<name to get insert into>",
  "image_url": "<image_url to get insert into>",
  "price": "<price to get insert into>",
  "stock": "<stock to get insert into>"
}
```
_Response (200 - OK)_
```
{
"id": "<give id by system>",
"name": "<posted name>",
"image_url": "<posted image_url>",
"price": "<posted price>",
"stock": "<posted stock>",
"createdAt: "<automatically inserted system>",
"updatedAt: "<automatically inserted system>"
}
```
_Response (401 - accessDenied)_
```
{
  "message": "no access for this action"
}
```
_Response (404 - notFound)_
```
{
  "message": "resource not found"
}
```
_Response (400 - Bad Request)_
```
{
  Error message from SequelizeValdationError
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "error from the server"
}
```
&nbsp;

## DELETE /products/:id
_Request Header_
```
{
  "access_token": "<access_token>"
}
```
_Request Params_
```
{
  "id": "<depend on product id>"
}
```
_Response (200 - OK)_
```
{
  "message": "product success to delete"
}
```
&nbsp;

## POST /banners
_Request Header_
```
{
  "access_token": "<access_token>"
}
```
_Request Body_
```
{
  "title": "<title to get insert into>",
  "status": "<status to get insert into>",
  "image_url": "<image_url to get insert into>"
}
```
_Response (200 - OK)_
```
{
"id": "<give id by system>",
"title": "<posted title>",
"image_url": "<posted image_url>",
"status": "<posted status>",
"createdAt: "<automatically inserted system>",
"updatedAt: "<automatically inserted system>"
}
```
_Response (500 - Internal Server Error)_
```
{
  "msg": "product hasbeen deleted"
}
```
&nbsp;

## GET /banners
_Request Header_
```
{
  "access_token": "<access_token>"
}
```
_Request Body_
```
not needed
```
_Response (200 - OK)_
```
[
  {
  "id": "<give id by system>",
  "title": "<posted title>",
  "image_url": "<posted image_url>",
  "status": "<posted status>",
  "createdAt: "<automatically inserted system>",
  "updatedAt: "<automatically inserted system>"
  }
]
```
_Response (500 - Internal Server Error)_
```
{
  "message": "error from the server"
}
```
&nbsp;

## GET /banners/:id
_Request Header_
```
{
  "access_token": "<access_token>"
}
```
_Request Body_
```
not needed
```
_Request Params_
```
{
  "id": "<depend on user login id>"
}
```
_Response (200 - OK)_
```
{
"id": "<give id by system>",
"title": "<posted title>",
"image_url": "<posted image_url>",
"status": "<posted status>",
"createdAt: "<automatically inserted system>",
"updatedAt: "<automatically inserted system>"
}
```
_Response (401 - accessDenied)_
```
{
  "message": "no access for this action"
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "error from the server"
}
```
&nbsp;

## PUT /banners/:id
_Request Header_
```
{
  "access_token": "<access_token>"
}
```
_Request Params_
```
{
  "id": "<depend on banner id>"
}
```
_Request Body_
```
{
"title": "<title to get insert into>",
"status": "<status to get insert into>",
"image_url": "<image_url to get insert into>"
}
```
_Response (200 - OK)_
```
{
"id": "<give id by system>",
"title": "<posted title>",
"image_url": "<posted image_url>",
"status": "<posted status>",
"createdAt: "<automatically inserted system>",
"updatedAt: "<automatically inserted system>"
}
```
_Response (401 - accessDenied)_
```
{
  "message": "no access for this action"
}
```
_Response (404 - notFound)_
```
{
  "message": "resource not found"
}
```
_Response (400 - Bad Request)_
```
{
  Error message from SequelizeValdationError
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "error from the server"
}
```
&nbsp;

## DELETE /banners/:id
_Request Header_
```
{
  "access_token": "<access_token>"
}
```
_Request Params_
```
{
  "id": "<depend on banner id>"
}
```
_Response (200 - OK)_
```
{
  "msg": "banner has been deleted"
}
```
&nbsp;

## GET /carts
_Request Header_
```
{
  "access_token": "<access_token>"
}
```
_Request Body_
```
not needed
```
_Response (200 - OK)_
```
[
  {
    "quantity": "<posted quantity>",
    "UserId": "<give id by system>",
    "ProductId": "<give id by system>",
    "createdAt: "<automatically inserted system>",
    "updatedAt: "<automatically inserted system>"
    "Product":
      {
        "id": "<give id by system>",
        "name": "<posted name>",
        "image_url": "<posted image_url>",
        "price": "<posted price>",
        "stock": "<posted stock>",
        "createdAt: "<automatically inserted system>",
        "updatedAt: "<automatically inserted system>"
      }
  }
]
```
_Response (500 - Internal Server Error)_
```
{
  "message": "error from the server"
}
```
&nbsp;

## POST /carts
_Request Header_
```
{
  "access_token": "<access_token>"
}
```
_Request Body_
```
{
  "ProductId": "<id get insert into>",
}
```
_Response (201 - OK)_
```
{
"quantity": "<posted quantity>",
"UserId": "<give id by system>",
"ProductId": "<give id by system>",
"createdAt: "<automatically inserted system>",
"updatedAt: "<automatically inserted system>"
}
```
_Response (200 - OK)_
```
[
  {
    "quantity": "<posted quantity>",
    "UserId": "<give id by system>",
    "ProductId": "<give id by system>",
    "createdAt: "<automatically inserted system>",
    "updatedAt: "<automatically inserted system>"
  }
]
```
_Response (500 - Internal Server Error)_
```
{
  "message": "error from the server"
}
```
&nbsp;

## PATCH /carts/inc
_Request Header_
```
{
  "access_token": "<access_token>"
}
```
_Request Body_
```
{
  "ProductId": "<id get insert into>",
}
```
_Response (200 - OK)_
```
[
  [
    {
      "quantity": "<posted quantity>",
      "UserId": "<give id by system>",
      "ProductId": "<give id by system>",
      "createdAt: "<automatically inserted system>",
      "updatedAt: "<automatically inserted system>"
    }
  ]
]
```
_Response (500 - Internal Server Error)_
```
{
  "message": "error from the server"
}
```
&nbsp;

## PATCH /carts/dec
_Request Header_
```
{
  "access_token": "<access_token>"
}
```
_Request Body_
```
{
  "ProductId": "<id get insert into>",
}
```
_Response (200 - OK)_
```
[
  [
    {
      "quantity": "<posted quantity>",
      "UserId": "<give id by system>",
      "ProductId": "<give id by system>",
      "createdAt: "<automatically inserted system>",
      "updatedAt: "<automatically inserted system>"
    }
  ]
]
```
_Response (500 - Internal Server Error)_
```
{
  "message": "error from the server"
}
```
&nbsp;

## DELETE /carts
_Request Header_
```
{
  "access_token": "<access_token>"
}
```
_Request Body_
```
{
  "ProductId": "<id get insert into>"
}
```
_Response (200 - OK)_
```
{
  "msg": "<Item successfully removed from your cart>"
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "error from the server"
}
```
&nbsp;

## POST /wishlists
_Request Header_
```
{
  "access_token": "<access_token>"
}
```
_Request Body_
```
{
  "ProductId": "<id get insert into>",
}
```
_Response (201 - OK)_
```
{
"UserId": "<give id by system>",
"ProductId": "<give id by system>",
"createdAt: "<automatically inserted system>",
"updatedAt: "<automatically inserted system>"
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "error from the server"
}
```
&nbsp;

## GET /wishlists
_Request Header_
```
{
  "access_token": "<access_token>"
}
```
_Request Body_
```
not needed
```
_Response (200 - OK)_
```
[
  {
    "UserId": "<give id by system>",
    "ProductId": "<give id by system>",
    "createdAt: "<automatically inserted system>",
    "updatedAt: "<automatically inserted system>"
    "Product":
      {
        "id": "<give id by system>",
        "name": "<posted name>",
        "image_url": "<posted image_url>",
        "price": "<posted price>",
        "stock": "<posted stock>",
        "createdAt: "<automatically inserted system>",
        "updatedAt: "<automatically inserted system>"
      }
  }
]
```
_Response (500 - Internal Server Error)_
```
{
  "message": "error from the server"
}
```
&nbsp;

## DELETE /wishlists
_Request Header_
```
{
  "access_token": "<access_token>"
}
```
_Request Body_
```
{
  "ProductId": "<id get insert into>"
}
```
_Response (200 - OK)_
```
{
  "msg": "<Item successfully removed from your wishlists>"
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "error from the server"
}
```
&nbsp;
