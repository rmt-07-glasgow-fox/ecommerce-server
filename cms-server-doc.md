# E-Commerce CMS Server

E-Commerce CMS is a content management system for our E-commerce site. This app has :

- RESTful endpoint for user login and product's CRUD operations
- JSON formatted response

&nbsp;

## RESTful endpoints

- POST /register
- POST /login
- POST /loginCMS
- POST /products
- GET /products
- GET /products/:id
- PUT /products/:id
- PATCH /products/:id
- DELETE /products/:id
- GET /categories
- GET /carts
- POST /carts
- PATCH /carts/:id
- DELETE /carts/:id
- POST /carts/checkout

### POST /register

> User register

_Request Header_

```
not needed
```

_Request Body_

```
{
  "email": "< user email >",
  "password": "< user password >"
}
```

_Response (200 - Ok)_

```
{
    "id": < user id >,
    "email": "< user email >",
    "role": "< user role >",
    "access_token": "< jwt access token >"
}
```

_Response (400 - Bad Request)_

```
{
    "errors": [
        "< error message >"
    ]
}
```

---

### POST /login

> User login

_Request Header_

```
not needed
```

_Request Body_

```
{
  "email": "< user email >",
  "password": "< user password >"
}
```

_Response (200 - Ok)_

```
{
    "id": < user id >,
    "email": "< user email >",
    "role": "< user role >",
    "access_token": "< jwt access token >"
}
```

_Response (400 - Bad Request)_

```
{
    "errors": [
        "< error message >"
    ]
}
```

---

### POST /loginCMS

> Admin login

_Request Header_

```
not needed
```

_Request Body_

```
{
  "email": "< user email >",
  "password": "< user password >"
}
```

_Response (200 - Ok)_

```
{
    "id": < user id >,
    "email": "< user email >",
    "role": "< user role >",
    "access_token": "< jwt access token >"
}
```

_Response (400 - Bad Request)_

```
{
    "errors": [
        "< error message >"
    ]
}
```

---

_Response (401- Unauthorized)_

```
{
    "errors": [
        "< error message >"
    ]
}
```

---

### GET /products

> Get all products

_Request Header_

```
{
  "access_token": "< your access token >"
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
    "id": < id >,
    "name": "< product name >",
    "image_url": "< image url >",
    "price": < product price >,
    "stock": < product stock >,
    "createdAt": "< time stamp >",
    "updatedAt": "< time stamp >"
  },
  {
    "id": < id >,
    "name": "< product name >",
    "image_url": "< image url >",
    "price": < product price >,
    "stock": < product stock >,
    "createdAt": "< time stamp >",
    "updatedAt": "< time stamp >"
  },
]
```

_Response (400 - Bad Request)_

```
{
    "errors": [
        "< error message >"
    ]
}
```

---

### GET /products/:id

> Get a product

_Request Header_

```
{
  "access_token": "< your access token >"
}
```

_Request Params_

```
"id": "< product id >"
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
  "id": < id >,
  "name": "< product name >",
  "image_url": "< image url >",
  "price": < product price >,
  "stock": < product stock >,
  "createdAt": "< time stamp >",
  "updatedAt": "< time stamp >"
}
```

_Response (400 - Bad Request)_

```
{
    "errors": [
        "< error message >"
    ]
}
```

---

### POST /products

> Create new product

_Request Header_

```
{
  "access_token": "< your access token >"
}
```

_Request Body_

```
{
  "name": "< product name >",
  "image_url": "< image url >",
  "price": < product price >,
  "stock": < product stock >,
}
```

_Response (201 - Created)_

```
{
  "id": < id >,
  "name": "< product name >",
  "image_url": "< image url >",
  "price": < product price >,
  "stock": < product stock >,
  "createdAt": "< time stamp >",
  "updatedAt": "< time stamp >"
}
```

_Response (400 - Bad Request)_

```
{
    "errors": [
        "< error message >"
    ]
}
```

---

### PUT /products/:id

> Update a product

_Request Header_

```
{
  "access_token": "< your access token >"
}
```

_Request Params_

```
"id": "< product id >"
```

_Request Body_

```
{
  "name": "< product name >",
  "image_url": "< image url >",
  "price": < product price >,
  "stock": < product stock >,
}
```

_Response (201 - Created)_

```
{
  "id": < id >,
  "name": "< product name >",
  "image_url": "< image url >",
  "price": < product price >,
  "stock": < product stock >,
  "createdAt": "< time stamp >",
  "updatedAt": "< time stamp >"
}
```

_Response (400 - Bad Request)_

```
{
    "errors": [
        "< error message >"
    ]
}
```

---

### DELETE /products/:id

> Delete a product

_Request Header_

```
{
  "access_token": "< your access token >"
}
```

_Request Params_

```
"id": "< product id >"
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    "message": "Product has been deleted"
}
```

_Response (400 - Bad Request)_

```
{
    "errors": [
        "< error message >"
    ]
}
```

---

### GET /categories

> Get all categories

_Request Header_

```
{
  "access_token": "< your access token >"
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
    "id": < id >,
    "name": "< category name >",
    "createdAt": "< time stamp >",
    "updatedAt": "< time stamp >"
  },
  {
    "id": < id >,
    "name": "< category name >",
    "createdAt": "< time stamp >",
    "updatedAt": "< time stamp >"
  },
]
```

_Response (400 - Bad Request)_

```
{
    "errors": [
        "< error message >"
    ]
}
```

---

### GET /carts

> Get all cart items

_Request Header_

```
{
  "access_token": "< your access token >"
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
        "id": < cart id >,
        "UserId": < user id >,
        "ProductId": < product id >,
        "amount": < amount >,
        "isBought": < status bought or not >,
        "User": {
            "id": < user id >,
            "email": "< user email >",
            "role": "< user role >"
        },
        "Product": {
            "id": < product id >,
            "name": "< product name >",
            "image_url": "< product image url >",
            "price": < product price >,
            "stock": < product stock >,
            "CategoryId": < product's category id >,
            "Category": {
                "id": < product's category id >,
                "name": "< product's category name >"
            }
        }
    },
]
```

_Response (400 - Bad Request)_

```
{
    "errors": [
        "< error message >"
    ]
}
```

---

### POST /carts

> Create new cart item

_Request Header_

```
{
  "access_token": "< your access token >"
}
```

_Request Body_

```
{
  "ProductId": "< product id >",
  "amount": "< amount of product in cart >"
}
```

_Response (200 - Ok)_

If the product is not in the cart yet

```
{
  "UserId": < user id >,
  "ProductId": < product id >,
  "amount": < amount >,
  "isBought": false,
  "createdAt": "< time stamp >",
  "updatedAt": "< time stamp >"
}
```

If product exists in cart it simply updates the amount

```
[
    1,
    [
        {
            "UserId": < user id >,
            "ProductId": < product id >,
            "amount": < amount >,
            "isBought": false,
            "createdAt": "< time stamp >",
            "updatedAt": "< time stamp >"
        }
    ]
]
```

_Response (400 - Bad Request)_

```
{
    "errors": [
        "< error message >"
    ]
}
```

---

### PATCH /carts/:id

> Updates cart item

_Request Header_

```
{
  "access_token": "< your access token >"
}
```

_Request Params_

```
"id": "< cart id >"
```

_Request Body_

```
{
  "ProductId": "< product id >",
  "amount": "< amount of product in cart >"
}
```

_Response (200 - Ok)_

```
[
    1,
    [
        {
            "UserId": < user id >,
            "ProductId": < product id >,
            "amount": < amount >,
            "isBought": false,
            "createdAt": "< time stamp >",
            "updatedAt": "< time stamp >"
        }
    ]
]
```

_Response (400 - Bad Request)_

```
{
    "errors": [
        "< error message >"
    ]
}
```

---

### DELETE /carts/:id

> Deletes cart item

_Request Header_

```
{
  "access_token": "< your access token >"
}
```

_Request Params_

```
"id": "< cart id >"
```

_Request Body_

```
not needed
```

_Response (200 - Ok)_

```
{
    "message": "Cart item successfully deleted"
}
```

_Response (400 - Bad Request)_

```
{
    "errors": [
        "< error message >"
    ]
}
```

---

### POST /carts/checkout

> Checkout cart

_Request Header_

```
{
  "access_token": "< your access token >"
}
```

_Request Body_

```
[
    {
        "id": < cart id >,
        "UserId": < user id >,
        "ProductId": < product id >,
        "amount": < amount >,
        "isBought": < status bought or not >,
        "User": {
            "id": < user id >,
            "email": "< user email >",
            "role": "< user role >"
        },
        "Product": {
            "id": < product id >,
            "name": "< product name >",
            "image_url": "< product image url >",
            "price": < product price >,
            "stock": < product stock >,
            "CategoryId": < product's category id >,
            "Category": {
                "id": < product's category id >,
                "name": "< product's category name >"
            }
        }
    },
]
```

_Response (200 - Ok)_

```
{
  message: 'Checkout successful'
}
```

_Response (500 - Internal Server Error)_

```
{
    "errors": [
        "< error message >"
    ]
}
```

---