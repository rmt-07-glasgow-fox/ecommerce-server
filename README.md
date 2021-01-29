# ecommerce-server
```
Simple ecommerce web app, using express, sequelize, axios, vue-cli and vuex
* REST API endpoint for product's CRUD operation
* REST API endpoint for Category's CRUD operation
* JSON formatted response
```

# USAGE
```
Open your text editor with Node.js in your computer and then run `npm install`
Run `npm run dev`  to start the server with nodemon
Run `npm start` to start the server with node only
```

## Restful endpoints
<!-- --- -->
# URL
```
Client URL : http://localhost:8080
Server URL : http://localhost:3000
```

## ENDPOINT LIST
- POST /products
- GET /products
- GET /products/:id
- PUT /products/:id
- DELETE /products/:id
- GET /carts
- POST /carts
- PUT /carts/:id
- DELETE /carts/:id
- POST /register
- POST /login


## POST/products

>Create new product
_Request Header_
```
{
  access_token: token
}
```
_Request Body_
```
{
  name: "Hanayo Koizumi Figma",
  image_url: "https://i.pinimg.com/originals/73/59/e9/7359e96dd9a6508001bf102023ebf0a1.jpg",
  price: 699999,
  stock: 100
}
```
_Response (201 - Created)_
```
{
  "id": <given id by system>,
  name: "posted title",
  image_url: "posted url",
  price: "posted price,
  stock: "posted stock,
}
```
_Response(400- bad request)_
```
{
  "Error" :  "VALIDATION_ERROR"
  "message": "Name is required, Image Url is required, Price is required, Price cannot less then 0, Price must be integer, Stock cannot less then 0, Stock is required"
}
```
_Response(401- Not Logged In)_
```
{
  "Error" :  "notLogin"
  "message": "You Must login First"
}
```
_Response (500)_
```
{
  "Error": "INTERNAL_SERVER_ERROR",
  "message": "Your Internal Server Is not Connect / Error"
}
```

## GET/products

>get all products list

_Request Header_
```
{
  access_token: token
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
        id": 1,
        "name": "Hanayo Koizumi Figma",
        "image_url": "https://images.goodsmile.info/cgm/images/product/20171030/6831/48435/large/7266159b3d48c57dbe8dc0701f8fc737.jpg",
        "price": 199999,
        "stock": 100,
        "createdAt": "2021-01-24T05:54:47.011Z",
        "updatedAt": "2021-01-24T05:54:47.011Z",
        "UserId": 1
    }
]
```
_Response(401- Not Logged In)_
```
{
  "Error" :  "notLogin"
  "message": "You Must login First"
}
```
_Response (500)_
```
{
  "Error": "INTERNAL_SERVER_ERROR",
  "message": "Your Internal Server Is not Connect / Error"
}
```

## GET/products/:id

>get all products list by ID

_Request Header_
```
{
  access_token: token
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
        id": 1,
        "name": "Hanayo Koizumi Figma",
        "image_url": "https://images.goodsmile.info/cgm/images/product/20171030/6831/48435/large/7266159b3d48c57dbe8dc0701f8fc737.jpg",
        "price": 199999,
        "stock": 100,
        "createdAt": "2021-01-24T05:54:47.011Z",
        "updatedAt": "2021-01-24T05:54:47.011Z",
        "UserId": 1
    }
]
```
_Response(401- Not Logged In)_
```
{
  "Error" :  "notLogin"
  "message": "You Must login First"
}
```
_Response (500)_
```
{
  "Error": "INTERNAL_SERVER_ERROR",
  "message": "Your Internal Server Is not Connect / Error"
}
```

## PUT/products/:id

>Update product by ID
_Request Header_
```
{
  access_token: token
}
```


_Request Body_
```
{
    "name": "Hanayo Koizumi Figma",
    "image_url": "https://i.pinimg.com/originals/ab/35/6c/ab356c6f2baea304b6ac1d23814859f6.jpg",
    "price": 199999,
    "stock": 100,
}
```
_Response(200)_
```
{
    "message": "Success Update"
}
```
_Response(400- bad request)_
```
{
  "Error" :  "VALIDATION_ERROR"
  "message": "Name is required, Image Url is required, Price is required, Price cannot less then 0, Price must be integer, Stock cannot less then 0, Stock is required"
}
```
_Response(401- Not Logged In)_
```
{
  "Error" :  "notLogin"
  "message": "You Must login First"
}
```
_Response(403- Unauthorized)_
```
{
  "Error" :  "Unauthorized"
  "message": "You not Unauthorized"
}
```
_Response(404 - Not Found)_
```
{
  "Error": "resourceNotFound",
  "message": "Data Not Found"
}
```

_Response (500)_
```
{
  "Error": "INTERNAL_SERVER_ERROR",
  "message": "internal server error"
}
```

## DELETE/products/:id

>Delete product by ID
_Request Header_
```
{
  access_token: token
}
```

_Response(200)_
```
{
  "message": "Success Delete Data"
}
```

_Response(401- Not Logged In)_
```
{
  "Error" :  "notLogin"
  "message": "You Must login First"
}
```
_Response(403- Unauthorized)_
```
{
  "Error" :  "Unauthorized"
  "message": "You not Unauthorized"
}
```

_Response (500)_
```
{
  "Error": "INTERNAL_SERVER_ERROR",
  "message": "internal server error"
}
```

## POST/register

>Create new user account
_Request Header_
```
not needed
```

_Request Body_
```
{
  "email": <User's email> string,
  "password": <User's password> string,
  "role": <User's role> string
}
```

_Response(201)_
```
{
  "id": "1",
  "email": "someone@mail.com",
  "password": <encrypted password>,
  "role": "admin"
}
```
_Response(400- bad request)_
```
{
    "Error" :  "VALIDATION_ERROR"
    "message": "Email required, Invalid Email Format, This email has been taken, Password Required, Role Required"
}
```

_Response (500)_
```
{
  "Error": "INTERNAL_SERVER_ERROR",
  "message": "internal server error"
}
```

## POST/login

>Login User
_Request Header_
```
not needed
```

_Request Body_
```
{
  "email": "<User's email>",
  "password": "<User's password>"
}
```

_Response(200)_
```
{
  access_token: token
}
```
_Response(400- bad request)_
```
{
    "Error" :  "VALIDATION_ERROR"
    "message": "invalid email or password"
}
```

_Response(403- Unauthorized)_
```
{
  "Error" :  "Unauthorized"
  "message": "You Not a Admin"
}
```

_Response (500)_
```
{
  "Error": "INTERNAL_SERVER_ERROR",
  "message": "internal server error"
}
```

## GET/carts

>get all carts list

_Request Header_
```
{
  access_token: token
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
        "id": 4
        "UserId": 5
        "ProductId": 2
        "quantity": 1
        "createdAt": "2021-01-28T04:53:37.864Z"
        "updatedAt": "2021-01-28T04:53:37.864Z"
    }
]
```
_Response(401- Not Logged In)_
```
{
  "Error" :  "notLogin"
  "message": "You Must login First"
}
```
_Response (500)_
```
{
  "Error": "INTERNAL_SERVER_ERROR",
  "message": "Your Internal Server Is not Connect / Error"
}
```

## POST/products

>Create new product
_Request Header_
```
{
  access_token: token
}
```
_Request Body_
```
{
  "UserId": 5
  "ProductId": 2
  "quantity": 1
}
```
_Response (201 - Created)_
```
{
  "id": <given id by system>,
  UserID: "Posted UserId",
  ProductId: "Posted ProductId",
  quantity: "Posted Quantity",
}
```
_Response(400- bad request)_
```
{
  "Error" :  "VALIDATION_ERROR"
  "message": "Stock is Out"
}
```
_Response(401- Not Logged In)_
```
{
  "Error" :  "notLogin"
  "message": "You Must login First"
}
```
_Response (500)_
```
{
  "Error": "INTERNAL_SERVER_ERROR",
  "message": "Your Internal Server Is not Connect / Error"
}
```

## PUT/carts/:id

>Update product by ID
_Request Header_
```
{
  access_token: token
}
```


_Request Body_
```
{
  "UserId": 5
  "ProductId": 2
  "quantity": 9
}
```
_Response(200)_
```
{
    "message": "Success Update"
}
```
_Response(400- bad request)_
```
{
  "Error" :  "VALIDATION_ERROR"
  "message": "Stock is Out, Stock Cannot Less then 0"
}
```
_Response(401- Not Logged In)_
```
{
  "Error" :  "notLogin"
  "message": "You Must login First"
}
```
_Response(403- Unauthorized)_
```
{
  "Error" :  "Unauthorized"
  "message": "You not Unauthorized"
}
```
_Response(404 - Not Found)_
```
{
  "Error": "resourceNotFound",
  "message": "Data Not Found"
}
```

_Response (500)_
```
{
  "Error": "INTERNAL_SERVER_ERROR",
  "message": "internal server error"
}
```

## DELETE/carts/:id

>Delete product by ID
_Request Header_
```
{
  access_token: token
}
```

_Response(200)_
```
{
  "message": "Success Delete Data"
}
```

_Response(401- Not Logged In)_
```
{
  "Error" :  "notLogin"
  "message": "You Must login First"
}
```
_Response(403- Unauthorized)_
```
{
  "Error" :  "Unauthorized"
  "message": "You not Unauthorized"
}
```

_Response (500)_
```
{
  "Error": "INTERNAL_SERVER_ERROR",
  "message": "internal server error"
}
```