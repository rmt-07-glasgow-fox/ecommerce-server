# ecommerce-server

# ecommerce-server
Ecommerce is an web application for admin to organize their store. This app has : 
* RESTful endpoint for asset's CRUD operation
* JSON formatted response

## HOW TO INSTALL

* npm install

&nbsp;

## List Available endpoints
- `GET /products`
- `GET /products/:id`
- `POST /products`
- `PUT /products/:id`
- `DELETE /products/:id`

## RESTful endpoints

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