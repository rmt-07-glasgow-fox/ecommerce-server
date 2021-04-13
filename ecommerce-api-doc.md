# E-commerce Documentation

E-commerce Shoes Corner app is an application for shopping shoes. This app has :
* Authentication and Authorization Server
* Register and Login
* Single page application
* CRUD Product
* CRUD Cart
* Vue based client
* JSON formatted response

## List available endpoints
- `POST /login` => login for admin
- `POST /customer/login` => login for customer
- `POST /customer/register` => register and create cart for customer
- `GET /products` => read all products
- `POST /products` => create products
- `PUT /products/:id` => edit products
- `DELETE /products/:id` => delete products
- `GET /carts/:cartid` => get all product by CartId
- `POST /carts/:cartid/:productid` => add product to cart or update if product already added 
- `PATCH /carts/:cartid/:productid` => edit quantity
- `DELETE /carts/:cartid/:productid` => remove product from cart

## RESTful endpoints
### POST /login

> login user admin

_Request Header_
```json

none
```

_Request Body_
```json

{
      "email": "admin@mail.com",
      "password": "qweqwe"
}
```

_Response (200)_
```json

{
      "access_token": "<access_token>"
}
```
_Response (400 - Bad Request)_
```json

{
  "message": "Invalid email/password"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Invalid request"
}
```
---
### POST /customer/register

> register/add user customer and create cart for customer

_Request Header_
```json

none
```

_Request Body_
```json

{
      "email": "didin@mail.com",
      "password": "qweqwe"
}
```

_Response (201)_
```json

{
    "id": 4,
    "UserId": 5,
    "updatedAt": "2021-01-28T00:07:01.632Z",
    "createdAt": "2021-01-28T00:07:01.632Z"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Invalid email/password format"
}
```
_Response (500 - Internal Server Error)_
```json
{
  "message": "Invalid request"
}
```
---


> logi user via google

_Request Header_
```json

none
```

_Request Body_
```json

{
      "id_token": "<id_token>",
}
```

_Response (200)_
```json

{
      "access_token": "<access_token>"
}
```
_Response (400 - Bad Request)_
```json

{
  "message": "Invalid email/password"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Invalid request"
}
```
---
### POST /customer/login

> login user customer

_Request Header_
```json

none
```

_Request Body_
```json

{
      "email": "dummy@mail.com",
      "password": "qweqwe"
}
```

_Response (200)_
```json

{
      "access_token": "<access_token>"
}
```
_Response (400 - Bad Request)_
```json

{
  "message": "Invalid email/password"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Invalid request"
}
```
---
### GET /products

> Get all products

_Request Header_
```json

none
```

_Request Body_
```json

not needed
```

_Response (200)_
```json

[
    {
        "id": 1,
        "name": "Adidas Gazelle Shoes",
        "image_url": "https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy/61f87dec481e4512823ea7fb0080ba1a_9366/Gazelle_Shoes_Black_BB5476_01_standard.jpg",
        "price": 2300000,
        "stock": 23,
        "createdAt": "2021-01-26T14:06:10.576Z",
        "updatedAt": "2021-01-26T14:06:10.576Z",
        "UserId": null
    },
    {
        "id": 2,
        "name": "Adidas NMD R1_SHOES",
        "image_url": "https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy/189b449050ef49b1aa68a8ba010163e6_9366/NMD_R1_Shoes_White_D96635_01_standard.jpg",
        "price": 2300000,
        "stock": 23,
        "createdAt": "2021-01-26T14:08:23.325Z",
        "updatedAt": "2021-01-26T14:08:23.325Z",
        "UserId": null
    }
]
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Invalid request"
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
        "name": "Adidas Gazelle Shoes",
        "image_url": "https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy/61f87dec481e4512823ea7fb0080ba1a_9366/Gazelle_Shoes_Black_BB5476_01_standard.jpg",
        "price": 2300000,
        "stock": 23
    }
```

_Response (201 - Created)_
```json


    {
        "id": 1,
        "name": "Adidas Gazelle Shoes",
        "image_url": "https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy/61f87dec481e4512823ea7fb0080ba1a_9366/Gazelle_Shoes_Black_BB5476_01_standard.jpg",
        "price": 2300000,
        "stock": 23,
        "createdAt": "2021-01-26T14:06:10.576Z",
        "updatedAt": "2021-01-26T14:06:10.576Z",
        "UserId": null
    }
```

_Response (400 - Bad Request)_
```json

{
  "message": "name is required"
}
```
_Response (400 - Bad Request)_
```json

{
  "message": "image_url is required"
}
```
_Response (400 - Bad Request)_
```json

{
  "message": "price is cannot lower than 0"
}
```
_Response (400 - Bad Request)_
```json

{
  "message": "stock is cannot lower than 0"
}
```
### PUT /products/:id

> edit product by id

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json

{
      "name": "Adidas Gazelle Shoes",
      "image_url": "https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy/61f87dec481e4512823ea7fb0080ba1a_9366/Gazelle_Shoes_Black_BB5476_01_standard.jpg",
      "price": 2300000,
      "stock": 23
}
```

_Request Params_
```json

"id": 3
```

_Response (200)_
```json

    {
        "name": "Adidas Gazelle Shoes",
        "image_url": "https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy/61f87dec481e4512823ea7fb0080ba1a_9366/Gazelle_Shoes_Black_BB5476_01_standard.jpg",
        "price": 2300000,
        "stock": 23
    }
```

_Response (400 - Bad Request)_
```json
{
  "message": "Invalid requests"
}
```
### DELETE /products/:id

> Delete products by id

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json

not needed
```

_Request Params_
```json

"id": 3
```

_Response (200)_
```json
{
  "message": "delete success"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "Inot found"
}
```
### GET /carts/:cartid

> Get all products in cart

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```
_Request Params_
```json
{
      "cartid": 2,
      "productid": 3
}
```

_Request Body_
```json

not needed
```

_Response (200)_
```json

[
    {
        "CartId": 2,
        "ProductId": 2,
        "quantity": 6,
        "createdAt": "2021-01-27T13:21:03.879Z",
        "updatedAt": "2021-01-27T18:48:43.593Z",
        "Product": {
            "id": 2,
            "name": "Adidas NMD R1_SHOES",
            "image_url": "https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy/189b449050ef49b1aa68a8ba010163e6_9366/NMD_R1_Shoes_White_D96635_01_standard.jpg",
            "price": 2300000,
            "stock": 23,
            "createdAt": "2021-01-26T14:08:23.325Z",
            "updatedAt": "2021-01-26T14:08:23.325Z",
            "UserId": null
        }
    },
    {
        "CartId": 2,
        "ProductId": 4,
        "quantity": 1,
        "createdAt": "2021-01-27T18:15:24.062Z",
        "updatedAt": "2021-01-28T00:26:43.775Z",
        "Product": {
            "id": 4,
            "name": "Adidas ZX 8000 Lego",
            "image_url": "https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy/08708ff932c348c88654abbc00eefb42_9366/ZX_8000_LEGO(r)_Shoes_Yellow_FZ3482_01_standard.jpg",
            "price": 2300000,
            "stock": 23,
            "createdAt": "2021-01-26T14:09:41.106Z",
            "updatedAt": "2021-01-26T14:09:41.106Z",
            "UserId": null
        }
    }
]
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Invalid request"
}
```
---
### POST /carts/:cartid/:productid

> add product in cart

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```
_Request Params_
```json
{
  "cartid": 2,
  "productid": 2
}
```

_Request Body_
```json

    {
        "quantity": 6
    }
```

_Response (201 - Created)_
```json


    {
        "CartId": 2,
        "ProductId": 2,
        "quantity": 6,
        "createdAt": "2021-01-27T13:21:03.879Z",
        "updatedAt": "2021-01-27T18:48:43.593Z",
        "Product": {
            "id": 2,
            "name": "Adidas NMD R1_SHOES",
            "image_url": "https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy/189b449050ef49b1aa68a8ba010163e6_9366/NMD_R1_Shoes_White_D96635_01_standard.jpg",
            "price": 2300000,
            "stock": 23,
            "createdAt": "2021-01-26T14:08:23.325Z",
            "updatedAt": "2021-01-26T14:08:23.325Z",
            "UserId": null
        }
    }
```

_Response (400 - Bad Request)_
```json

{
  "message": "quantity is required"
}
```
### PATCH /carts/:cartid/:productid

> edit quantity

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```
_Request Params_
```json
{
  "cartid": 2,
  "productid": 2
}
```

_Request Body_
```json

{
      "quantity": 1
}
```
_Response (200)_
```json

    {
        "CartId": 2,
        "ProductId": 2,
        "quantity": 1,
        "createdAt": "2021-01-27T13:21:03.879Z",
        "updatedAt": "2021-01-27T18:48:43.593Z",
        "Product": {
            "id": 2,
            "name": "Adidas NMD R1_SHOES",
            "image_url": "https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy/189b449050ef49b1aa68a8ba010163e6_9366/NMD_R1_Shoes_White_D96635_01_standard.jpg",
            "price": 2300000,
            "stock": 23,
            "createdAt": "2021-01-26T14:08:23.325Z",
            "updatedAt": "2021-01-26T14:08:23.325Z",
            "UserId": null
        }
    }
```

_Response (400 - Bad Request)_
```json
{
  "message": "quantity is required"
}
```
### DELETE /carts/:cartid/:productid

> Remove products in cart

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```
_Request Params_
```json
{
  "cartid": 2,
  "productid": 2
}
```

_Request Body_
```json

not needed
```

_Response (200)_
```json
{
  "message": "delete success"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "not found"
}
```