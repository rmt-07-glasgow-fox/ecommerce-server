# ecommerce-server

# ecommerce-server
Ecommerce is an web application for admin to organize their store. This app has : 
* RESTful endpoint for asset's CRUD operation
* JSON formatted response

## HOW TO INSTALL

* npm install

&nbsp;

## List Available endpoints
- `POST /login`
- `POST /register/customer`
- `POST /login/customer`
- `GET /products`
- `GET /products/customer`
- `GET /products/:id`
- `POST /products`
- `POST /products/customer`
- `PUT /products/:id`
- `PATCH /products/customer/:id`
- `DELETE /products/:id`
- `DELETE /products/customer/:id`
- `PATCH /products/customer/checkout`

## RESTful endpoints

### POST /register/customer

> Create new customer account

_Request Header_
```
{
  no needed
}
```

_Request Body_
```
{
  "email": <string user@mail.com>,
  "password": <kmzway87aa>
},
```

_Response (201 - Created)_
```
{
    "id": 11,
    "email": "asal@mail.coma"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```

### POST /login

> Login for admin CMS

_Request Header_
```
{
  no needed
}
```

_Request Body_
```
{
  "email": <string user@mail.com>,
  "password": <kmzway87aa>
},
```

_Response (200 - Success)_
```
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTYxMTg4MjY0OX0.-KUl8piYpxDMWG00wOg3AEEE6qQHmZYhVyoLAiZSYww"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```

### POST /login/customer

> Login for customer CMS

_Request Header_
```
{
  no needed
}
```

_Request Body_
```
{
  "email": <string user@mail.com>,
  "password": <kmzway87aa>
},
```

_Response (200 - Success)_
```
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTYxMTg4MjY0OX0.-KUl8piYpxDMWG00wOg3AEEE6qQHmZYhVyoLAiZSYww"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```

### GET /products

> Get all products

_Request Header_
```
{
  "access_token": "<json web token>
}
```

_Request Body_
```
not needed
```

_Response (200 - Success)_
```
[
  {
        "id": 5,
        "name": "Mainankuh",
        "image_url": "https://disk.mediaindonesia.com/thumbs/1800x1200/news/2019/11/91f7001e5fedfa2b09288801657d38fc.jpg",
        "price": 10000,
        "stock": 100000,
        "createdAt": "2021-01-20T17:26:30.922Z",
        "updatedAt": "2021-01-24T09:05:14.862Z"
  },
  {
        "id": 6,
        "name": "Mainankuh",
        "image_url": "https://disk.mediaindonesia.com/thumbs/1800x1200/news/2019/11/91f7001e5fedfa2b09288801657d38fc.jpg",
        "price": 10000,
        "stock": 100000,
        "createdAt": "2021-01-20T17:26:30.922Z",
        "updatedAt": "2021-01-24T09:05:14.862Z"
  },
]
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
_Response (400 - Unauthorized)_
```
{
  "message": "JWT must provide"
}
```
---
### POST /products

> Create new products

_Request Header_
```
{
  "access_token": "<json web token>
}
```

_Request Body_
```
{
  "name": "<string name to get insert into>",
  "image_url": "< stringimage url to get insert into>",
  "price": <number> 10000,
  "stock":  <number100000,
},
```

_Response (201 - Created)_
```
{
  "id": 6,
  "name": "Mainankuh",
  "image_url": "https://disk.mediaindonesia.com/thumbs/1800x1200/news/2019/11/91f7001e5fedfa2b09288801657d38fc.jpg",
  "price": 10000,
  "stock": 100000,
  "createdAt": "2021-01-20T17:26:30.922Z",
  "updatedAt": "2021-01-24T09:05:14.862Z"
},
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```

_Response (400 - Unauthorized)_
```
{
  "message": "JWT must provide"
}
```

### GET /products/:id

> Get product by Id

_Request Header_
```
{
  "access_token": "<json web token>
}
```

_Request Body_
```
not needed
```

_Response (200 - Success)_
```
{
  "id": 6,
  "name": "Mainankuh",
  "image_url": "https://disk.mediaindonesia.com/thumbs/1800x1200/news/2019/11/91f7001e5fedfa2b09288801657d38fc.jpg",
  "price": 10000,
  "stock": 100000,
  "createdAt": "2021-01-20T17:26:30.922Z",
  "updatedAt": "2021-01-24T09:05:14.862Z"
},
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```

_Response (400 - Unauthorized)_
```
{
  "message": "JWT must provide"
}
```

### PUT /products/:id

> Update the entire of one product 

_Request Header_
```
{
  "access_token": "<json web token>
}
```

_Request Body_
```
{
  "name": "<string name to get insert into>",
  "image_url": "< stringimage url to get insert into>",
  "price": <number> 10000,
  "stock": <number>100000,
},
```

_Response (200 - Success)_
```
{
  "id": 6,
  "name": "Mainankuh",
  "image_url": "https://disk.mediaindonesia.com/thumbs/1800x1200/news/2019/11/91f7001e5fedfa2b09288801657d38fc.jpg",
  "price": 10000,
  "stock": 100000,
  "createdAt": "2021-01-20T17:26:30.922Z",
  "updatedAt": "2021-01-24T09:05:14.862Z"
},
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```

_Response (400 - Unauthorized)_
```
{
  "message": "JWT must provide"
}
```

_Response (404 - Not Found)_
```
{
    "message": "error not found"
}
```

### DELETE /products/:id

> Delete product 

_Request Header_
```
{
  "access_token": "<json web token>
}
```

_Request Body_
```
not needed
```

_Response (200 - Success)_
```
{
    "message": "product success to delete"
}
```

_Response (404 - Not Found)_
```
{
    "message": "error not found"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```

_Response (400 - Unauthorized)_
```
{
  "message": "JWT must provide"
}
```

### GET /products/customer

> Get all products cart for customer that login

_Request Header_
```
{
  "access_token": "<json web token>
}
```

_Request Body_
```
not needed
```

_Response (200 - Success)_
```
[
  {
    "id": 34,
    "quantity": 8,
    "status": false,
    "UserId": 6,
    "ProductId": 11,
    "Product": {
        "name": "kopi",
        "price": 11111,
        "stock": 11,
        "image_url": "https://realcoffeebagco.com/wp-content/uploads/2018/11/Home-Pouch_small.jpg"
    }
  },
  {
    "id": 14,
    "quantity": 8,
    "status": false,
    "UserId": 6,
    "ProductId": 11,
    "Product": {
        "name": "kopi",
        "price": 14111,
        "stock": 11,
        "image_url": "https://realcoffeebagco.com/wp-content/uploads/2018/11/Home-Pouch_small.jpg"
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
_Response (400 - Unauthorized)_
```
{
  "message": "JWT must provide"
}
```

### POST /products/customer

> Create new product cart

_Request Header_
```
{
  "access_token": "<json web token>
}
```

_Request Body_
```
{
  "id": <number 13>,
  "quantity":  <number 10>,
},
```

_Response (201 - Created)_
```
{
  "id": 35,
  "UserId": 6,
  "ProductId": 6,
  "quantity": 1,
  "updatedAt": "2021-01-29T01:15:08.650Z",
  "createdAt": "2021-01-29T01:15:08.650Z",
  "status": false
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```

_Response (400 - Unauthorized)_
```
{
  "message": "JWT must provide"
}
```

### PATCH /products/customer/:id

> Update the quantity of one product cart 

_Request Header_
```
{
  "access_token": "<json web token>
}
```

_Request Body_
```
{
  "quantity": <number 13>,
  "productId": <number 7>,
},
```

_Response (200 - Success)_
```
{
  "id": 36,
  "quantity": 5,
  "status": false,
  "createdAt": "2021-01-29T01:17:31.266Z",
  "updatedAt": "2021-01-29T01:19:09.853Z",
  "UserId": 6,
  "ProductId": 10
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```

_Response (400 - Unauthorized)_
```
{
  "message": "JWT must provide"
}
```

_Response (404 - Not Found)_
```
{
    "message": "error not found"
}
```

### DELETE /products/customer/:id

> Delete product cart of customer

_Request Header_
```
{
  "access_token": "<json web token>
}
```

_Request Body_
```
not needed
```

_Response (200 - Success)_
```
{
    "message": "product cart success to delete"
}
```

_Response (404 - Not Found)_
```
{
    "message": "error not found"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```

_Response (400 - Unauthorized)_
```
{
  "message": "This product cart not belongs to you"
}
```