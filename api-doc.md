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

And routes below need authorization
- `POST /cust-products/:id`
- `GET /cust-products/`
- `GET /cust-products-history/`
- `PUT /cust-products-minus/:id`
- `PUT /cust-products-plus/:id`
- `DELETE /cust-products/:id`
- `PUT /cust-products/`


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

### POST /cust-products/:id

description: 
  Add to Cart selected item by params.id

Request:

- headers: access_token
- params: 
  - id: integer (required)
- data:

Response:

- status: 200
- body:

```json
{
    "message": "berhasil"
}
```

### GET /cust-products/

description: 
  Get All Product On cart where Paid is 'Unpaid'

Request:

- headers: access_token

Response:

- status: 200
- body:

```json
[
    {
        "id": 53,
        "UserId": 2,
        "ProductId": 3,
        "Paid": "Unpaid",
        "quantity": 2,
        "totalprice": 2200000,
        "createdAt": "2021-01-28T02:21:30.839Z",
        "updatedAt": "2021-01-28T02:24:23.367Z",
        "Product": {
            "id": 3,
            "name": "Patek Philippe",
            "description": "BNIB Garansi Resmi Indonesia",
            "image_url": "https://i.pinimg.com/736x/e6/1c/5b/e61c5bd9008a01f6283e626ed26628e1.jpg",
            "condition": "New",
            "price": 1100000,
            "stock": 13,
            "createdAt": "2021-01-26T16:42:15.563Z",
            "updatedAt": "2021-01-28T02:11:15.622Z"
        }
    }
]
```

### GET /cust-products-history/

description: 
  Get All Product On cart where Paid is 'Paid'

Request:

- headers: access_token

Response:

- status: 200
- body:

```json
[
    {
        "id": 53,
        "UserId": 2,
        "ProductId": 3,
        "Paid": "Paid",
        "quantity": 2,
        "totalprice": 2200000,
        "createdAt": "2021-01-28T02:21:30.839Z",
        "updatedAt": "2021-01-28T02:24:23.367Z",
        "Product": {
            "id": 3,
            "name": "Patek Philippe",
            "description": "BNIB Garansi Resmi Indonesia",
            "image_url": "https://i.pinimg.com/736x/e6/1c/5b/e61c5bd9008a01f6283e626ed26628e1.jpg",
            "condition": "New",
            "price": 1100000,
            "stock": 13,
            "createdAt": "2021-01-26T16:42:15.563Z",
            "updatedAt": "2021-01-28T02:11:15.622Z"
        }
    }
]
```

### PUT /cust-products-minus/:id

description: 
  Decrement selected item where Paid is Unpaid in Cart Table with one point

Request:

- headers: access_token

Response:

- status: 200
- body:

```json
{
  "msg" : "berhasil"
}
```

### PUT /cust-products-plus/:id

description: 
  Incerment selected item where Paid is Unpaid in Cart Table with one point

Request:

- headers: access_token

Response:

- status: 200
- body:

```json
{
  "msg" : "berhasil"
}
```

### DELETE /cust-products/:id

description: 
  Delete selected item where Paid is Unpaid in Cart Table with

Request:

- headers: access_token

Response:

- status: 200
- body:

```json
{
  "msg" : "berhasil"
}
```

### PUT /cust-products/

description: 
  Delete selected item where Paid is Unpaid in Cart Table with

Request:

- headers: access_token

Response:

- status: 200
- body:

```json
{
  "msg": "Success Paid Product"
}
```