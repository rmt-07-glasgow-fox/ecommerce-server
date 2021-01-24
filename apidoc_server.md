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

## ENDPOINT


### POST /signin
> User and Admin Login

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
