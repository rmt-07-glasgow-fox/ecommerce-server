# E-Commerce App-server

​
List of available endpoints:
​
- `POST /register`
- `POST /login`

And routes below need authentication
- `POST /products`
- `GET /products`
- `GET /products/:id`
- `DELETE /products/:id`
- `PATCH /products/:id`
- `PUT /products/:id`

And routes below need authorization
- `GET /products/:id`
- `DELETE /products/:id`
- `PATCH /products/:id`
- `PUT /products/:id`


### POST /register

Request:

- data:

```json
{
  "name":"string",
  "email": "string",
  "password": "string"
}
```

Response:

- status: 201
- body:
  ​

```json
{
  "id": "integer",
  "name": "string",
  "email": "string"
}
```

### POST /login

Request:

- data:

```json
{
  "email": "string",
  "password": "string"
}
```

Response:

- status: 200
- body:
  ​

```json
{
  "access_token": "string"
}
```

### POST /products
Request:

- headers: access_token

- data:

```json
{
  "name": "Jam tangan",
  "description": "BNIB",
  "image_url": "string",
  "conditon": "New",
  "Price": 100000,
  "stock": 1
}
```

​Response:

- status: 201
- body:
  ​

```json
{
    "name": "Jam tangan",
    "description": "BNIB",
    "image_url": "string",
    "conditon": "New",
    "Price": 100000,
    "stock": 1,
    "UserId": "integer",
    "updatedAt": "2021-01-14T07:06:36.663Z",
    "createdAt": "2021-01-14T07:06:36.663Z"
}
```

### GET /products

Description: Get all current products in user passwords

Request:

- headers:
  - access_token: string

Response:

- status: 200
- body:
  ​

```json
[
    {
        "name": "Jam tangan",
        "description": "BNIB",
        "image_url": "string",
        "conditon": "New",
        "Price": 100000,
        "stock": 1,
        "UserId": "integer",
        "updatedAt": "2021-01-14T07:06:36.663Z",
        "createdAt": "2021-01-14T07:06:36.663Z"
    }
]
```
### GET /products/:id

Description: Get one selected products

Request:

- headers:
  - access_token: string

Response:

- status: 200
- body:
  ​

```json
{
    "name": "Jam tangan",
    "description": "BNIB",
    "image_url": "string",
    "conditon": "New",
    "Price": 100000,
    "stock": 1,
    "UserId": "integer",
    "updatedAt": "2021-01-14T07:06:36.663Z",
    "createdAt": "2021-01-14T07:06:36.663Z"
}
```


### DELETE /products/:id

description: 
  Delete one of the current logged in user password. (cannot delete another user password)

Request:

- headers: access_token
- params: 
  - id: integer (required)

Response:

- status: 200
- body:

```json
{
    "message": "Product has been deleted"
}
```

### PUT /products/:id

description: 
  Edit one of the current logged in user password. (cannot edit another user products)

Request:

- headers: access_token
- params: 
  - id: integer (required)

Response:

- status: 200
- body:

```json
{
    "message": "Product has been updated"
}
```

### PATCH /products/:id

description: 
  Edit one of the current logged in user password. (cannot edit another user products)

Request:

- headers: access_token
- params: 
  - id: integer (required)
- data:

```json
{
  "condition": "Seccond"
}
```

Response:

- status: 200
- body:

```json
{
    "message": "Product has been updated"
}
```
