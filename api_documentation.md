# Ecommerce App Server
Ecommerce App is an application to manage your ecommerce. This app has : 
* RESTful endpoint for authtentication operation
* RESTful endpoint for product's CRUD operation
* RESTful endpoint for categories CRUD operation
* RESTful endpoint for banner's CRUD operation
* JSON formatted response

&nbsp;

## RESTful endpoints

_Auth Endpoint_
- `POST /login`
- `POST /register`

_Products Endpoint_
- `GET /products`
- `GET /products/:id`
- `POST /products`
- `PUT /products/:id`
- `DELETE /products/:id`

_Categories Endpoint_
- `GET /categories`
- `GET /categories/:id`
- `POST /categories`
- `PUT /categories/:id`
- `DELETE /categories/:id`

_Banners Endpoint_
- `GET /banners`
- `GET /banners/:id`
- `POST /banners`
- `PUT /banners/:id`
- `DELETE /banners/:id`



### POST /login

> login to app

_Request Header_
```
{
  not needed
}
```

_Request Body_
```json
{
  "email": "<email to get login>",
  "password": "<password to get login>",
}
```

_Response (200)_
```json
{
  "access_token": "<login access token>"
}
```

_Response (401 - Unauthorized)_
```json
{
  "errors": 
    "email or password wrong"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "errors": "Internal server error"
}
```

---

### POST /register

> Register new user

_Request Header_
```
{
  not needed
}
```

_Request Body_
```json
{
  "email": "<email to get register>",
  "password": "<password to get register>",
  "role": "<role to get register>"
}
```

_Response (201 - Created)_
```json
{
  "email": "<posted email>",
  "password": "<posted password>",
  "role": "<posted first name>"
}
```

_Response (400 - Bad Request)_
```json
{
  "errors": [
        "email must be unique"
        "invalid email",
        "field email is required",
        "field password is required",
        "password must at least 6 character",
        "field email is required",
        "role should be one of admin or customer",
        "field last name is required"
    ]
}
```

_Response (500 - Internal Server Error)_
```json
{
  "errors": "Internal server error"
}
```
---
### GET /products

> Get all product

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
{
  "totalItems": 2,
  "per_page": 5,
  "data": [
      {
          "id": 1,
          "name": "<product name>",
          "image_url": "<product image url>",
          "price": "<product price>",
          "stock": "<product stock>",
          "categoryId": "<product category id>",
          "userId": "<product user id>",
          "createdAt": "2021-01-24T06:09:17.186Z",
          "updatedAt": "2021-01-24T06:09:17.186Z",
          "category": {
              "id": 1,
              "name": "<category name>",
              "createdAt": "2021-01-24T06:08:23.194Z",
              "updatedAt": "2021-01-24T06:08:23.194Z"
          }
      },
      {
          "id": 2,
          "name": "<product name>",
          "image_url": "<product image url>",
          "price": "<product price>",
          "stock": "<product stock>",
          "categoryId": "<product category id>",
          "userId": "<product user id>",
          "createdAt": "2021-01-24T06:09:17.186Z",
          "updatedAt": "2021-01-24T06:09:17.186Z",
          "category": {
              "id": 1,
              "name": "<category name>",
              "createdAt": "2021-01-24T06:08:23.194Z",
              "updatedAt": "2021-01-24T06:08:23.194Z"
          }
      },
  ],
  "totalPages": 1,
  "currentPage": 1
}
```

_Response (500 - Internal Server Error)_
```json
{
  "errors": "Internal server error"
}
```
---
### GET /products/:id

> Get a product

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
{
  "id": 1,
  "name": "<product name>",
  "image_url": "<product image url>",
  "price": "<product price>",
  "stock": "<product stock>",
  "categoryId": "<product category id>",
  "userId": "<product user id>",
  "createdAt": "2021-01-24T06:09:17.186Z",
  "updatedAt": "2021-01-24T06:09:17.186Z",
  "category": {
      "id": 1,
      "name": "<category name>",
      "createdAt": "2021-01-24T06:08:23.194Z",
      "updatedAt": "2021-01-24T06:08:23.194Z"
  }
}
```

_Response (401 - Unauthorized)_
```json
{
  "errors": "unauthorized!"
}
```

_Response (404 - Not Found)_
```json
{
  "errors": "not found"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "errors": "Internal server error"
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
  "price": "<price to get insert into>",
  "stock": "<stock to get insert into>",
  "categoryId": "<category id to get insert into>"
}
```

_Response (201 - Created)_
```json
{
  "id": "<given id by system>",
  "name": "<posted name>",
  "image_url": "<posted image url>",
  "price": "<posted price>",
  "stock": "<posted stock>",
  "categoryId": "<posted category id>",
  "userId": "<posted user id>",
  "updatedAt": "2021-01-13T00:55:09.093Z",
  "createdAt": "2021-01-13T00:55:09.093Z",
}
```

_Response (400 - Bad Request)_
```json
{
  "errors": [
        "name is required",
        "stock is required",
        "stock cannot be negative",
        "price is required",
        "price cannot be negative",
        "category is required",
        "user is required",
    ]
}
```

_Response (500 - Internal Server Error)_
```json
{
  "errors": "Internal server error"
}
```

---
### PUT /products/:id

> Update product

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
  "name": "<name to get update into>",
  "image_url": "<image url to get update into>",
  "price": "<price to get update into>",
  "stock": "<stock to get update into>",
  "categoryId": "<category id to get update into>"
}
```

_Response (200)_
```json
{
  "id": "<id product>",
  "name": "<updated name>",
  "image_url": "<updated image url>",
  "price": "<updated price>",
  "stock": "<updated stock>",
  "categoryId": "<updated category id>",
  "updatedAt": "2021-01-13T00:55:09.093Z",
  "createdAt": "2021-01-13T00:55:09.093Z",
}
```

_Response (400 - Bad Request)_
```json
{
  "errors": [
        "name is required",
        "stock is required",
        "stock cannot be negative",
        "price is required",
        "price cannot be negative",
        "category is required",
        "user is required",
  ]
}
```

_Response (401 - Unauthorized)_
```json
{
  "errors": "unauthorized!"
}
```

_Response (404 - Not Found)_
```json
{
  "errors": "not found"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "errors": "Internal server error"
}
```
### DELETE /products/:id

> Delete product

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
{
  "message": "product successfully deleted",
}
```

_Response (401 - Unauthorized)_
```json
{
  "errors": "unauthorized!"
}
```

_Response (404 - Not Found)_
```json
{
  "errors": "not found"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "errors": "Internal server error"
}
```
---
### GET /categories

> Get all category

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
{
  "totalItems": 2,
  "per_page": 5,
  "data": [
      {
          "id": 1,
          "name": "<category name>",
          "createdAt": "2021-01-24T06:09:17.186Z",
          "updatedAt": "2021-01-24T06:09:17.186Z"
      },
      {
          "id": 2,
          "name": "<category name>",
          "createdAt": "2021-01-24T06:09:17.186Z",
          "updatedAt": "2021-01-24T06:09:17.186Z"
      },
  ],
  "totalPages": 1,
  "currentPage": 1
}
```

_Response (500 - Internal Server Error)_
```json
{
  "errors": "Internal server error"
}
```
---
### GET /categories/:id

> Get a category

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
{
  "id": 1,
  "name": "<category name>",
  "createdAt": "2021-01-24T06:09:17.186Z",
  "updatedAt": "2021-01-24T06:09:17.186Z"
}
```

_Response (401 - Unauthorized)_
```json
{
  "errors": "unauthorized!"
}
```

_Response (404 - Not Found)_
```json
{
  "errors": "not found"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "errors": "Internal server error"
}
```
---
### POST /categories

> Create new category

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
  "name": "<name to get insert into>"
}
```

_Response (201 - Created)_
```json
{
  "id": "<given id by system>",
  "name": "<posted name>",
  "updatedAt": "2021-01-13T00:55:09.093Z",
  "createdAt": "2021-01-13T00:55:09.093Z",
}
```

_Response (400 - Bad Request)_
```json
{
  "errors": [
        "name is required",
    ]
}
```

_Response (500 - Internal Server Error)_
```json
{
  "errors": "Internal server error"
}
```

---
### PUT /categories/:id

> Update category

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
  "name": "<name to get update into>"
}
```

_Response (200)_
```json
{
  "id": "<id category>",
  "name": "<updated name>",
  "updatedAt": "2021-01-13T00:55:09.093Z",
  "createdAt": "2021-01-13T00:55:09.093Z",
}
```

_Response (400 - Bad Request)_
```json
{
  "errors": [
        "name is required"
  ]
}
```

_Response (401 - Unauthorized)_
```json
{
  "errors": "unauthorized!"
}
```

_Response (404 - Not Found)_
```json
{
  "errors": "not found"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "errors": "Internal server error"
}
```
### DELETE /categories/:id

> Delete category

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
{
  "message": "category successfully deleted",
}
```

_Response (401 - Unauthorized)_
```json
{
  "errors": "unauthorized!"
}
```

_Response (404 - Not Found)_
```json
{
  "errors": "not found"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "errors": "Internal server error"
}
```
---
### GET /banners

> Get all banner

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
{
  "totalItems": 2,
  "per_page": 5,
  "data": [
      {
          "id": 1,
          "title": "<banner title>",
          "image_url": "<banner image_url>",
          "status": "<banner status>",
          "createdAt": "2021-01-24T06:09:17.186Z",
          "updatedAt": "2021-01-24T06:09:17.186Z"
      },
      {
          "id": 2,
          "title": "<banner title>",
          "image_url": "<banner image_url>",
          "status": "<banner status>",
          "createdAt": "2021-01-24T06:09:17.186Z",
          "updatedAt": "2021-01-24T06:09:17.186Z"
      },
  ],
  "totalPages": 1,
  "currentPage": 1
}
```

_Response (500 - Internal Server Error)_
```json
{
  "errors": "Internal server error"
}
```
---
### GET /banners/:id

> Get a product

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
{
  "id": 1,
  "title": "<banner title>",
  "image_url": "<banner image_url>",
  "status": "<banner status>",
  "createdAt": "2021-01-24T06:09:17.186Z",
  "updatedAt": "2021-01-24T06:09:17.186Z"
}
```

_Response (401 - Unauthorized)_
```json
{
  "errors": "unauthorized!"
}
```

_Response (404 - Not Found)_
```json
{
  "errors": "not found"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "errors": "Internal server error"
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
  "name": "<name to get insert into>",
  "image_url": "<image_url to get insert into>",
  "status": "<status to get insert into>",
}
```

_Response (201 - Created)_
```json
{
  "id": "<given id by system>",
  "title": "<posted title>",
  "image_url": "<posted image url>",
  "updatedAt": "2021-01-13T00:55:09.093Z",
  "createdAt": "2021-01-13T00:55:09.093Z",
}
```

_Response (400 - Bad Request)_
```json
{
  "errors": [
        "title is required",
        "image url is required",
        "status is required",
  ]
}
```

_Response (500 - Internal Server Error)_
```json
{
  "errors": "Internal server error"
}
```

---
### PUT /banners/:id

> Update banner

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
  "name": "<name to get update into>",
  "image_url": "<image_url to get update into>",
  "status": "<status to get update into>",
}
```

_Response (200)_
```json
{
  "id": "<id category>",
  "title": "<updated title>",
  "image_url": "<updated image url>",
  "status": "<updated status>",
  "updatedAt": "2021-01-13T00:55:09.093Z",
  "createdAt": "2021-01-13T00:55:09.093Z",
}
```

_Response (400 - Bad Request)_
```json
{
  "errors": [
        "title is required",
        "image url is required",
        "status is required",
  ]
}
```

_Response (401 - Unauthorized)_
```json
{
  "errors": "unauthorized!"
}
```

_Response (404 - Not Found)_
```json
{
  "errors": "not found"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "errors": "Internal server error"
}
```
### DELETE /banners/:id

> Delete banner

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
{
  "message": "banners successfully deleted",
}
```

_Response (401 - Unauthorized)_
```json
{
  "errors": "unauthorized!"
}
```

_Response (404 - Not Found)_
```json
{
  "errors": "not found"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "errors": "Internal server error"
}
```