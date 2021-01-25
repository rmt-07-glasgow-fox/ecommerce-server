# Ec9mmerce CMS Server
Ecommerce CMS is an application to manage your assets. This app has : 
* RESTful endpoint for task's CRUD operation
* JSON formatted response

&nbsp;

## RESTful endpoints

### POST /products

> Create new product

_Request Header_
```
{
  "access_token": "<your access token>"
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

_Response (201 - Created)_
```
{
  "id": <given id by system>,
  "name": "<posted title>",
  "image_url": "<posted image_url>",
  "price": "<posted price>",
  "stock": "<posted stock>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
  "UserId": "<posted UserId>",
}
```


_Response (401 - Unauthorized)_
```
{
    "message": "Please login first"
}
```
_Response (401 - Unauthorized)_
```
{
    "message": "Unauthorized"
}
```

_Response (400 - Bad Request)_
```
{
    "message": "Name is required"
}
```

_Response (400 - Bad Request)_
```
{
    "message": "cannot be less than zero or a negative number"
}
```

_Response (400 - Bad Request)_
```
{
    "message": "Stock Must Be Integer"
}
```

_Response (500 - Internal Server Error)_
```
{
    "message": "Internal Server Error"
}
```

---
### GET /products

> Get all products

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
[
  {
    "id": 1,
    "name": "<product name>",
    "image_url": "<product image_url>",
    "price": "<product price>",
    "stock": "<product stock>",
    "UserId": "<UserId>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z"
  },
 {
    "id": 2,
    "name": "<product name>",
    "image_url": "<product image_url>",
    "price": "<product price>",
    "stock": "<product stock>",
    "UserId": "<UserId>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z"
  }
]
```

_Response (401 - Unauthorized)_
```
{
    "message": "Please login first"
}
```

_Response (401 - Unauthorized)_
```
{
    "message": "Unauthorized"
}
```

_Response (500 - Internal Server Error)_
```
{
    "message": "Internal Server Error"
}
```

---
### GET /products/:id

> Get product by ID

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    "id": 1,
    "name": "<product name>",
    "image_url": "<product image_url>",
    "price": "<product price>",
    "stock": "<product stock>",
    "UserId": "<UserId>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z"
}
```

_Response (401 - Unauthorized)_
```
{
    "message": "Please login first"
}
```

_Response (401 - Unauthorized)_
```
{
    "message": "Unauthorized"
}
```

_Response (500 - Internal Server Error)_
```
{
    "message": "Internal Server Error"
}
```

---
### PUT /products/:id

> PUT products by ID

_Request Header_
```
{
  "access_token": "<your access token>"
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

_Response (200)_
```
{
    "id": 1,
    "name": "<product name>",
    "image_url": "<product image_url>",
    "price": "<product price>",
    "stock": "<product stock>",
    "UserId": "<UserId>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z"
}
```

_Response (401 - Unauthorized)_
```
{
    "message": "Unauthorized"
}
```

_Response (401 - Unauthorized)_
```
{
    "message": "Please login first"
}
```

_Response (400 - Bad Request)_
```
{
    "message": "Name is required"
}
```

_Response (400 - Bad Request)_
```
{
    "message": "cannot be less than zero or a negative number"
}
```

_Response (400 - Bad Request)_
```
{
    "message": "Stock Must Be Integer"
}
```

_Response (500 - Internal Server Error)_
```
{
    "message": "Internal Server Error"
}
```

---
### PATCH /products/:id

> PATCH products by ID

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "name": "<name to get insert into>"
}
```

_Response (200)_
```
{
    "id": 1,
    "name": "<product name>",
    "image_url": "<product image_url>",
    "price": "<product price>",
    "stock": "<product stock>",
    "UserId": "<UserId>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z"
}
```

_Response (401 - Unauthorized)_
```
{
    "message": "Unauthorized"
}
```

_Response (401 - Unauthorized)_
```
{
    "message": "Please login first"
}
```

_Response (400 - Bad Request)_
```
{
    "message": "Name is required"
}
```
_Response (500 - Internal Server Error)_
```
{
    "message": "Internal Server Error"
}
```

---
### DELETE /proucts/:id

> DELETE products by ID

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    "message": "Task has been deleted"
}
```

_Response (401 - Unauthorized)_
```
{
    "message": "Unauthorized"
}
```

_Response (401 - Unauthorized)_
```
{
    "message": "Please login first"
}
```

_Response (500 - Internal Server Error)_
```
{
    "message": "Internal Server Error"
}
```

---
### POST /register

> CREATE new user

_Request Header_
```
not needed
```

_Request Body_
```
{
  "email": "<email to get insert into>",
  "password": "<password to get insert into>"
  "role": "customer by default"
}
```

_Response (201 - Created)_
```
{
  "id": <given id by system>,
  "email": "<posted email>",
  "role": "customer"
}
```

_Response (400 - Bad Request)_
```
{
    "message": "Validation error: Invalid email format"
}

```

_Response (500 - Internal Server Error)_
```
{
    "message": "Internal Server Error"
}
```

---
### POST /login

> LOGIN user

_Request Header_
```
not needed
```

_Request Body_
```
{
  "email": "<email to get insert into>",
  "password": "<password to get insert into>"
}
```

_Response (200)_
```
  {
    "access_token": <generate token>
  }
```

_Response (400 - Bad Request)_
```
{
    "message": "Invalid email / password"
}
```

_Response (500 - Internal Server Error)_
```
{
    "message": "Internal Server Error"
}
```


