# E-commerce CMS Web App Server
E-commerce CMS is a content management system to manage your online store. This app has:
* Restful endpoint for product's CRUD operation
* JSON formatted reponse

# URL
    http://localhost:3000

# Method

## Available Endpoints List
- `POST /login`
- `GET /products`
- `POST /products`
- `GET /products/:id`
- `PUT /products/:id`
- `DELETE /products/:id`
- `PATCH /products/stock/:id`
- `PATCH /products/price/:id`
---
### POST /login

> User login

### *Request Header*
```Not Needed```

### *Request Body*
 ```javascript
{
    email: 'admin@mail.com',
    password: hashPassword('123456')
}  
```

### *Success Response*
__Response (200 - Access Token Created)__
```javascript
{
    access_token: "<user access token>"    
}
```

### *Error Responses*
__Response (404 - Not Found)__
```javascript
{
    message: 'Invalid email / password'
}
```

__Response (500 - Bad Request)__
```javascript
{
  message: "Internal server error"
}
```
---
### GET /products
> Get all products

### *Request Header*
```javascript
{
  access_token: "<user access token>"
}
```

### *Request Body*
```Not Needed```

### *Success Response*
__Response (200)__
 ```javascript
[
  {
    id: 1,
    name: "<product name>",
    image_url: "<product image_url>",
    price: "<product price>",
    stock: "<product stock>"
  },
  {
    id: 2,
    name: "<product name>",
    image_url: "<product image_url>",
    price: "<product price>",
    stock: "<product stock>"
  }
]

```

### *Error Responses*
__Response (401 - Invalid user)__
```javascript
{
    message: 'Forbidden access'
}
```

__Response (500 - Internal Server Error)__
```javascript
{
  message: "Internal server error"
}
```
---
### POST /products
> Add a new product

### *Request Header*
```javascript
{
  access_token: "<user access token>"
}
```

### *Request Body*
```javascript
{
    name: "<product name>",
    image_url: "<product image_url>",
    price: "<product price>",
    stock: "<product stock>"
}
```

### *Success Response*
__Response (201 - Product Created)__
```javascript
{
    id: '<product id>',
    name: "<product name>",
    image_url: "<product image_url>",
    price: "<product price>",
    stock: "<product stock>"
}
```

### *Error Responses*
__Response (401 - Invalid User)__
```javascript
{
    message: 'Forbidden access'
}
```
__Response (403 - Not Authorize)__
```javascript
{
    message: 'Not authorize'
}
```

__Response (500 - Internal Server Error)__
```javascript
{
  message: "Internal server error"
}
```
---
### GET /products/:id
> Get product by id

### *Request Header*
```javascript
{
  access_token: "<user access token>"
}
```

### *Request Body*
```Not Needed```

### *Success Response*
__Response (200)__
 ```javascript
{
    id: '<product id>',
    name: "<product name>",
    image_url: "<product image_url>",
    price: "<product price>",
    stock: "<product stock>"
}
```

### *Error Responses*
__Response (401 - Invalid User)__
```javascript
{
    message: 'Forbidden access'
}
```

__Response (404 - Not Found)__
```javascript
{
  message: "Product not found"
}
```

__Response (500 - Internal Server Error)__
```javascript
{
  message: "Internal server error"
}
```
---
### PUT /products/:id
> Update product by id

### *Request Header*
```javascript
{
  access_token: "<user access token>"
}
```

### *Request Body*
```javascript
{
    name: "<product name>",
    image_url: "<product image_url>",
    price: "<product price>",
    stock: "<product stock>"
}
```

### *Success Response*
__Response (200)__
```javascript
{
    id: '<product id>',
    name: "<updated product name>",
    image_url: "<updated product image_url>",
    price: "<updated product price>",
    stock: "<updated product stock>"
}
```

### *Error Responses*
__Response (401 - Invalid User)__
```javascript
{
    message: 'Forbidden access'
}
```
__Response (403 - Not Authorize)__
```javascript
{
    message: 'Not authorize'
}
```
__Response (404 - Not Found)__
```javascript
{
  message: "Product not found"
}
```

__Response (500 - Internal Server Error)__
```javascript
{
  message: "Internal server error"
}
```
---
### PATCH /products/stock/:id
> Update product stock

### *Request Header*
```javascript
{
  access_token: "<user access token>"
}
```

### *Request Body*
```javascript
{
    stock: "<product stock>"
}
```

### *Success Response*
__Response (200)__
```javascript
{
    id: '<product id>',
    name: "<product name>",
    image_url: "<product image_url>",
    price: "<product price>",
    stock: "<updated product stock>"
}
```

### *Error Responses*
__Response (401 - Invalid User)__
```javascript
{
    message: 'Forbidden access'
}
```
__Response (403 - Not Authorize)__
```javascript
{
    message: 'Not authorize'
}
```
__Response (404 - Not Found)__
```javascript
{
  message: "Product not found"
}
```

__Response (500 - Internal Server Error)__
```javascript
{
  message: "Internal server error"
}
```
---
### PATCH /products/price/:id
> Update product price

### *Request Header*
```javascript
{
  access_token: "<user access token>"
}
```

### *Request Body*
```javascript
{
    price: "<product price>"
}
```

### *Success Response*
__Response (200)__
```javascript
{
    id: '<product id>',
    name: "<product name>",
    image_url: "<product image_url>",
    price: "<updated product price>",
    stock: "<product stock>"
}
```

### *Error Responses*
__Response (401 - Invalid User)__
```javascript
{
    message: 'Forbidden access'
}
```
__Response (403 - Not Authorize)__
```javascript
{
    message: 'Not authorize'
}
```

__Response (404 - Not Found)__
```javascript
{
  message: "Product not found"
}
```

__Response (500 - Internal Server Error)__
```javascript
{
  message: "Internal server error"
}
```
---
### DELETE /products/price/:id
> DELETE product

### *Request Header*
```javascript
{
  access_token: "<user access token>"
}
```

### *Request Body*
```Not Needed```

### *Success Response*
__Response (200)__
 ```javascript
{
    message: 'Product has been deleted'
}
```

### *Error Responses*
__Response (401 - Invalid User)__
```javascript
{
    message: 'Forbidden access'
}
```
__Response (403 - Not Authorize)__
```javascript
{
    message: 'Not authorize'
}
```
__Response (404 - Not Found)__
```javascript
{
  message: "Product not found"
}
```

__Response (500 - Internal Server Error)__
```javascript
{
  message: "Internal server error"
}
```