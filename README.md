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
Run `npx nodemon bin/http.js`  to start the server
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
- POST /register
- POST /loginAdmin
- POST /loginUser
- POST /orders
- GET /orders
- PATCH /orders/:orderId
- DELETE /orders/:orderId
- DELETE /orders

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
  name: "Monster Hunter World",
  imageUrl: "https://www.monsterhunterworld.com/sp/images/top/bg_mv.jpg",
  price: 699999,
  stock: 100,
  genre: "adventure"
}
```
_Response (201 - Created)_
```
{
  "id": <given id by system>,
  name: "posted title",
  imageUrl: "posted url",
  price: "posted price,
  stock: "posted stock,
  genre: "posted genre"
}
```
_Response(400- bad request)_
```
{
  "Error" :  "VALIDATION_ERROR"
  "message": "Name is required, ImageUrl is required, Price is required, Price must be greater than zero, Price must be integer, Stock is required, Stock must not be less than zero, Stock must be integer, Genre is required"
}
```
_Response(401- Not Logged In)_
```
{
  "Error" :  "NotLoggedIn"
  "message": "Please login first!"
}
```
_Response (500)_
```
{
  "Error": "INTERNAL_SERVER_ERROR",
  "message": "internal server error"
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
    "id": 1,
    "name": "Monster Hunter World",
    "imageUrl": "https://www.monsterhunterworld.com/sp/images/top/bg_mv.jpg",
    "price": 699999,
    "stock": 100,
    "genre": "adventure",
    "genreId": null,
    "createdAt": "2021-01-20T18:10:24.783Z",
    "updatedAt": "2021-01-20T18:10:24.783Z"
  },
  {
    "id": 2,
    "name": "Cyberpunk 2077",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/en/9/9f/Cyberpunk_2077_box_art.jpg",
    "price": 699999,
    "stock": 100,
    "genre": "adventure",
    "genreId": null,
    "createdAt": "2021-01-20T18:10:24.783Z",
    "updatedAt": "2021-01-20T18:10:24.783Z"
  },
  {
    "id": 3,
    "name": "Ghost of Tsushima",
    "imageUrl": "https://m.media-amazon.com/images/M/MV5BMjEwYjRjZjctNWRmNy00NDA1LWE1MjYtYTlhMWIzZGNhMWYxXkEyXkFqcGdeQXVyMzY0MTE3NzU@._V1_.jpg",
    "price": 699999,
    "stock": 100,
    "genre": "adventure",
    "genreId": null,
    "createdAt": "2021-01-20T18:10:24.783Z",
    "updatedAt": "2021-01-20T18:10:24.783Z"
  },
]
```


_Response(401- Not Logged In)_
```
{
  "Error" :  "NotLoggedIn"
  "message": "Please login first!"
}
```

_Response (500)_
```
{
  "Error": "INTERNAL_SERVER_ERROR",
  "message": "internal server error"
}
```



## GET/products/:id

>Get products list by ID


__Request Header_
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
{
  {
    "id": 2,
    "name": "Cyberpunk 2077",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/en/9/9f/Cyberpunk_2077_box_art.jpg",
    "price": 699999,
    "stock": 100,
    "genre": "adventure",
    "genreId": null,
    "createdAt": "2021-01-20T18:10:24.783Z",
    "updatedAt": "2021-01-20T18:10:24.783Z"
  },
}
```
_Response(401- Not Logged In)_
```
{
  "Error" :  "NotLoggedIn"
  "message": "Please login first!"
}
```
_Response(403- Unauthorized)_
```
{
  "Error" :  "Unauthorized"
  "message": "You're not authorized!!"
}
```
_Response(404 - Not Found)_
```
{
  "Error": "NotFound",
  "message": "Not Found"
}
```

_Response (500)_
```
{
  "Error": "INTERNAL_SERVER_ERROR",
  "message": "internal server error"
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
  name: "Monster Hunter World",
  imageUrl: "https://www.monsterhunterworld.com/sp/images/top/bg_mv.jpg",
  price: 699999,
  stock: 100,
  genre: "adventure"
}
```
_Response(200)_
```
{
  "id": <given id by system>,
  name: <updated name>,
  imageUrl: <updated imageUrl>,
  price: <updated price>,
  stock: <updated stock>,
  genre: <updated genre>
}
```
_Response(400- bad request)_
```
{
  "Error" :  "VALIDATION_ERROR"
  "message": "Name is required, ImageUrl is required, Price is required, Price must be greater than zero, Price must be integer, Stock is required, Stock must not be less than zero, Stock must be integer, Genre is required"
}
```
_Response(401- Not Logged In)_
```
{
  "Error" :  "NotLoggedIn"
  "message": "Please login first!"
}
```
_Response(403- Unauthorized)_
```
{
  "Error" :  "Unauthorized"
  "message": "You're not authorized!!"
}
```
_Response(404 - Not Found)_
```
{
  "Error": "NotFound",
  "message": "Not Found"
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
  "message": "product successfuly deleted"
}
```

_Response(401- Not Logged In)_
```
{
  "Error" :  "NotLoggedIn"
  "message": "Please login first!"
}
```
_Response(403- Unauthorized)_
```
{
  "Error" :  "Unauthorized"
  "message": "You're not authorized!!"
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
  "email": <User's email>,
  "password": <User's password>,
  "name": <User's name>
}
```

_Response(201)_
```
{
  "id": "1",
  "email": "someone@mail.com",
  "password": <encrypted password>,
  "name": "someone",
  "role": "customer"
}
```
_Response(400- bad request)_
```
{
    "Error" :  "VALIDATION_ERROR"
    "message": "Email cannot be empty, Invalid email format"
}
```

_Response (500)_
```
{
  "Error": "INTERNAL_SERVER_ERROR",
  "message": "internal server error"
}
```

## POST/loginAdmin

>Login Admin

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
  "message": "You're not authorized!!"
}
```

_Response (500)_
```
{
  "Error": "INTERNAL_SERVER_ERROR",
  "message": "internal server error"
}
```

## POST/loginUser

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
  "message": "You're not authorized!!"
}
```

_Response (500)_
```
{
  "Error": "INTERNAL_SERVER_ERROR",
  "message": "internal server error"
}
```

## POST/orders

>Create new order

_Request Header_
```
{
  access_token: token
}
```
_Request Body_
```
{
  count: 1,
  productId: 1 
}
```
_Response (201 - Created)_
```
{
  "id": <given id by system>,
  count: "posted count number",
  userId: <automatically filled>,
  productId: "posted product id"
}
```
_Response(400- bad request)_
```
{
  "Error" :  "VALIDATION_ERROR"
  "message": "Minimum count needed is 1"
}
```
_Response(401- Not Logged In)_
```
{
  "Error" :  "NotLoggedIn"
  "message": "Please login first!"
}
```
_Response (500)_
```
{
  "Error": "INTERNAL_SERVER_ERROR",
  "message": "internal server error"
}
```


## GET/orders

>get all orders list


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
        "id": 12,
        "count": 1,
        "productId": 1,
        "userId": 2,
        "createdAt": "2021-01-26T23:55:02.828Z",
        "updatedAt": "2021-01-26T23:55:02.828Z",
        "Product": {
            "id": 1,
            "name": "Monster Hunter World",
            "imageUrl": "https://www.monsterhunterworld.com/sp/images/top/bg_mv.jpg",
            "price": 699999,
            "stock": 100,
            "genre": "adventure",
            "genreId": null,
            "createdAt": "2021-01-26T17:20:34.640Z",
            "updatedAt": "2021-01-26T17:20:34.640Z"
        }
    },
    {
        "id": 13,
        "count": 1,
        "productId": 2,
        "userId": 2,
        "createdAt": "2021-01-26T23:55:34.610Z",
        "updatedAt": "2021-01-26T23:55:34.610Z",
        "Product": {
            "id": 2,
            "name": "Cyberpunk 2077",
            "imageUrl": "https://upload.wikimedia.org/wikipedia/en/9/9f/Cyberpunk_2077_box_art.jpg",
            "price": 699999,
            "stock": 100,
            "genre": "adventure",
            "genreId": null,
            "createdAt": "2021-01-26T17:20:34.640Z",
            "updatedAt": "2021-01-26T17:20:34.640Z"
        }
    },
    {
        "id": 14,
        "count": 3,
        "productId": 7,
        "userId": 2,
        "createdAt": "2021-01-27T00:16:07.680Z",
        "updatedAt": "2021-01-27T00:16:20.804Z",
        "Product": {
            "id": 7,
            "name": "Red Dead Redemption II",
            "imageUrl": "https://cf.shopee.com.my/file/78f0fd149a90a973d40f800a4f73ecaf",
            "price": 699999,
            "stock": 100,
            "genre": "adventure",
            "genreId": null,
            "createdAt": "2021-01-26T17:20:34.640Z",
            "updatedAt": "2021-01-26T17:20:34.640Z"
        }
    }
]
```


_Response(401- Not Logged In)_
```
{
  "Error" :  "NotLoggedIn"
  "message": "Please login first!"
}
```

_Response (500)_
```
{
  "Error": "INTERNAL_SERVER_ERROR",
  "message": "internal server error"
}
```




## PATCH/orders/:orderId

>Update order count by order ID

_Request Header_
```
{
  access_token: token
}
```


_Request Body_
```
{
  count: 10 <any number>
}
```
_Response(200)_
```
{
  "id": 12,
  "count": 1,
  "productId": 10,
  "userId": 2,
  "createdAt": "2021-01-26T23:55:02.828Z",
  "updatedAt": "2021-01-26T23:55:02.828Z",
  "Product": {
      "id": 1,
      "name": "Monster Hunter World",
      "imageUrl": "https://www.monsterhunterworld.com/sp/images/top/bg_mv.jpg",
      "price": 699999,
      "stock": 100,
      "genre": "adventure",
      "genreId": null,
      "createdAt": "2021-01-26T17:20:34.640Z",
      "updatedAt": "2021-01-26T17:20:34.640Z"
  }
},
```
_Response(400- bad request)_
```
{
  "Error" :  "VALIDATION_ERROR"
  "message": "Minimum count needed is 1"
}
```
_Response(401- Not Logged In)_
```
{
  "Error" :  "NotLoggedIn"
  "message": "Please login first!"
}
```
_Response(403- Unauthorized)_
```
{
  "Error" :  "Unauthorized"
  "message": "You're not authorized!!"
}
```
_Response(404 - Not Found)_
```
{
  "Error": "NotFound",
  "message": "Not Found"
}
```

_Response (500)_
```
{
  "Error": "INTERNAL_SERVER_ERROR",
  "message": "internal server error"
}
```



## DELETE/orders/:orderId

>Delete order by order ID

_Request Header_
```
{
  access_token: token
}
```

_Response(200)_
```
{
  "message": "Order deleted"
}
```

_Response(401- Not Logged In)_
```
{
  "Error" :  "NotLoggedIn"
  "message": "Please login first!"
}
```
_Response(403- Unauthorized)_
```
{
  "Error" :  "Unauthorized"
  "message": "You're not authorized!!"
}
```

_Response (500)_
```
{
  "Error": "INTERNAL_SERVER_ERROR",
  "message": "internal server error"
}
```


## DELETE/orders

>Delete all order by user ID


__Request Header_
```
{
  access_token: token
}
```
_Request Body_
```
not needed
```
_Response(200)_
```
{
  "message": "All Order deleted"
}
```
_Response(401- Not Logged In)_
```
{
  "Error" :  "NotLoggedIn"
  "message": "Please login first!"
}
```
_Response(403- Unauthorized)_
```
{
  "Error" :  "Unauthorized"
  "message": "You're not authorized!!"
}
```

_Response (500)_
```
{
  "Error": "INTERNAL_SERVER_ERROR",
  "message": "internal server error"
}
```

