# E-Commerce CMS

## Available endpoints
- `POST /register`
- `POST /login`
- `POST /loginAdmin`
- `GET /carts`
- `POST /carts`
- `PUT /carts/:id`
- `DELETE /carts/:id`
- `POST /products`
- `GET /products`
- `GET /products/:id`
- `PUT /products/:id`
- `DELETE /products/:id`

## RESTful endpoints
### POST /register

> Create user with role "customer"

_Request Header_
```
not needed
```

_Request Body_
```
{
  "email": "<email to get insert into>",
  "password": "<password to get insert into>",
  "role": "customer"
}
```

_Response (200 - OK)_
```
{
  "id": "<given by system>",
  "email": "<posted email>"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "<Validation Errors>"
}
```
---
### POST /login

> Log in for user with role "customer"

_Request Header_
```
not needed
```

_Request Body_
```
{
  "email": "<email>",
  "password": "<password>"
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
  "message": "Invalid Email/Password"
}
```
---
### POST /loginAdmin

> Login for user with role "admin"

_Request Header_
```
not needed
```

_Request Body_
```
{
  "email": "<email to get insert into>",
  "password": "<password to get insert into>",
  "role": "admin"
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
  "message": "Invalid Email/Password"
}
```
_Response (401 - Unauthorized)_
```
{
  "message": "Unauthorized"
}
```

---
### GET /carts

> Get all carts from user

_Request Header_
```
{
  access_token: "<access_token>"
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
      "id": 14,
      "UserId": 3,
      "ProductId": 10,
      "quantity": 1,
      "status": "In Cart",
      "createdAt": "2021-01-27T18:19:49.711Z",
      "updatedAt": "2021-01-27T18:19:49.711Z",
      "Product": {
          "id": 10,
          "name": "Bolster",
          "image_url": "https://www.shopmarriott.com/images/products/v2/xlrg/Marriott-block-print-bolster-pillow-MAR-108-B-BP_xlrg.jpg",
          "price": 2000000,
          "stock": 123123,
          "createdAt": "2021-01-24T02:58:35.374Z",
          "updatedAt": "2021-01-24T02:58:35.374Z"
      }
  },
  {
      "id": 15,
      "UserId": 3,
      "ProductId": 12,
      "quantity": 1,
      "status": "In Cart",
      "createdAt": "2021-01-27T19:00:24.599Z",
      "updatedAt": "2021-01-27T19:00:24.599Z",
      "Product": {
          "id": 12,
          "name": "Bolster",
          "image_url": "https://www.shopmarriott.com/images/products/v2/xlrg/Marriott-block-print-bolster-pillow-MAR-108-B-BP_xlrg.jpg",
          "price": 1984,
          "stock": 123,
          "createdAt": "2021-01-24T05:01:52.478Z",
          "updatedAt": "2021-01-24T05:01:52.478Z"
      }
  }
]
```
_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---
### POST /carts

> Create cart

_Request Header_
```
{
  access_token: "<access_token>"
}
```

_Request Body_
```
{
  ProductId: "<ProductId to get insert into>"
}
```

_Response (200 - OK)_
```
{
  "message: "Cart has been updated"
}
```
_Response (201 - OK)_
```
{
    "id": 14,
    "UserId": 3,
    "ProductId": 10,
    "quantity": 1,
    "status": "In Cart",
    "createdAt": "2021-01-27T18:19:49.711Z",
    "updatedAt": "2021-01-27T18:19:49.711Z"
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---
### PUT /carts/:id

> Update cart

_Request Header_
```
{
  access_token: "<access_token>"
}
```

_Request Body_
```
{
  ProductId: "<ProductId to get insert into>",
  quantity: "<quantity>"
}
```

_Response (200 - OK)_
```
{
    "id": 14,
    "UserId": 3,
    "ProductId": 10,
    "quantity": <"updated quantity">,
    "status": "In Cart",
    "createdAt": "2021-01-27T18:19:49.711Z",
    "updatedAt": "2021-01-27T18:19:49.711Z"
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---
### DELETE /carts/:id

> Delete cart based on id

_Request Header_
```
{
  access_token: "<access_token>"
}
```

_Request Body_
```
{
  not needed
}
```

_Response (200 - OK)_
```
{
    "message": "Cart has been deleted"
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---
### POST /products

> Create new products

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
  "stock": "<stock to get insert into>",
  "price": "<price to get insert into>"
}
```

_Response (201 - Created)_
```
{
  "id": <given id by system>,
  "name": "<posted name>",
  "image_url": "<posted image_url>",
  "stock": "<posted stock>",
  "price": "<posted price>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
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
  "message": "<validation errors>"
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
not needed
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
[
  {
    "id": 1,
    "name": "<name>",
    "image_url": "<image_url>",
    "stock": "<stock>",
    "price": "<price>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  },
  {
    "id": 2,
    "name": "<name>",
    "image_url": "<image_url>",
    "stock": "<stock>",
    "price": "<price>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }
]
```
_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---
### GET /products/:id

> Get product by id

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

_Response (200 - OK)_
```
{
    "id": 1,
    "name": "<name>",
    "image_url": "<image_url>",
    "stock": "<stock>",
    "price": "<price>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
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

> Update product based on id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "name": "<new name>",
  "image_url": "<new image_url>",
  "stock": "<new stock>",
  "price": "<new price>",
}
```

_Response (200 - OK)_
```
[{
  "id": "<id>",
  "name": "<updated name>",
  "image_url": "<updated image_url>",
  "stock": "<updated stock>",
  "price": "<updated price>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}]
```
_Response (400 - Bad Request)_
```
{
  "message": "<validation errors>"
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
### DELETE /products/:id

> Delete product based on id

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

_Response (200 - OK)_
```
{
  "message": 'Product has been deleted.'
}
```
_Response (404 - Not Found)_
```
{
  "message": "Not Found"
}
```
_Response (401 - Unauthorized)_
```
{
  "message": "Unauthorized"
}
```
_Response (500 - Internal Server Errors)_

---