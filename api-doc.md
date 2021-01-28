# ecommerce-cms-server

​
List of available endpoints:
​
- `POST /login`
- `POST /register`
- `GET /products`
- `GET /products/:id`

And routes below need authentication and authorization by admin
- `POST /products`
- `PUT /products/:id`
- `DELETE /products/:id`

And routes below need authentication by customer
- `POST /wishlist`
- `GET /wishlist`
- `DELETE /wishlist/:ProductId`
- `POST /cart`
- `GET /cart`
- `PATCH /cart/:ProductId`
- `DELETE /cart/:ProductId`

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
  "access_token": "string",
  "id": "integer",
  "email": "string",
  "role": "string",
  "fullName": "string"
}
```

Response:

- status: 400
- body:
  ​

```json
{
  "message": "string",
}
```

### POST /register

Request:

- data:

```json
{
  "fullName": "string",
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
  "access_token": "string",
  "id": "integer",
  "email": "string",
  "fullName": "string"
}
```

Response:

- status: 400
- body:
  ​

```json
{
  "message": "string",
}
```

### POST /products
Request:

- headers: access_token

- data:

```json
{
  "name": "Sepatu",
  "description": "Sepatu hitam",
  "category": "Fashion",
  "image_url": "http://image-url.com/path.jpg",
  "price": 100000,
  "stock": 10
}
```

​Response:

- status: 201
- body:
  ​

```json
{
  "name": "Sepatu",
  "description": "Sepatu hitam",
  "category": "Fashion",
  "image_url": "http://image-url.com/path.jpg",
  "price": 100000,
  "stock": 10
}
```

### GET /products

Description: Get all products in server

Response:

- status: 200
- body:
  ​

```json
[
    {
  "name": "Sepatu",
  "description": "Sepatu hitam",
  "category": "Fashion",
  "image_url": "http://image-url.com/path.jpg",
  "price": 100000,
  "stock": 10
    }
]
```

### GET /products/:id

Description: Get product by id

Request:

- params:
  - id: integer (required)

Response:

- status: 200
- body:
  ​

```json
{
  "name": "Sepatu",
  "description": "Sepatu hitam",
  "category": "Fashion",
  "image_url": "http://image-url.com/path.jpg",
  "price": 100000,
  "stock": 10
}
```

### PUT /products/:id

Description: Update product by id

Request:

- headers:
  - access_token: string
- params:
  - id: integer (required)
- data:

```json
{
  "name": "Sepatu Baru",
  "description": "Sepatu putih",
  "category": "Fashion",
  "image_url": "http://image-url.com/path.jpg",
  "price": 100000,
  "stock": 10
}
```

Response:

- status: 200
- body:
  ​

```json
{
  "name": "Sepatu Baru",
  "description": "Sepatu putih",
  "category": "Fashion",
  "image_url": "http://image-url.com/path.jpg",
  "price": 100000,
  "stock": 10
}
```

### DELETE /products/:id

description:
  Delete one of the product.

Request:

- headers: access_token
- params:
  - id: integer (required)

Response:

- status: 200
- body:

```json
{
    "message": "Product deleted successfully"
}
```

### GET /wishlist

Description: Get products in user wishlist

Response:

- status: 200
- body:
  ​

```json
[
    {
  "name": "Sepatu",
  "description": "Sepatu hitam",
  "category": "Fashion",
  "image_url": "http://image-url.com/path.jpg",
  "price": 100000,
  "stock": 10
    }
]
```

### GET /cart

Description: Get products in user cart

Response:

- status: 200
- body:
  ​

```json
[
{
"id": "integer",
"CartId": "integer",
"ProductId": "integer",
"quantity": "integer",
"CartItem": {
            "name": "Sepatu",
            "description": "Sepatu hitam",
            "category": "Fashion",
            "image_url": "http://image-url.com/path.jpg",
            "price": 100000,
            "stock": 10
            }
}
]
```

### POST /wishlist
Request:

- headers: access_token

- data:

```json
{
  "ProductId": "integer"
}
```

​Response:

- status: 201
- body:
  ​

```json
{
  "message": "Product has been added"
}
```

### POST /cart
Request:

- headers: access_token

- data:

```json
{
  "ProductId": "integer",
  "quantity": "integer"
}
```

​Response:

- status: 201
- body:
  ​

```json
{
  "message": "Product has been added"
}
```

### DELETE /wishlist/:ProductId

description:
  Delete one of the product from wishlist

Request:

- headers: access_token
- params:
  - ProductId: integer (required)

Response:

- status: 200
- body:

```json
{
    "message": "Product deleted successfully"
}
```

### DELETE /cart/:ProductId

description:
  Delete one of the product from cart

Request:

- headers: access_token
- params:
  - ProductId: integer (required)

Response:

- status: 200
- body:

```json
{
    "message": "Product deleted successfully"
}
```

### PUT /wishlist/:ProductId

Description: Update item in wishlist by product id

Request:

- headers:
  - access_token: string
- params:
  - ProductId: integer (required)
- data:

```json
{
  "quantity": "integer"
}
```

Response:

- status: 200
- body:
  ​

```json
{
  "message": "Wishlist has been updated"
}
```