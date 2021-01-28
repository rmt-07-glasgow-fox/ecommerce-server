# E-commerce CMS Web App Server
E-commerce CMS (content management system)

# URL
  http://localhost:3000

# Method

## Available Endpoints List
- `POST /login`
- `POST /register`

- `GET /products`
- `POST /products`
- `PUT /products/:id`
- `DELETE /products/:id`

- `POST /cart`
- `GET /cart`
- `POST /cart/checkout`
- `DELETE /cart/:id`
- `GET /cart/history`

---

### POST /login

> User login

### *Request Header*
```Not Needed```
### *Request Body*
 ```json
{
  "email": "admin@mail.com",
  "password": "qweqwe"
}  
```

### *Success Response*
__Response (200 - Access Token Created)__
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImVtYWlsIjoiYWRtaW5AbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2MTEwMzUwMTh9.f5J6BOYjRFQaNQOf99hkJGGRgQ1AfrG6J__zLu6wUYA"    
}
```

### *Error Responses*
__Response (404 - Not Found)__
```json
{
  "message": "Invalid password"
}
```

__Response (500 - Bad Request)__
```json
{
  "message": "Internal server error"
}
```

### POST /register

> User register

### *Request Header*
```Not Needed```
### *Request Body*
 ```json
{
  "email": "admin@mail.com",
  "password": "qweqwe",
  "role": "admin"
}  
```

### *Success Response*
__Response (200 - Access Token Created)__
```json
{
    "message": "User created:admin100@mail.com role:admin"
}
```

__Response (500 - Bad Request)__
```json
{
  "message": "Internal server error"
}
```

---

### GET /products
> Get all products
### *Request Header*
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImVtYWlsIjoiYWRtaW5AbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2MTEwMzUwMTh9.f5J6BOYjRFQaNQOf99hkJGGRgQ1AfrG6J__zLu6wUYA"
}
```

### *Request Body*
```Not Needed```
### *Success Response*
__Response (200)__
 ```json
[
  {
    "id": 169,
    "name": "Alat Pencabut Bulu Hidung",
    "image_url": "https://ecs7.tokopedia.net/img/cache/900/product-1/2020/5/22/batch-upload/batch-upload_3c18e0c1-3c80-4136-aa8c-2751696f4906",
    "price": 90000,
    "stock": 1,
    "UserId": null
  },
  {
    "id": 170,
    "name": "Penjepit Bulu Mata - Shu Emura",
    "image_url": "https://ecs7.tokopedia.net/img/cache/900/product-1/2019/8/5/1395319/1395319_c0c3c723-8a22-42fc-a0f0-e163f4e18c9e_700_700.jpg",
    "price": 228000,
    "stock": 2,
    "UserId": null
  },
]
```

### *Error Responses*
__Response (401 - Invalid user)__
```json
{
    "message": "Please provide a token!"
}
```

__Response (500 - Internal Server Error)__
```json
{
  "message": "Internal server error"
}
```

---

### POST /products
> Add a new product
### *Request Header*
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjksImVtYWlsIjoiYWRtaW4xMDBAbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2MTE0ODAxNTl9.2PFDCNb4mUtgiLxC77tr_UM6epZyEVJ29LJaFqythnA"
}
```

### *Request Body*
```json
{
  "name": "Test",
  "image_url": "www.google.com",
  "price": 90000,
  "stock": 5,
}
```

### *Success Response*
__Response (201 - Product Created)__
```json
{
  "message": "Product created successfully!"
}
```

### *Error Responses*
__Response (400 - Bad Request)__
```json
{
  "message": [
    "Price must contains integer value",
    "Stock must contains integer value"
  ]
}
```
__Response (401 - Invalid User)__
```json
{
  "message": "Please provide token"
}
```
__Response (403 - Not Authorize)__
```json
{
  "message": "Not authorized"
}
```

__Response (500 - Internal Server Error)__
```json
{
  "message": "Internal server error"
}
```

---

---
### PUT /products/:id
> Update product by id
### *Request Header*
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjksImVtYWlsIjoiYWRtaW4xMDBAbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2MTE0ODAxNTl9.2PFDCNb4mUtgiLxC77tr_UM6epZyEVJ29LJaFqythnA"
}
```

### *Request Body*
```json
{
  "name": "Test",
  "image_url": "www.google.com",
  "price": 90000,
  "stock": 5,
}
```

### *Success Response*
__Response (200)__
```json
{
  "message": "Product updated successfully!"
}
```

### *Error Responses*
__Response (401 - Invalid User)__
```json
{
  "message": "Please provide token!"
}
```
__Response (403 - Not Authorize)__
```json
{
  "message": "'Not authorized'"
}
```

__Response (500 - Internal Server Error)__
```json
{
  "message": "Internal server error"
}
```

---

### DELETE /products/:id
> DELETE product
### *Request Header*
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjksImVtYWlsIjoiYWRtaW4xMDBAbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2MTE0ODAxNTl9.2PFDCNb4mUtgiLxC77tr_UM6epZyEVJ29LJaFqythnA"
}
```
### *Request Body*
```Not Needed```
### *Success Response*
__Response (200)__
 ```json
{
  "message": "Product deleted successfully!"
}
```
### *Error Responses*
__Response (401 - Invalid User)__
```json
{
  "message": "Please provide token!"
}
```
__Response (403 - Not Authorize)__
```json
{
  "message": "'Not authorized'"
}
```

__Response (500 - Internal Server Error)__
```json
{
  "message": "Internal server error"
}
```

---

### POST /cart
> CREATE cart
### *Request Header*
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjksImVtYWlsIjoiYWRtaW4xMDBAbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2MTE0ODAxNTl9.2PFDCNb4mUtgiLxC77tr_UM6epZyEVJ29LJaFqythnA"
}
```
### *Request Body*
```json
{
  "UserId": 66,
  "ProductId": 100,
  "quantity": 1,
  "status": false
}
```
### *Success Response*
__Response (200)__
 ```json
{
  "message": "Added to cart!"
}
```
### *Error Responses*
__Response (401 - Invalid User)__
```json
{
  "message": "Please provide token!"
}
```
__Response (500 - Internal Server Error)__
```json
{
  "message": "Internal server error"
}
```

---

### GET /cart
> SHOW all carts
### *Request Header*
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjksImVtYWlsIjoiYWRtaW4xMDBAbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2MTE0ODAxNTl9.2PFDCNb4mUtgiLxC77tr_UM6epZyEVJ29LJaFqythnA"
}
```
### *Request Body*
```Not Needed```
```json
```
### *Success Response*
__Response (200)__
 ```json
[
  {
  "Product": { 
    "createdAt":"2021-01-26T22:39:21.513Z",
    "id":203,
    "image_url":"https://ecs7.tokopedia.net/img/cache/900/product-1/2020/5/21/batch-upload/,batch-upload_63331ffe-8ac2-4ee6-af7f-370a9db17b29",
    "name":"Bantal Peluk Pria Berotot Untuk Jomblo"
  },
  "price":490000,
  "stock":5,
  "updatedAt":"2021-01-28T00:11:58.643Z",
  "ProductId":203,
  "UserId":77,
  "id":31,
  "quantity":1,
  "status":true
  }
]
```
### *Error Responses*
__Response (401 - Invalid User)__
```json
{
  "message": "Please provide token!"
}
```
__Response (500 - Internal Server Error)__
```json
{
  "message": "Internal server error"
}
```

---

### POST /cart/checkout
> Checkout
### *Request Header*
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjksImVtYWlsIjoiYWRtaW4xMDBAbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2MTE0ODAxNTl9.2PFDCNb4mUtgiLxC77tr_UM6epZyEVJ29LJaFqythnA"
}
```
### *Request Body*
```Not Needed```
```json
```
### *Success Response*
__Response (200)__
 ```json
{
  "message": "Checkout successful!"
}
```
### *Error Responses*
__Response (400 - Bad Request)__
```json
{
  "message": "Can't checkout, quantity you wish to buy exceeds our stock"
}
```
__Response (401 - Invalid User)__
```json
{
  "message": "Please provide token!"
}
```
__Response (500 - Internal Server Error)__
```json
{
  "message": "Internal server error"
}
```

---

### DELETE /cart/:id
> Delete cart by ID
### *Request Header*
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjksImVtYWlsIjoiYWRtaW4xMDBAbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2MTE0ODAxNTl9.2PFDCNb4mUtgiLxC77tr_UM6epZyEVJ29LJaFqythnA"
}
```
### *Request Body*
```Not Needed```
```json
```
### *Success Response*
__Response (200)__
 ```json
{
  "message": "Cart deleted successfully!"
}
```
### *Error Responses*
__Response (401 - Invalid User)__
```json
{
  "message": "Please provide token!"
}
```
__Response (404 - Not Found)__
```json
{
  "message": "Error 404: cart not found"
}
```
__Response (500 - Internal Server Error)__
```json
{
  "message": "Internal server error"
}
```

---

### GET /cart/history
> Show all carts history
### *Request Header*
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjksImVtYWlsIjoiYWRtaW4xMDBAbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2MTE0ODAxNTl9.2PFDCNb4mUtgiLxC77tr_UM6epZyEVJ29LJaFqythnA"
}
```
### *Request Body*
```Not Needed```
```json
```
### *Success Response*
__Response (200)__
 ```json
[
  {
  "Product": { 
    "createdAt":"2021-01-26T22:39:21.513Z",
    "id":203,
    "image_url":"https://ecs7.tokopedia.net/img/cache/900/product-1/2020/5/21/batch-upload/,batch-upload_63331ffe-8ac2-4ee6-af7f-370a9db17b29",
    "name":"Bantal Peluk Pria Berotot Untuk Jomblo"
  },
  "price":490000,
  "stock":5,
  "updatedAt":"2021-01-28T00:11:58.643Z",
  "ProductId":203,
  "UserId":77,
  "id":31,
  "quantity":1,
  "status":true
  }
]
```
### *Error Responses*
__Response (401 - Invalid User)__
```json
{
  "message": "Please provide token!"
}
```
__Response (500 - Internal Server Error)__
```json
{
  "message": "Internal server error"
}
```