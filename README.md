 E-Commerce CMS Server

E-Commerce CMS is a content management system for our E-commerce site. This app has :

- RESTful endpoint for user login and product's CRUD operations
- JSON formatted response

&nbsp;

## RESTful endpoints

- POST /login
- POST /products
- GET /products
- GET /products/:id
- PUT /products/:id
- PATCH /products/:id
- DELETE /products/:id

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