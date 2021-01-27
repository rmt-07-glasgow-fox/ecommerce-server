# E-commerce CMS App Server
E-commerce CMS is an application to manage your products as admin. This app has : 
* RESTful endpoint for task's CRUD operation
* JSON formatted response

&nbsp;

## List available endpoints
- `POST /products`
- `GET /products`
- `GET /products/:id`
- `PUT /products/:id`
- `DELETE /products/:id`

## Auth
- `POST /register`
- `POST /login`

## Banner
- `POST /banners`
- `GET /banners`
- `GET /banners/:id`
- `PUT /banners/:id`
- `PATCH /banners/:id`
- `DELETE /banners/:id`

## RESTful endpoints
### POST /products

> Create new products

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
  "name": "samsung",
  "image_url": "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1222&q=80",
  "price": 1000000,
  "stock": 99,
}
```
#### Success

_Response (201 - Created)_
```json
{
  "id": 1,
  "name": "samsung",
  "image_url": "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1222&q=80",
  "price": 1000000,
  "stock": 99,
  "createdAt": "2021-01-04T14:23:52.990Z",
  "updatedAt": "2021-01-04T14:23:52.990Z"
}
```
#### Error

_Response (400 - Bad Request)_
```json
{
  "errors": ["name is required", ".."]
}
```
_Response (500 - Internal Server Error)_
```json
{
  "errors": ["internal server error"]
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
#### Success

_Response (200)_
```json
[
  {
    "id": 1,
    "name": "samsung",
    "image_url": "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1222&q=80",
    "price": 1000000,
    "stock": 99,
    "createdAt": "2021-01-04T14:23:52.990Z",
    "updatedAt": "2021-01-04T14:23:52.990Z"
  }
]
```
#### Error

_Response (500 - Internal Server Error)_
```json
{
  "errors": ["internal server error"]
}
```
---
### GET /products/:id

> Get product by id

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Params_
```json
{ "id": 1}
```
#### Success

_Response (200)_
```json
{
  "id": 1,
  "name": "samsung",
  "image_url": "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1222&q=80",
  "price": 1000000,
  "stock": 99,,
  "createdAt": "2021-01-04T14:23:52.990Z",
  "updatedAt": "2021-01-04T14:23:52.990Z"
}
```
#### Error

_Response (404 - Error Not Found)_
```json
{
  "errors": ["error not found"]
}
```

_Response (500 - Internal Server Error)_
```json
{
  "errors": ["internal server error"]
}
```
---
### PUT /products/:id

> replace product by id

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
  "name": "Canon",
  "image_url": "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1222&q=80",
  "price": 1000000,
  "stock": 99,
}
```

_Request Params_
```json
{ "id": 1}
```
#### Success

_Response (200)_
```json
{
  "id": 1,
  "name": "Canon",
  "image_url": "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1222&q=80",
  "price": 1000000,
  "stock": 99,
  "createdAt": "2021-01-04T14:23:52.990Z",
  "updatedAt": "2021-01-05T14:23:52.990Z"
}
```
#### Error

_Response (404 - Error Not Found)_
```json
{
  "errors": ["error not found"]
}
```

_Response (400 - Bad Request)_
```json
{
  "errors": ["name is required", ".."]
}
```

_Response (500 - Internal Server Error)_
```json
{
  "errors": ["internal server error"]
}
```
---
### DELETE /products/:id

> remove data product by id

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Params_
```json
{ "id": 1}
```
#### Success

_Response (200)_
```json
{
  "message": "product success to delete"
}
```
#### Error

_Response (404 - Error Not Found)_
```json
{
  "erros": ["error not found"]
}
```

_Response (500 - Internal Server Error)_
```json
{
  "errors": ["internal server error"]
}
```
---

### POST /register

> post newUser

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
  "email": "admin@mail.com",
  "password": "12345678",
  "role": "customer"
}
```
#### Success

_Response (201)_
```json
{
  "id": 1,
  "email": "email@mail.com",
  "role": "customer"
}
```
#### Error

_Response (400 - Bad Request)_
```json
{
  "errors": ["email is required", ".."]
}

_Response (500 - Internal Server Error)_
```json
{
  "errors": ["internal server error"]
}
```
---

### POST /login

> login to the page

_Request Header_
```
not needed
```

_Request Body_
```json
{
  "email": "admin@mail.com",
  "password": "12345678",
}
```
#### Success

_Response (200)_
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJ1c2VyMUBtYWlsLmNvbSIsImlhdCI6MTYxMDE5MDIyNH0.q7zuoMoxZ-bcNQLcZ6EaQy2lMJiMDQ5PGk63rbJrGEA",
  "username": "user1"
}
```
#### Error

_Response (500 - Internal Server Error)_
```json
{
  "errors": ["internal server error"]
}
```
---
### POST /banners

> Create new banner

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
  "id": 3,
  "title": "Fashion",
  "image_url": "https://img.freepik.com/free-vector/promotion-fashion-banner_1188-223.jpg?size=626&ext=jpg",
  "status": false,
}
```
#### Success

_Response (201 - Created)_
```json
{
  "id": 3,
  "title": "Fashion",
  "image_url": "https://img.freepik.com/free-vector/promotion-fashion-banner_1188-223.jpg?size=626&ext=jpg",
  "status": false,
  "updatedAt": "2021-01-23T12:06:03.256Z",
  "createdAt": "2021-01-23T12:06:03.256Z"
}
```
#### Error

_Response (400 - Bad Request)_
```json
{
  "errors": ["title is required", ".."]
}
```
_Response (500 - Internal Server Error)_
```json
{
  "errors": ["internal server error"]
}
```
---
### GET /banners

> Get all banners

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
#### Success

_Response (200)_
```json
[
  {
    "id": 3,
    "title": "Fashion",
    "image_url": "https://img.freepik.com/free-vector/promotion-fashion-banner_1188-223.jpg?size=626&ext=jpg",
    "status": false,
    "updatedAt": "2021-01-23T12:06:03.256Z",
    "createdAt": "2021-01-23T12:06:03.256Z"
  }
]
```
#### Error

_Response (500 - Internal Server Error)_
```json
{
  "errors": ["internal server error"]
}
```
---
### GET /banners/:id

> Get banner by id

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Params_
```json
{ "id": 1}
```
#### Success

_Response (200)_
```json
{
  "id": 3,
  "title": "Fashion",
  "image_url": "https://img.freepik.com/free-vector/promotion-fashion-banner_1188-223.jpg?size=626&ext=jpg",
  "status": false,
  "updatedAt": "2021-01-23T12:06:03.256Z",
  "createdAt": "2021-01-23T12:07:03.256Z"
}
```
#### Error

_Response (404 - Error Not Found)_
```json
{
  "errors": ["error not found"]
}
```

_Response (500 - Internal Server Error)_
```json
{
  "errors": ["internal server error"]
}
```
---
### PUT /banners/:id

> replace banner by id

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
  "title": "Electronic",
  "image_url": "https://img.freepik.com/free-vector/promotion-fashion-banner_1188-223.jpg?size=626&ext=jpg",
  "status": false,
}
```

_Request Params_
```json
{ "id": 1}
```
#### Success

_Response (200)_
```json
{
  "id": 3,
  "title": "Electronic",
  "image_url": "https://img.freepik.com/free-vector/promotion-fashion-banner_1188-223.jpg?size=626&ext=jpg",
  "status": false,
  "updatedAt": "2021-01-23T12:06:03.256Z",
  "createdAt": "2021-01-23T12:06:07.256Z"
}
```
#### Error

_Response (404 - Error Not Found)_
```json
{
  "errors": ["error not found"]
}
```

_Response (400 - Bad Request)_
```json
{
  "errors": ["title is required", ".."]
}
```

_Response (500 - Internal Server Error)_
```json
{
  "errors": ["internal server error"]
}
```
---
### PATCH /banners/:id

> modify status banner by id

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
  "status": true,
}
```

_Request Params_
```json
{ "id": 1}
```
#### Success

_Response (200)_
```json
{
  "id": 3,
  "title": "Electronic",
  "image_url": "https://img.freepik.com/free-vector/promotion-fashion-banner_1188-223.jpg?size=626&ext=jpg",
  "status": true,
  "updatedAt": "2021-01-23T12:06:03.256Z",
  "createdAt": "2021-01-23T12:06:07.256Z"
}
```
#### Error

_Response (404 - Error Not Found)_
```json
{
  "errors": ["error not found"]
}
```

_Response (400 - Bad Request)_
```json
{
  "errors": ["status is required"]
}
```

_Response (500 - Internal Server Error)_
```json
{
  "errors": ["internal server error"]
}
```
---
### DELETE /banners/:id

> remove data banner by id

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Params_
```json
{ "id": 1}
```
#### Success

_Response (200)_
```json
{
  "message": "banner success to delete"
}
```
#### Error

_Response (404 - Error Not Found)_
```json
{
  "erros": ["error not found"]
}
```

_Response (500 - Internal Server Error)_
```json
{
  "errors": ["internal server error"]
}
```
---
