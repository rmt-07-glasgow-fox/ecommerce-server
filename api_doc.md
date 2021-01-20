# E-commerce
E-commerce is an application to upload product and commercial application, This app has : 
* User Friendly
* Easy to Use
* RESTful endpoint for product CRUD operation
* JSON formatted response

&nbsp;

## List of available endpoints
- `POST /register`
- `POST /login`
- `GET /products`
- `POST /products`
- `PUT /products/:id`
- `DELETE /products/:id`

## RESTful endpoints
### POST /register

> Create new user

_Request Header_
```
{
not needed
}
```

_Request Body_
```json
{
  "email": "<email to get insert into>",
  "password": "<password to get insert into>",
  "role": "<password to get insert into>"
}
```

_Response (201)_
```json
{
  "id": <given id by system>,
  "email": "<posted email>",
  "role": "<posted role>"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "<err>"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Error in internal server"
}
```
---
### POST /login

> Compare data login on database with data inputed

_Request Header_
```
{
not needed
}
```

_Request Body_
```json
{
  "email": "<email to get compare>",
  "password": "<password to get compare>"
}
```

_Response (200)_
```json
{
  "acces_token": "<your acces token>"
}
```

_Response (401 - Unauthorized)_
```json
{
  "message": "Invalid email / password"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Error in internal server"
}
```
---
### GET /products

> Get all products

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```json
[
  {
    "id": 1,
    "name": "<name>",
    "image_url": "<image url>",
    "price": "<price>",
    "stock": "<stock>"
  },
  {
    "id": 2,
    "name": "<name>",
    "image_url": "<image url>",
    "price": "<price>",
    "stock": "<stock>"
  }
]
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Error in internal server"
}
```
---
### POST /products

> Create new product

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
  "name": "<name to get insert into>",
  "image_url": "<image url to get insert into>",
  "price" : "<price to get insert into>",
  "stock" : "<stock to get insert into>"
}
```

_Response (201 - Created)_
```json
{
  "id": <given id by system>,
  "name": "<posted name>",
  "image_url": "<posted image url>",
  "price" : "<posted price>",
  "stock" : "<posted stock>"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "<err>"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Error in internal server"
}
```
---
### GET /products/:id

> Get product with the id inputed

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Params_
```json
{
    "id": "<id product want to get>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```json
[
  {
    "id": 1,
    "name": "<name>",
    "image_url": "<image url>",
    "price": "<price>",
    "stock": "<stock>"
  },
  {
    "id": 2,
    "name": "<name>",
    "image_url": "<image url>",
    "price": "<price>",
    "stock": "<stock>"
  }
]
```

_Response (400 - Bad Request)_
```json
{
  "message": "<err>"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "Error Not found"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Error in internal server"
}
```
---
### PUT /products/:id

> Update task with the id inputed


_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Params_
```json
{
    "id": "<id task want to be updated>"
}
```

_Request Body_
```json
{
  "name": "<name to get updated>",
  "image_url": "<image url to get updated>",
  "price" : "<price to get updated>",
  "stock" : "<stock to get updated>"
}
```

_Response (200)_
```json
{
  "id": 1,
  "name": "<name>",
  "image_url": "<image url>",
  "price": "<price>",
  "stock": "<stock>"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "<err>"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "Not found"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Error in internal server"
}
```
---

### DELETE /products/:id

> Delete task with the id inputed

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Params_
```json
{
    "id": "<id task want to be deleted>"
}
```

_Request Body_
```
{
not needed
}
```

_Response (200)_
```json
{
  "message": "Product success to delete"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "<err>"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "Error Not found"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Error in internal server"
}
```
---
