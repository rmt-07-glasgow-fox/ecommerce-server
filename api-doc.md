# ecommerce-cms-server

​
List of available endpoints:
​
- `POST /login`

And routes below need authentication
- `POST /products`
- `GET /products`
- `GET /products/:id`
- `PUT /products/:id`
- `DELETE /products/:id`

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

- headers:
  - access_token: string
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
