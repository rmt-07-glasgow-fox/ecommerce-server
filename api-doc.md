# Beautiv Server
Beautiv is an e-commerce providing variety of skincare, makeup, and haircare products. 

&nbsp;

## RESTful endpoints

POST /login
POST /products
GET /products
GET /products/:id
PUT /products/:id
DELETE /products/:id

POST /banners
GET /banners
GET /banners/:id
PUT /banners/:id
DELETE /banners/:id
POST /carts
GET /carts
PUT /carts
PATCH /carts/:id/edit
DELETE /carts/:id/delete
GET /wishlists
POST /wishlists
DELETE /wishlists

### POST /login

> login user as admin

_Request Header_
```
{
  not needed
}
```

_Request Body_
```
{
  "email": string,
  "password": string
}
```

_Response (200 - OK)_
```
{
  accessToken
}
```

_Response (400 - Bad Request)_
```
{
  errors
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "internal server error"
}
```

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
  "name": string,
  "imageUrl": string,
  "price": integer,
  "stock": integer
}
```

_Response (201 - Created)_
```
{
  "name": string,
  "imageUrl": string,
  "price": integer,
  "stock": integer
}
```

_Response (400 - Bad Request)_
```
{
  Validation error
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "internal server error"
}
```

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

_Response (200 - OK)_
```
[
    {
        "name": string,
        "imageUrl": string,
        "price": integer,
        "stock": integer
    }
]
```

_Response (500 - Internal Server Error)_
```
{
  "message": "internal server error"
}
```

### GET /products/:id

> Get products by id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Params_
```
{ id: integer}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
  {
    "name": string,
    "imageUrl": string,
    "price": integer,
    "stock": integer  
  }
```

_Response (500 - Internal Server Error)_
```
{
  "message": "internal server error"
}
```


### PUT /products/:id

> Update product by id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Params_
```
{ id: <posted id>}
```

_Request Body_
```
{
  "name": string,
  "imageUrl": string,
  "price": integer,
  "stock": integer
}
```

_Response (200 - OK)_
```
  {
    "message": "edit product successfull"
  }
```
_Response (400 - Bad Request)_
```
{
  Validation error
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```


### DELETE /products/:id

> Delete product by id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```
_Request Params_
```
{ id: integer}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
  {
    message : "delete product successfull"
  }
```

_Response (500 - Internal Server Error)_
```
{
  "message": "internal server error"
}
```

### POST /banners

> Create new banner

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "title": string,
  "status": string,
  "imageUrl": integer
}
```

_Response (201 - Created)_
```
{
  "title": string,
  "status": string,
  "imageUrl": integer
}
```

_Response (400 - Bad Request)_
```
{
  Validation error
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "internal server error"
}
```

### GET /banners

> Get all banners

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
[
    {
        "title": string,
        "status": string,
        "imageUrl": integer
    }
]
```

_Response (500 - Internal Server Error)_
```
{
  "message": "internal server error"
}
```

### GET /banners/:id

> Get banners by id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Params_
```
{ id: integer}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
  {
    "title": string,
    "status": string,
    "imageUrl": integer  
  }
```

_Response (500 - Internal Server Error)_
```
{
  "message": "internal server error"
}
```


### PUT /banners/:id

> Update banner by id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Params_
```
{ id: <posted id>}
```

_Request Body_
```
{
  "title": string,
  "status": string,
  "imageUrl": integer
}
```

_Response (200 - OK)_
```
  {
    "message": "edit banner successfull"
  }
```
_Response (400 - Bad Request)_
```
{
  Validation error
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```


### DELETE /banners/:id

> Delete banner by id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```
_Request Params_
```
{ id: integer}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
  {
    message : "delete banner successfull"
  }
```

_Response (500 - Internal Server Error)_
```
{
  "message": "internal server error"
}
```

### POST /carts

> Create new cart

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "ProductId": integer
}
```

_Response (201 - Created)_
```
{
  "id": integer,
  "ProductId": integer,
  "UserId": integer,
  "quantity": integer
}
```

_Response (400 - Bad Request)_
```
{
  Validation error
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "internal server error"
}
```

### GET /carts

> Get all carts

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
[
    {
        "id": integer,
        "ProductId": integer,
        "UserId": integer,
        "quantity": integer,
        "status":string,
        "Product":object
    }
]
```

_Response (500 - Internal Server Error)_
```
{
  "message": "internal server error"
}
```


### PUT /carts

> Checkout carts

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Params_
```
not needed
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
    "message": "Checkout successfull"
  }
```
_Response (400 - Bad Request)_
```
{
  Validation error
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```

### PATCH /carts/:id

> Checkout carts

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Params_
```
{ id: integer}
```

_Request Body_
```
{
  "quantity":integer
}
```

_Response (200 - OK)_
```
  {
    "message": "added!"
  }
```
_Response (400 - Bad Request)_
```
{
  Validation error
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```



### DELETE /carts/:id/delete

> Delete cart by id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```
_Request Params_
```
{ id: integer}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
  {
    message : "delete cart successfull"
  }
```

_Response (500 - Internal Server Error)_
```
{
  "message": "internal server error"
}
```


### POST /wishlists

> Create new wishlist

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "ProductId": integer
}
```

_Response (201 - Created)_
```
{
  "id": integer,
  "ProductId": integer,
  "UserId": integer
}
```

_Response (400 - Bad Request)_
```
{
  Validation error
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "internal server error"
}
```

### GET /wishlists

> Get all wishlist

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
[
    {
        "id": integer,
        "ProductId": integer,
        "UserId": integer,
        "Product": object
    }
]
```

_Response (500 - Internal Server Error)_
```
{
  "message": "internal server error"
}
```

### DELETE /wishlists/:id/delete

> Delete cart by id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```
_Request Params_
```
{ id: integer}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
  {
    message : "delete wishlist successfull"
  }
```

_Response (500 - Internal Server Error)_
```
{
  "message": "internal server error"
}
```

---
