# Ecommerce App
Ecommerce App is an application where you can input your product and go online shop. This app has pros : 
* User Friendly
* Easy to Use
* RESTful endpoint for CRUD operation
* JSON formatted response

&nbsp;

## List of available endpoints
- `POST /register`
- `POST /login`
- `GET /products`
- `POST /products`
- `PUT /products/:id`
- `PATCH /products/:id`
- `DELETE /products/:id`
- `GET /categories`

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
  "role": "<role to get insert into>"
}
```

_Response (201)_
```json
{
  "message": "Register success"
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
  "message": "Internal server error"
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
  "password": "<password to get compare>",
  "role": "<role to get compare>"
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
  "message": "Invalid email/ password"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal server error"
}
```
---
### GET /products

> Get all products

_Request Header_
```
{
not needed
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
    "name": "<name product>",
    "image_url": "<url for image product>",
    "price": "<price product>",
    "stock": "<price stock>",
    "UserId": "<user id>"
  },
  {
    "id": 2,
    "name": "<name product>",
    "image_url": "<url for image product>",
    "price": "<price product>",
    "stock": "<price stock>",
    "UserId": "<user id>"
  }
]
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal server error"
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
  "image_url": "<url image to get insert into>",
  "price": "<price to get insert into>",
  "stock": "<price to get insert into>"
}
```

_Response (201 - Created)_
```json
{
  "id": <given id by system>,
  "name": "<posted name>",
  "image_url": "<posted url image>",
  "price": "posted <price>",
  "stock": "<posted price>",
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
  "message": "Internal server error"
}
```
---
### GET /products/:id

> Get product which id inputed

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
    "name": "<name product>",
    "image_url": "<url for image product>",
    "price": "<price product>",
    "stock": "<price stock>",
    "UserId": "<user id>"
  },
  {
    "id": 2,
    "name": "<name product>",
    "image_url": "<url for image product>",
    "price": "<price product>",
    "stock": "<price stock>",
    "UserId": "<user id>"
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
  "message": "Not found"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal server error"
}
```
---
### PUT /products/:id

> Update product which id inputed


_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Params_
```json
{
    "id": "<id product want to be updated>"
}
```

_Request Body_
```json
{
  "name": "<name to get insert into>",
  "image_url": "<url image to get insert into>",
  "price": "<price to get insert into>",
  "stock": "<price to get insert into>"
}
```

_Response (200)_
```json
{
  "message": "Update success"
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
  "message": "Internal server error"
}
```
---
### PATCH /products/:id

> Update stock product which id inputed

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Params_
```json
{
    "id": "<id product want to be updated>"
}
```

_Request Body_
```json
{
  "stock": "<stock to get updated>"
}
```

_Response (200)_
```json
{
  "message": "Success"
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
  "message": "Internal server error"
}
```
---
### DELETE /products/:id

> Delete product which id inputed

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Params_
```json
{
    "id": "<id product want to be deleted>"
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
  "message": "Product has been deleted"
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
  "message": "Internal server error"
}
```
---
### GET /categories

> Get all products

_Request Header_
```
{
not needed
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
    "tag": "<tag category>"
  },
  {
    "id": 2,
    "tag": "<tag category>"
  }
]
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal server error"
}
```
---
### GET /cart

---
### POST /cart

---
### PATCH /cart/:id

---
### DELETE /cart/:id

---
### GET /wishlist

---
### POST /wishlist

---
### GET /banner

---