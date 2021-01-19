# E-commerce

## Available endpoints
- `POST /register`
- `POST /login`

- `GET /products`
- `POST /products`
- `PUT /products/:id`
- `PATCH /products/:id`
- `DELETE /products/:id`

## RESTful endpoints
### POST /register

> create user

_Request Header_
```
    not needed
```
_Request Body_
```
{
    email : "example@mal.com",
    password : "examplepassword"
}
```
_Response (201 - Created)_
```
{
    "id": 1,
    "email": "example@mail.com",
    "password": "<hashed password>",
    "updatedAt": "2021-01-15T00:38:33.042Z",
    "createdAt": "2021-01-15T00:38:33.042Z"
}
```
_Response (400 - Bad Request)_
```
{
    "message": [
        "Email has been registered",
        "Invalid email format",
        "Minimal password length is 6 character"
    ]
}
```
_Response (500 - Internal Server Error)_
```
{
    "message" : "Internal Server Error"
}
```

### POST /login

> login user

_Request Header_
```
    not needed
```
_Request Body_
```
{
    email : "example@mal.com",
    password : "examplepassword"
}
```
_Response (200 - OK)_
```
{
    "access_token" : "<access_token>"
}
```
_Response (401 - Unauthorized)_
```
{
    "message": "Invalid Email / Password"
}
```
_Response (500 - Internal Server Error)_
```
{
    "message" : "Internal Server Error"
}
```

### GET /products

> fetch all product data

_Request Header_
```
    access_token(string)
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
        "name": "example",
        "image_url": "https://images.unsplash.com/photo-1593078165899-c7d2ac0d6aea?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1650&q=80",
        "price" : 100000,
        "stock" : 5
        "createdAt": "2021-01-12T08:48:28.555Z",
        "updatedAt": "2021-01-14T14:34:15.442Z",
        "UserId": 1,
        "User": {
            "id": 1,
            "email": "example@mail.com"
        }
    }
]
```
_Response (403 - Forbidden Access)_
```
{
    "message" : "Login Required"
}
```
_Response (500 - Internal Server Error)_
```
{
    "message" : "Internal Server Error"
}
```

### POST /products

> add product

_Request Header_
```
    access_token(string)
```
_Request Body_
```
{
    "name" : "example",
    "image_url" : "https://images.unsplash.com/photo-1593078165899-c7d2ac0d6aea?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1650&q=80",
    "price" : 100000
    "stock" : 5
}
```
_Response (200 - OK)_
```
{
    "id": 1,
    "name" : "example",
    "image_url" : "https://images.unsplash.com/photo-1593078165899-c7d2ac0d6aea?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1650&q=80",
    "price" : 100000
    "stock" : 5
    "UserId": 1,
    "updatedAt": "2021-01-15T00:50:09.371Z",
    "createdAt": "2021-01-15T00:50:09.371Z"
}
```
_Response (400 - Bad Request)_
```
{
    "message": [
        "Title must be filled"
    ]
}
```
_Response (403 - Forbidden Access)_
```
{
    "message" : "Login Required"
}
```
_Response (500 - Internal Server Error)_
```
{
    "message" : "Internal Server Error"
}
```

### PUT /products/:id

> edit products stock based on id

_Request Header_
```
    access_token(string)
```
_Request Body_
```
{
    "stock" : 10
}
```
_Request Params_
```
    id=[integer]
```
_Response (200 - OK)_
```
{
    "id": 1,
    "name" : "example",
    "image_url" : "https://images.unsplash.com/photo-1593078165899-c7d2ac0d6aea?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1650&q=80",
    "price" : 100000
    "stock" : 10
    "UserId": 1,
    "updatedAt": "2021-01-15T00:50:09.371Z",
    "createdAt": "2021-01-15T00:50:09.371Z"
}
```
_Response (401 - Unauthorized)_
```
{
    "message": "Do not have access"
}
```
_Response (403 - Forbidden Access)_
```
{
    "message" : "Login Required"
}
```
_Response (404 - Not Found)_
```
{
    "message": "Not found"
}
```
_Response (500 - Internal Server Error)_
```
{
    "message" : "Internal Server Error"
}
```

### PATCH /products/:id

> edit products information based on id

_Request Header_
```
    access_token(string)
```
_Request Body_
```
{
    "name" : "other example",
    "image_url" : "",
    "price" : 50000
}
```
_Request Params_
```
    id=[integer]
```
_Response (200 - OK)_
```
{
    "id": 1,
    "name" : "other example",
    "image_url" : "",
    "price" : 50000
    "stock" : 10
    "UserId": 1,
    "updatedAt": "2021-01-15T00:50:09.371Z",
    "createdAt": "2021-01-15T00:50:09.371Z"
}
```
_Response (401 - Unauthorized)_
```
{
    "message": "Do not have access"
}
```
_Response (403 - Forbidden Access)_
```
{
    "message" : "Login Required"
}
```
_Response (404 - Not Found)_
```
{
    "message": "Not found"
}
```
_Response (500 - Internal Server Error)_
```
{
    "message" : "Internal Server Error"
}
```

### DELETE /products/:id

> delete products based on id

_Request Header_
```
    access_token(string)
```
_Request Body_
```
    not needed
```
_Request Params_
```
    id=[integer]
```
_Response (200 - OK)_
```
{
    "message": "Product Deleted"
}
```
_Response (401 - Unauthorized)_
```
{
    "message": "Do not have access"
}
```
_Response (403 - Forbidden Access)_
```
{
    "message" : "Login Required"
}
```
_Response (404 - Not Found)_
```
{
    "message": "Not found"
}
```
_Response (500 - Internal Server Error)_
```
{
    "message" : "Internal Server Error"
}
```