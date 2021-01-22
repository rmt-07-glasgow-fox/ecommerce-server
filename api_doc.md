# Kanban API

Style By Manda is an application to manage store products. This app has:

- RESTful endpoint for kanban's CRUD operation
- JSON formatted response

&nbsp;

## List of available endpoints

- `POST /login`
<!-- Products -->
- `GET /products`
- `POST /products`
- `GET /products/:id`
- `PUT /products/:id`
- `DELETE /products/:id`
<!-- Banners -->
- `GET /banners`
- `POST /banners`
- `GET /banners/:id`
- `PUT /banners/:id`
- `DELETE /banners/:id`

&nbsp;

# POST /login

_Request Header_

```
not needed
```

_Request Body_

```
{
  "email": "admin@mail.com",
  "password": "1234"
}
```

_Success Response_

```
code: 200

content:
{
  "access_token": "<access token>"
}
```

_Error Response_

```
code: 404

content:
{
    "message": "Password or Email is not valid"
}


code: 500

content:
{
  "message" : "internal server error"
}
```

&nbsp;

# GET /products

_Request Header_

```
{
  "access_token": "<access token>"
}
```

_Success Response_

```
code: 200

content:
[
  {
      "id": 11,
      "name": "Sabine Oversized Blazer White",
      "image_url": "https://lookboutiquestore.com/wp-content/uploads/2021/01/LOOKBOUTIQUESTORE-SABINE-OVERSIZED-BLAZER-WHITE-2-570x855.jpg",
      "price": 399000,
      "stock": 45,
      "category": "top",
      "createdAt": "2021-01-20T08:31:19.352Z",
      "updatedAt": "2021-01-20T08:31:19.352Z"
  },
  {
      "id": 14,
      "name": "Peony Blazer Olive",
      "image_url": "https://lookboutiquestore.com/wp-content/uploads/2020/06/LOOKBOUTIQUESTORE-PEONY-BLAZER-OLIVE-2-570x855.jpg",
      "price": 389000,
      "stock": 30,
      "category": "top",
      "createdAt": "2021-01-20T11:41:37.034Z",
      "updatedAt": "2021-01-20T19:19:40.078Z"
  }
]
```

_Error Response_

```
code: 401

content:
{
    "message": "JWT must be provided"
}

OR

code: 500

content:
{
  "message": "internal server error"
}
```

&nbsp;

# POST /products

_Request Header_

```
{
  "access_token": "<access token>"
}
```

_Request Body_

```
{
  "name": "Abel Outer Dusty Pink",
  "image_url": "https://lookboutiquestore.com/wp-content/uploads/2018/08/ABEL-OUTER-BABY-PINK-1-570x855.jpg",
  "price": 369000,
  "stock": 12,
  "category": "outer"
}
```

_Success Response_

```
code: 201

content:
{
    "id": 1,
    "name": "Abel Outer Dusty Pink",
    "image_url": "https://lookboutiquestore.com/wp-content/uploads/2018/08/ABEL-OUTER-BABY-PINK-1-570x855.jpg",
    "price": 369000,
    "stock": 12,
    "category": "outer",
    "updatedAt": "2021-01-12T14:32:28.433Z",
    "createdAt": "2021-01-12T14:32:28.433Z"
}
```

_Error Response_

```
code: 400

content:
{
    "errors": [
        "Product name is required",
        "Price must be greater than 0",
        "Stock must be greater than 0"
    ]
}

OR

code: 500

content:
{
  "message" : "internal server error"
}
```

&nbsp;

# PUT /products/:id

_Request Header_

```
{
  "access_token": "<access token>"
}
```

_Request Body_

```
{
  "name": "Abel Outer Terracota",
  "image_url": "https://lookboutiquestore.com/wp-content/uploads/2018/06/ABEL-OUTER-TERACOTA-1-FULL-570x855.jpg",
  "price": 349000,
  "stock": 35,
  "category": "top"
}
```

_Request Params_

```
id : 1
```

_Success Response_

```
code: 200

content:
{
  "id": 1,
  "name": "Abel Outer Terracota",
  "image_url": "https://lookboutiquestore.com/wp-content/uploads/2018/06/ABEL-OUTER-TERACOTA-1-FULL-570x855.jpg",
  "price": 349000,
  "stock": 35,
  "category": "top"
  "createdAt": "2021-01-12T11:09:34.420Z",
  "updatedAt": "2021-01-12T14:36:58.795Z"
}
```

_Error Response_

```
code: 400

content:
{
    "errors": [
        "Product name is required",
        "Price must be greater than 0",
        "Stock must be greater than 0"
    ]
}

OR

code: 401

content:
{
    "message": "JWT must be provided"
}

OR

code: 500

content:
{
  "message" : "internal server error"
}
```

&nbsp;

# GET /products/:id

_Request Header_

```
{
  "access_token": "<access token>"
}
```

_Request Body_

```
not needed
```

_Request Params_

```
id : 1
```

_Success Response_

```
code: 200

content:
{
    "id": 21,
    "name": "Coma Blazer Mustard",
    "image_url": "https://lookboutiquestore.com/wp-content/uploads/2019/04/LOOKBOUTIQUESTORE-COMA-BLAZER-MUSTARD-2-570x855.jpg",
    "price": 300000,
    "stock": 45,
    "category": "top",
    "createdAt": "2021-01-20T18:04:29.093Z",
    "updatedAt": "2021-01-20T19:35:17.936Z"
}
```

_Error Response_

```
code: 401

content:
{
    "message": "JWT must be provided"
}

code: 404

content:
{
    "message": "resource not found"
}

code: 500

content:
{
  "message" : "internal server error"
}
```

&nbsp;

# DELETE /products/id

_Request Header_

```
{
  "access_token": "<access token>"
}
```

_Request Body_

```
not needed
```

_Request Params_

```
id : 1
```

_Success Response_

```
code: 200

content:
{
    "message": "Product succesfully deleted"
}
```

_Error Response_

```
code: 401

content:
{
    "message": "access denied"
}

code: 404

content:
{
    "message": "resource not found"
}

code: 500

content:
{
  "message" : "internal server error"
}
```

<!-- BANNERS -->

# GET /banners

_Request Header_

```
{
  "access_token": "<access token>"
}
```

_Success Response_

```
code: 200

content:
[
    {
        "id": 1,
        "title": "Banner 1",
        "status": "active",
        "image_url": "https://asset-a.grid.id/crop/0x0:0x0/360x240/photo/2020/04/09/663219154.png",
        "createdAt": "2021-01-22T13:08:30.381Z",
        "updatedAt": "2021-01-22T13:08:30.381Z"
    }
]
```

_Error Response_

```
code: 401

content:
{
    "message": "JWT must be provided"
}

OR

code: 500

content:
{
  "message": "internal server error"
}
```

&nbsp;

# POST /banners

_Request Header_

```
{
  "access_token": "<access token>"
}
```

_Request Body_

```
{
    "title": "Banner2",
    "status": "discontinued",
    "image_url": "https://asset-a.grid.id/crop/0x0:0x0/360x240/photo/2020/04/09/663219154.png",
}
```

_Success Response_

```
code: 201

content:
{
    "id": 1,
    "title": "Banner2",
    "status": "discontinued",
    "image_url": "https://asset-a.grid.id/crop/0x0:0x0/360x240/photo/2020/04/09/663219154.png",
    "createdAt": "2021-01-22T13:08:30.381Z",
    "updatedAt": "2021-01-22T13:20:42.352Z"
}
```

_Error Response_

```
code: 400

content:
{
    "errors": [
        "Banner title is required",
        "Image url is required"
    ]
}

OR

code: 500

content:
{
  "message" : "internal server error"
}
```

&nbsp;

# PUT /banners/:id

_Request Header_

```
{
  "access_token": "<access token>"
}
```

_Request Body_

```
{
  "title": "Banner 1",
  "status": "discontinued",
  "image_url": "https://asset-a.grid.id/crop/0x0:0x0/360x240/photo/2020/04/09/663219154.png"
}
```

_Request Params_

```
id : 1
```

_Success Response_

```
code: 200

content:
{
  "id": 1,
  "title": "Banner 1",
  "status": "discontinued",
  "image_url": "https://asset-a.grid.id/crop/0x0:0x0/360x240/photo/2020/04/09/663219154.png"
  "createdAt": "2021-01-12T11:09:34.420Z",
  "updatedAt": "2021-01-12T14:36:58.795Z"
}
```

_Error Response_

```
code: 400

content:
{
    "errors": [
        "Banner title is required",
        "Image url is required"
    ]
}

OR

code: 401

content:
{
    "message": "JWT must be provided"
}

OR

code: 500

content:
{
  "message" : "internal server error"
}
```

&nbsp;

# GET /banners/:id

_Request Header_

```
{
  "access_token": "<access token>"
}
```

_Request Body_

```
not needed
```

_Request Params_

```
id : 1
```

_Success Response_

```
code: 200

content:
{
  "id": 1,
  "title": "Banner 1",
  "status": "discontinued",
  "image_url": "https://asset-a.grid.id/crop/0x0:0x0/360x240/photo/2020/04/09/663219154.png"
  "createdAt": "2021-01-12T11:09:34.420Z",
  "updatedAt": "2021-01-12T14:36:58.795Z"
}
```

_Error Response_

```
code: 401

content:
{
    "message": "JWT must be provided"
}

code: 404

content:
{
    "message": "resource not found"
}

code: 500

content:
{
  "message" : "internal server error"
}
```

&nbsp;

# DELETE /banners/id

_Request Header_

```
{
  "access_token": "<access token>"
}
```

_Request Body_

```
not needed
```

_Request Params_

```
id : 1
```

_Success Response_

```
code: 200

content:
{
    "message": "Banner succesfully deleted"
}
```

_Error Response_

```
code: 401

content:
{
    "message": "access denied"
}

code: 404

content:
{
    "message": "resource not found"
}

code: 500

content:
{
  "message" : "internal server error"
}
```
