# e-commerce cms app Documentation

e-commerce cms web app, you can create product authorized by admin, and can do other thins like update and delete. This app has :
* Product resource and use resource
* JSON formatted response
* SPA (Single Page Application)
* Using sequelize, express.js, nodejs and postgre sql for server technology
* Using bootstrap, and Vue.js as frontend framework

# URL
```
Server URL : http://localhost:3000
```


### REGISTER /register
> User allowed to do register a new account through customer-client endpoint

_Request_
```
url: http://localhost:3000/register
```

_Request Params_
```
Not needed
```

_Request Header_
```
Not needed
```

_Request Body_
```
{
  "email": "<email>",
  "password": "<password>",
  "username": "<username>"
}
```

_Response (200)_
```
{
    "id": <given id by system>,
    "email": "customer1@mail.com",
    "password": "$2a$05$A8WsJL2BXcaqDRISot07qORFAt4w/I6LzD./VtQospLsWo1oYdcDm",
    "username": "customer1",
    "updatedAt": "2021-01-27T16:50:07.073Z",
    "createdAt": "2021-01-27T16:50:07.073Z",
    "role": "customer"
}
```

_Response (400)_
```
{
  "message": <given messages by system>
}
```

_Response (500 - Server Error)_
```
{
  "message": "Internal server error"
}
```

---

### POST /signin
> User and Admin Login, There is a middleware to define and separate authentication from deferent client request between customer and admin.

_Request_
```
url: http://localhost:3000/login
```

_Request Params_
```
Not needed
```

_Request Header_
```
Not needed
```

_Request Body_
```
{
  "email": "<email>",
  "password": "<password>"
}
```

_Response (200)_
```
{
    "id": "1",
    "email", <admin@mail.com>,
    "username": <admin1>
    "access_token": "<generated accesss token>",
}
```

_Response (401)_
```
{
  "message": "Invalid Email/Password"
}
```

_Response (500 - Server Error)_
```
{
  "message": "Internal server error"
}
```

---

### POST /products
> Create new product, but only user that has role as admin can do this!

_Request_
```
url: http://localhost:3000/products
```

_Request Params_
```
Not needed
```

_Request Header_
```
{
  "Content-type": "application/json",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTYxMTEyMzcxN30.ZpC6kOy3iDO--tfUuch4zqXMXNCIbEK0RdYtL39yyE8"
}
```

_Request Body_
```
{
  "name": "<name>",
  "image_url": "<image_url>",
  "price": "<price>",
  "stock": "<stock>"
}
```

_Response (201)_
```
{
  "id": <given id by system>,
  "name": "<name>",
  "image_url": "<image_url>",
  "price": "<price>",
  "stock": "<stock>",
  "createdAt": "2020-01-20T07:15:12.149Z",
  "updatedAt": "2020-01-20T07:15:12.149Z"
}
```

_Response (400)_
```
{
  "message": <given messages by system>
}
```

_Response (500)_
```
{
  "message": "Internal server error!"
}
```

### GET /products

> Get all products. But you need to log in first, and only user that has role as admin can see the list

_Request_
```
url: http://localhost:3000/products
```

_Request Header_
```
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTYxMTEyMzcxN30.ZpC6kOy3iDO--tfUuch4zqXMXNCIbEK0RdYtL39yyE8"
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
    "id": <given id by system>,
    "name": "<name>",
    "image_url": <image_url>,
    "price": "<price>",
    "stock": "<stock>",
    "createdAt": "<2020-01-20T07:15:12.149Z>",
    "updatedAt": "<2020-01-20T07:15:12.149Z>"
  },
  {
    "id": <"...">,
    "name": <"...">,
    "image_url": <"...">,
    "price": <"...">,
    "stock": <"...">,
    "createdAt": <"...">,
    "updatedAt": <"...">
  }
]

```

_Response (500 - Cannot retrieve data, please try again later)_
```
{
  "message": "Cannot retrieve data, please try again later"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---

### GET /products/:id

> Find specify product by id. But you need to log in first and only user that has role as admin.

_Request_
```
url: http://localhost:3000/products/1
```

_Request Params_
```
{
  "id": "1"
}
```

_Request Header_
```
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTYxMTEyMzcxN30.ZpC6kOy3iDO--tfUuch4zqXMXNCIbEK0RdYtL39yyE8"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
  "id": 1,
  "name": "mobil1",
  "image_url": "asdfasdf",
  "price": 10000,
  "stock": 10,
  "createdAt": "2021-01-19T14:42:19.158Z",
  "updatedAt": "2021-01-19T14:42:19.158Z"
}
```

_Response (404)_
```
{
  "message": "Not found"
}
```

_Response (400)_
```
{
  "message": <given messages by system>
}
```
---

### PUT /products/:id

> Replace all attributes product. But you need to log in first and only user that has role as admin.

_Request_
```
url: http://localhost:3000/products/1
```

_Request Params_
```
{
  "id": "1"
}
```

_Request Header_
```
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTYxMTEyMzcxN30.ZpC6kOy3iDO--tfUuch4zqXMXNCIbEK0RdYtL39yyE8"
}
```

_Request Body_
```
{
  "name": "<name>",
  "image_url": "<image_url>",
  "price": "<price>",
  "stock": "<stock>"
}
```

_Response (200)_
```
{
{
  "id": 1,
  "name": "Hp",
  "image_url": "qwerty",
  "price": "20000",
  "stock": "25",
  "createdAt": "2021-01-19T14:42:19.158Z",
  "updatedAt": "2021-01-19T14:49:27.593Z"
}
}
```

_Response (400)_
```
{
  "message": <given id by system>
}
```

_Response (500)_
```
{
  "message": "Internal server error!"
}
```

_Response (404)_
```
{
  "message": "Data not found!"
}
```
---



### DELETE /products/:id

> Delete object/record. But you need to log in first and only user that has role as admin.

_Request_
```
url: http://localhost:3000/products/1
```

_Request Params_
```
{
  "id": "1"
}
```

_Request Header_
```
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTYxMTEyMzcxN30.ZpC6kOy3iDO--tfUuch4zqXMXNCIbEK0RdYtL39yyE8"
}
```

_Request Body_
```
Not needed
```

_Response (200)_
```
{
  msg: 'Product has been deleted',
}
```

_Response (500)_
```
{
  "message": "Internal server error!"
}
```

_Response (404)_
```
{
  "message": "Data not found!"
}
```
---



### POST /banners
> Create new banner, but only user that has role as admin can do this!

_Request_
```
url: http://localhost:3000/banners
```

_Request Params_
```
Not needed
```

_Request Header_
```
{
  "Content-type": "application/json",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTYxMTEyMzcxN30.ZpC6kOy3iDO--tfUuch4zqXMXNCIbEK0RdYtL39yyE8"
}
```

_Request Body_
```
{
  "title": "<title>",
  "category": "<category>",
  "status": "<status>"
}
```

_Response (201)_
```
{
  "id": <given id by system>,
  "title": "<title>",
  "category": "<category>",
  "status": "<status>",
  "createdAt": "2020-01-20T07:15:12.149Z",
  "updatedAt": "2020-01-20T07:15:12.149Z"
}
```

_Response (400)_
```
{
  "message": <given messages by system>
}
```

_Response (500)_
```
{
  "message": "Internal server error!"
}
```

### GET /banners

> Get all banners. But you need to log in first, and only user that has role as admin can see the list

_Request_
```
url: http://localhost:3000/banners
```

_Request Header_
```
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTYxMTEyMzcxN30.ZpC6kOy3iDO--tfUuch4zqXMXNCIbEK0RdYtL39yyE8"
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
    "id": <given id by system>,
    "title": "<title>",
    "category": <category>,
    "status": "<status>",
    "createdAt": "<2020-01-20T07:15:12.149Z>",
    "updatedAt": "<2020-01-20T07:15:12.149Z>"
  },
  {
    "id": <"...">,
    "title": <"...">,
    "category": <"...">,
    "status": <"...">,
    "createdAt": <"...">,
    "updatedAt": <"...">
  }
]

```

_Response (500 - Cannot retrieve data, please try again later)_
```
{
  "message": "Cannot retrieve data, please try again later"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---

### GET /banners/:id

> Find specify banner by id. But you need to log in first and only user that has role as admin.

_Request_
```
url: http://localhost:3000/banners/1
```

_Request Params_
```
{
  "id": "1"
}
```

_Request Header_
```
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTYxMTEyMzcxN30.ZpC6kOy3iDO--tfUuch4zqXMXNCIbEK0RdYtL39yyE8"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
  "id": 1,
  "title": "image_url_link_for_banner",
  "category": "Fashion",
  "status": InActive,
  "createdAt": "2021-01-19T14:42:19.158Z",
  "updatedAt": "2021-01-19T14:42:19.158Z"
}
```

_Response (404)_
```
{
  "message": "Not found"
}
```

_Response (400)_
```
{
  "message": <given messages by system>
}
```
---

### PUT /banners/:id

> Replace all attributes banners. But you need to log in first and only user that has role as admin.

_Request_
```
url: http://localhost:3000/banners/1
```

_Request Params_
```
{
  "id": "1"
}
```

_Request Header_
```
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTYxMTEyMzcxN30.ZpC6kOy3iDO--tfUuch4zqXMXNCIbEK0RdYtL39yyE8"
}
```

_Request Body_
```
{
  "title": "<title>",
  "category": "<category>",
  "status": "<status>"
}
```

_Response (200)_
```
{
{
  "id": 1,
  "title": "URL FOR BANNER",
  "category": "Fashion",
  "status": "Active",
  "createdAt": "2021-01-19T14:42:19.158Z",
  "updatedAt": "2021-01-19T14:49:27.593Z"
}
}
```

_Response (400)_
```
{
  "message": <given id by system>
}
```

_Response (500)_
```
{
  "message": "Internal server error!"
}
```

_Response (404)_
```
{
  "message": "Data not found!"
}
```
---



### DELETE /banners/:id

> Delete object/record. But you need to log in first and only user that has role as admin.

_Request_
```
url: http://localhost:3000/banners/1
```

_Request Params_
```
{
  "id": "1"
}
```

_Request Header_
```
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTYxMTEyMzcxN30.ZpC6kOy3iDO--tfUuch4zqXMXNCIbEK0RdYtL39yyE8"
}
```

_Request Body_
```
Not needed
```

_Response (200)_
```
{
  msg: 'Product has been deleted',
}
```

_Response (500)_
```
{
  "message": "Internal server error!"
}
```

_Response (404)_
```
{
  "message": "Data not found!"
}
```
---


### POST /carts/addToCart

> Add Product To Cart

_Request_
```
url: http://localhost:3000/carts/addTocart
```

_Request Params_
```
npt needed
```

_Request Header_
```
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTYxMTEyMzcxN30.ZpC6kOy3iDO--tfUuch4zqXMXNCIbEK0RdYtL39yyE8"
}
```

_Request Body_
```
{
  "ProductId": <given automatically when customer click product>
}
```

_Response (200)_
```
{
  "cart": {
    "id": 16,
    "UserId": 5,
    "total": 12000000,
    "createdAt": "2021-01-27T13:31:57.099Z",
    "updatedAt": "2021-01-27T16:59:12.469Z"
  },
  "cartItem": {
    "id": 62,
    "CartId": 16,
    "ProductId": 22,
    "quantity": 5,
    "createdAt": "2021-01-27T15:57:13.475Z",
    "updatedAt": "2021-01-27T16:59:12.473Z"
  }
}
```

_Response (400)_
```
{
  "message": <given id by system>
}
```

_Response (500)_
```
{
  "message": "Internal server error!"
}
```

_Response (404)_
```
{
  "message": "Data not found!"
}
```
---


### GET /carts

> Get array of object for from Cart DB, with its relation CartItems

_Request_
```
url: http://localhost:3000/carts
```

_Request Params_
```
not needed
```

_Request Header_
```
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTYxMTEyMzcxN30.ZpC6kOy3iDO--tfUuch4zqXMXNCIbEK0RdYtL39yyE8"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
  "cart": {
    "id": 16,
    "UserId": 5,
    "total": 12000000,
    "createdAt": "2021-01-27T13:31:57.099Z",
    "updatedAt": "2021-01-27T16:59:12.469Z"
  },
  "cartItems": [
    {
        "id": 61,
        "CartId": 16,
        "ProductId": 23,
        "quantity": 1,
        "createdAt": "2021-01-27T15:37:37.165Z",
        "updatedAt": "2021-01-27T16:00:27.324Z",
        "Product": {
            "id": 23,
            "name": "Iphon 9",
            "image_url": "https://p.ipricegroup.com/uploaded_52f24cf680a4969869579b2d21a6bb71.jpg",
            "price": 2000000,
            "stock": 20,
            "category": "Electronic",
            "createdAt": "2021-01-24T10:07:48.109Z",
            "updatedAt": "2021-01-24T10:07:48.109Z"
        }
    },
    {
        "id": 62,
        "CartId": 16,
        "ProductId": 22,
        "quantity": 5,
        "createdAt": "2021-01-27T15:57:13.475Z",
        "updatedAt": "2021-01-27T16:59:12.473Z",
        "Product": {
            "id": 22,
            "name": "iphone 2",
            "image_url": "https://picsum.photos/200",
            "price": 2000000,
            "stock": 20,
            "category": "Electronic",
            "createdAt": "2021-01-24T09:49:43.630Z",
            "updatedAt": "2021-01-24T09:53:40.972Z"
        }
    }
  ]
}
```

_Response (404)_
```
{
  "message": "Not found"
}
```

_Response (400)_
```
{
  "message": <given messages by system>
}
```

_Response (500)_
```
{
  "message": "Internal server error!"
}
```

---

### PATCH /carts/:id

> Set quantity cartItem and its grandTotal price for each product

_Request_
```
url: http://localhost:3000/carts/:id
```

_Request Params_
```
{
  "id": <automatically get an id for CartItem from system, when user wanna update its quantity at carts page>
}
```

_Request Header_
```
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTYxMTEyMzcxN30.ZpC6kOy3iDO--tfUuch4zqXMXNCIbEK0RdYtL39yyE8"
}
```

_Request Body_
```
{
  "CartItemId": <given automatically when customer click Update quantity>
  "quantity": <input from user>
}
```

_Response (200)_
```
{
  total: 6000000
}

```

_Response (400)_
```
{
  "message": <given id by system>
}
```

_Response (500)_
```
{
  "message": "Internal server error!"
}
```

---


### DELETE /cartItems/:id

> Delete object/record.

_Request_
```
url: http://localhost:3000/cartItems/:id
```

_Request Params_
```
{
  "id": <:id>
}
```

_Request Header_
```
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTYxMTEyMzcxN30.ZpC6kOy3iDO--tfUuch4zqXMXNCIbEK0RdYtL39yyE8"
}
```

_Request Body_
```
{
  CartItemId: <given automatically when customer click remove an item from cart>,
  ProductId: <given automatically when customer click remove an item from cart, for use calculate grandTotal>,
  quantity: <given automatically when customer click remove an item from cart, for use calculate grandTotal>
}
```

_Response (200)_
```
{
  message: 'Deleted product from your cart success'
}
```

_Response (500)_
```
{
  "message": "Internal server error!"
}
```
