# CMS App Server
CMS App is an application to show product list. This app has:
* RESTful endpoint for asset's CRUD operation
* Using Vue as client
* Using Express JS as server
* Using Postgress and sequelize as Database

&nbsp;

## USAGE
- Make sure you have Node.js and npm in your computer and then run `npm install`.
- In order to get access to all of the routes, you will need a `JWT(JSON Web Token) Token` which will be generated automatically after you sign in successfully.
- For start the server: `npm run dev`.

&nbsp;


## RESTful endpoints
### GET /products

> Get all products list

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
none
```

_Response (200)_
```json
[
{
        "id": 12,
        "name": "Shoes",
        "image_url": "http:/image...... .jpg",
        "price": 2999999,
        "stock": 5,
    },
    ...
]
```

_Response(401- Unauthorized)_
```
{
    "Error": "Invalid Authentication",
    "message": "The requested page needs a username and a password."
}
```

_Response (500 - Internal Server Error)_
```
{
    "Error": "Error from Server",
    "message": "Internal server error"
}
```
---

### POST /products

> Create new Product

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
[
{
        "name": "<name to get insert into>",
        "image_url": "<image url to get insert into>",
        "price": "<price to get insert into>",
        "stock": "<stock to get insert into>",,
    },
]
```

_Response (201 - Created)_
```json
{
    "id": 12,
    "name": "Shoes",
    "UserId": 1
    "image_url": "http:/image...... .jpg",
    "price": 2999999,
    "stock": 5,
}
```

_Response(400- bad request)_
```
{
    "Error": "Validation error",
    "message": "Title cannot empty,Cannot input an older date than now"
}
```

_Response(401- Unauthorized)_
```
{
    "Error": "Invalid Authentication",
    "message": "The requested page needs a username and a password."
}
```

_Response (500 - Internal Server Error)_
```
{
    "Error": "Error from Server",
    "message": "Internal server error"
}
```

---

### GET /products/:id

> get products list by id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
none
```

_Response (200)_
```json
{
    "id": 12,
    "name": "Shoes",
    "UserId": 1
    "image_url": "http:/image...... .jpg",
    "price": 2999999,
    "stock": 5,
}
```

_Response(401- Unauthorized)_
```
{
    "Error": "Invalid Authentication",
    "message": "The requested page needs a username and a password."
}
```

_Response(403- Forbidden)_
```
{
    "Error": "Forbidden access",
    "message": "You are not authorized to access the file"
}
```

_Response(404 - not found)_
```
{
    "Error": "Invalid Id",
    "message": "Data not found"
}
```

_Response (500 - Internal Server Error)_
```
{
    "Error": "Error from Server",
    "message": "Internal server error"
}
```
---

### PUT /products/:id

> Update Product list by ID

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{

  "title": "<title to get updated later on>",
  "CategoryId": "<Category to get updated later on>"
}
```


_Response(200)_
```json
{
    "message": "data have been updated" 
}
```

_Response(401- Unauthorized)_
```
{
    "Error": "Invalid Authentication",
    "message": "Invalid email / password"
}
```

_Response(403- Forbidden)_
```
{
    "Error": "Forbidden access",
    "message": "You are not authorized to access the file"
}
```

_Response(404 - not found)_
```
{
    "Error": "Invalid Id",
    "message": "Data not found"
}

```

_Response(400- bad request)_
```
{
    "Error": "Validation error",
    "message": "Title cannot empty,Cannot input an older date than now"
}
```

_Response (500 - Internal Server Error)_
```
{
    "Error": "Error from Server",
    "message": "Internal server error"
}
```
---

### DELETE /products/:id

>Delete Product list by ID

_Request Header_
```
{
  "access_token": "<your access token>"
}
```


_Request Body_
selected Product data by User

_Response(200)_
```json
{
    "message": "data have been updated" 
}
```

_Response(401- Unauthorized)_
```
{
    "Error": "Invalid Authentication",
    "message": "Invalid email / password"
}
```

_Response(403- Forbidden)_
```
{
    "Error": "Forbidden access",
    "message": "You are not authorized to access the file"
}
```

_Response(404 - not found)_
```
{
    "Error": "Invalid Id",
    "message": "Data not found"
}

```

_Response (500 - Internal Server Error)_
```
{
    "Error": "Error from Server",
    "message": "Internal server error"
}
```

---

### POST /register

>Create User

_Request Header_
```
none
```

_Request Body_
```json
{
    "email": "<User's email>",
    "password": "<User's password>"
    
}
```

_Response(201)_
```json
{
    "id": 22,
    "email": "admin31@mail.com"
}
```


_Response(400- bad request)_
```
{
    "Error": "Bad request",
    "message": "Invalid email / password"
}
```


_Response (500)_
```
{
    "Error": "Error from Server",
    "message": "Internal server error"
}
```

### POST/login

> Login User

_Request Header_
```
none
```


_Request Body_
```json
{

    "email": "<User's email>",
    "password": "<User's password>"
    
}
```

_Response(200)_
```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJhZG1pbjJAbWFpbC5jb20iLCJpYXQiOjE2MTA3MjY4MDV9.FZIlb4E0MygIiUHgF4qBqY8y6e5zfzMvHE9BzDmgdBU"
}
```


_Response(400- bad request)_
```
{
    "Error": "Bad request",
    "message": "Invalid email / password"
}
```
_Response (500)_
```
{
    "Error": "Error from Server",
    "message": "Internal server error"
}
```

### POST /register Customer

>Create Customer

_Request Header_
```
none
```

_Request Body_
```json
{
    "email": "<Customer's email>",
    "password": "<Customer's password>",
    "name": "<Customer's name>"
}
```

_Response(201)_
```json
{
    "id": 1,
    "email": "customer1@mail.com",
    "name": "customerName"
}
```


_Response(400- bad request)_
```
{
    "Error": "Bad request",
    "message": "Invalid email / password"
}
```


_Response (500)_
```
{
    "Error": "Error from Server",
    "message": "Internal server error"
}
```

### POST/login

> Login Customer

_Request Header_
```
none
```


_Request Body_
```json
{

    "email": "<Customer's email>",
    "password": "<Customer's password>"
    
}
```

_Response(200)_
```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJhZG1pbjJAbWFpbC5jb20iLCJpYXQiOjE2MTA3MjY4MDV9.FZIlb4E0MygIiUHgF4qBqY8y6e5zfzMvHE9BzDmgdBU"
}
```


_Response(400- bad request)_
```
{
    "Error": "Bad request",
    "message": "Invalid email / password"
}
```
_Response (500)_
```
{
    "Error": "Error from Server",
    "message": "Internal server error"
}
```

### POST /carts

> Create new Product

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
    "idProduct": "<ID product to get insert into>",
    "quantity": "<quantity product to get insert into>",
}
```

_Response (201 - Created)_
```json
{
  "ProductId": 2,
  "CustomerId": 14,
  "quantity": 2,
  "total_price": 700000,
  "updatedAt": "2021-01-28T02:10:16.155Z",
  "createdAt": "2021-01-28T02:10:16.155Z"
}
```

_Response(400- bad request)_
```
{
    "Error": "Validation error",
    "message": "quantity cannot empty,ProductId cannot empty"
}
```

_Response(401- Unauthorized)_
```
{
    "Error": "Invalid Authentication",
    "message": "The requested page needs a username and a password."
}
```

_Response (500 - Internal Server Error)_
```
{
    "Error": "Error from Server",
    "message": "Internal server error"
}
```

---

### GET /carts

> get carts list by id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
none
```

_Response (200)_
```json
[
  {
    "ProductId": 2,
    "CustomerId": 14,
    "quantity": 15,
    "total_price": 9800000,
    "createdAt": "2021-01-28T02:10:16.155Z",
    "updatedAt": "2021-01-28T04:16:22.027Z",
    "Product": {
      "id": 2,
      "name": "Samsul",
      "image_url": "https://images.pexels.com/photos/1484807/pexels-photo-1484807.jpeg",
      "price": 700000,
      "stock": 17,
      "UserId": 1,
      "CategoryId": 1,
      "createdAt": "2021-01-26T13:44:49.612Z",
      "updatedAt": "2021-01-27T06:18:59.384Z"
    }
  },
  {
    "ProductId": 5,
    "CustomerId": 14,
    "quantity": 1,
    "total_price": 100000,
    "createdAt": "2021-01-28T03:57:16.091Z",
    "updatedAt": "2021-01-28T03:57:16.091Z",
    "Product": {
      "id": 5,
      "name": "Nokia 3000",
      "image_url": "https://images.pexels.com/photos/1484807/pexels-photo-1484807.jpeg",
      "price": 100000,
      "stock": 0,
      "UserId": 1,
      "CategoryId": 1,
      "createdAt": "2021-01-26T15:03:49.470Z",
      "updatedAt": "2021-01-27T06:18:59.439Z"
    }
  }
]
```

_Response(401- Unauthorized)_
```
{
    "Error": "Invalid Authentication",
    "message": "The requested page needs a username and a password."
}
```

_Response(403- Forbidden)_
```
{
    "Error": "Forbidden access",
    "message": "You are not authorized to access the file"
}
```

_Response(404 - not found)_
```
{
    "Error": "Invalid Id",
    "message": "Data not found"
}
```

_Response (500 - Internal Server Error)_
```
{
    "Error": "Error from Server",
    "message": "Internal server error"
}
```
---

### PUT /carts

> Update Carts list by ID

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "quantity": "<quantity to get updated later on>",
  "idProduct": "<idProduct to get updated later on>"
}
```


_Response(200)_
```json
{
  "ProductId": 4,
  "CustomerId": 14,
  "quantity": 3,
  "total_price": 34000000,
  "createdAt": "2021-01-28T05:27:03.580Z",
  "updatedAt": "2021-01-28T05:28:44.149Z"
}
```

_Response(401- Unauthorized)_
```
{
    "Error": "Invalid Authentication",
    "message": "Invalid email / password"
}
```

_Response(403- Forbidden)_
```
{
    "Error": "Forbidden access",
    "message": "You are not authorized to access the file"
}
```

_Response(404 - not found)_
```
{
    "Error": "Invalid Id",
    "message": "Data not found"
}

```

_Response(400- bad request)_
```
{
    "Error": "Validation error",
    "message": "Title cannot empty,Cannot input an older date than now"
}
```

_Response (500 - Internal Server Error)_
```
{
    "Error": "Error from Server",
    "message": "Internal server error"
}
```
---

### DELETE /carts

>Delete Cart list by ID

_Request Header_
```
{
  "access_token": "<your access token>"
}
```


_Request Body_
selected Product data by User

_Response(200)_
```json
{
    "message": "data have been updated" 
}
```

_Response(401- Unauthorized)_
```
{
    "Error": "Invalid Authentication",
    "message": "Invalid email / password"
}
```

_Response(403- Forbidden)_
```
{
    "Error": "Forbidden access",
    "message": "You are not authorized to access the file"
}
```

_Response(404 - not found)_
```
{
    "Error": "Invalid Id",
    "message": "Data not found"
}

```

_Response (500 - Internal Server Error)_
```
{
    "Error": "Error from Server",
    "message": "Internal server error"
}
```

---