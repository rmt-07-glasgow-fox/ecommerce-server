# E-commerce CMS Web App Server
E-commerce CMS is a content management system to manage your online store. This app has:
* Restful endpoint for product's CRUD operation
* JSON formatted reponse

# URL
    https://radiant-headland-12217.herokuapp.com

# Method

## Available Endpoints List
- `POST users/login`
- `POST users/register`
- `GET /products`
- `POST /products`
- `GET /products/:id`
- `PUT /products/:id`
- `DELETE /products/:id`
- `PATCH /products/stock/:id`
- `PATCH /products/price/:id`
---
### POST users/register

> User register

### *Request Header*
```Not Needed```

### *Request Body*
 ```javascript
{
    name: "<user name>"
    email: "<user email>",
    password: "<user password>"
}  
```

### *Success Response*
__Response (201 - Access Token Created)__
```javascript
{
    id: "<user id>",
    name: "<user email>",
    email: "<user email>"
    role: "<user role>"
}
```

### *Error Responses*
__Response (400 - Validation Error)__
```javascript
{
    errors: [
      "<error message 1>",
      .
      .
      "<error message n>"
    ]
}
```

__Response (500 - Bad Request)__
```javascript
{
    errors: "Internal server error"
}
```
---
### POST users/login

> User login

### *Request Header*
```Not Needed```

### *Request Body*
 ```javascript
{
    email: "<user email>",
    password: "<user password>"
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
    errors: 'Invalid email / password'
}
```

__Response (500 - Bad Request)__
```javascript
{
  errors: "Internal server error"
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
    stock: "<product stock>",
    status: "<product status>", // Boolean
    categoryId: "<category id>", // Integer
    Category: {
      id: "<category id>", // Integer
      categoryName: "<categoryName>"
    }
  },
  {
    id: 2,
    name: "<product name>",
    image_url: "<product image_url>",
    price: "<product price>",
    stock: "<product stock>",
    status: "<product status>", // Boolean
    description: "<product description>",
    categoryId: "<category id>", // Integer
    Category: {
      id: "<category id>", // Integer
      categoryName: "<categoryName>" 
    }
  }
]

```

### *Error Responses*
__Response (401 - Invalid user)__
```javascript
{
    errors: 'Forbidden access'
}
```

__Response (500 - Internal Server Error)__
```javascript
{
  errors: "Internal server error"
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
    stock: "<product stock>",
    categoryId: "<category id>",
    description: "<product description>"
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
    stock: "<product stock>",
    status: true,
    description: "<product description>",
    categoryId: "<category id>",
    Category: {
      id: "<category id>",
      categoryName: "<categoryName>"
    }
}
```

### *Error Responses*
__Response (401 - Invalid User)__
```javascript
{
    errors: 'Forbidden access'
}
```
__Response (403 - Not Authorize)__
```javascript
{
    errors: 'Not authorize'
}
```

__Response (500 - Internal Server Error)__
```javascript
{
  errors: "Internal server error"
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
    stock: "<product stock>",
    status: "<product status>",
    description: "<product description>",
    categoryId: "<category id>",
    Category: {
      id: "<category id>",
      categoryName: "<categoryName>"
    }
}
```

### *Error Responses*
__Response (401 - Invalid User)__
```javascript
{
    errors: 'Forbidden access'
}
```

__Response (404 - Not Found)__
```javascript
{
  errors: "Product not found"
}
```

__Response (500 - Internal Server Error)__
```javascript
{
  errors: "Internal server error"
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
    stock: "<product stock>",
    categoryId: "<category id>",
    description: "<product description>"
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
    stock: "<updated product stock>",
    status: "<product status>",
    description: "<product description>",
    categoryId: "<category id>",
    Category: {
      id: "<category id>",
      categoryName: "<categoryName>"
    }
}
```

### *Error Responses*
__Response (401 - Invalid User)__
```javascript
{
    errors: 'Forbidden access'
}
```
__Response (403 - Not Authorize)__
```javascript
{
    errors: 'Not authorize'
}
```
__Response (404 - Not Found)__
```javascript
{
  errors: "Product not found"
}
```

__Response (500 - Internal Server Error)__
```javascript
{
  errors: "Internal server error"
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
    stock: "<updated product stock>",
    status: "<product status>",
    description: "<product description>",
    categoryId: "<category id>",
    Category: {
      id: "<category id>",
      categoryName: "<categoryName>"
    }
}
```

### *Error Responses*
__Response (401 - Invalid User)__
```javascript
{
    errors: 'Forbidden access'
}
```
__Response (403 - Not Authorize)__
```javascript
{
    errors: 'Not authorize'
}
```
__Response (404 - Not Found)__
```javascript
{
  errors: "Product not found"
}
```

__Response (500 - Internal Server Error)__
```javascript
{
  errors: "Internal server error"
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
    stock: "<product stock>",
    status: "<product status>",
    description: "<product description>",
    categoryId: "<category id>",
    Category: {
      id: "<category id>",
      categoryName: "<categoryName>"
}
```

### *Error Responses*
__Response (401 - Invalid User)__
```javascript
{
    errors: 'Forbidden access'
}
```
__Response (403 - Not Authorize)__
```javascript
{
    errors: 'Not authorize'
}
```

__Response (404 - Not Found)__
```javascript
{
  errors: "Product not found"
}
```

__Response (500 - Internal Server Error)__
```javascript
{
  errors: "Internal server error"
}
```
---
### PATCH /products/status/:id
> Update product status
### *Request Header*
```javascript
{
  access_token: "<user access token>"
}
```

### *Request Body*
```javascript
{
    status: "<product status>" // Boolean
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
    stock: "<product stock>",
    status: "<product status>",
    description: "<product description>",
    categoryId: "<category id>",
    Category: {
      id: "<category id>",
      categoryName: "<categoryName>"
}
```

### *Error Responses*
__Response (401 - Invalid User)__
```javascript
{
    errors: 'Forbidden access'
}
```
__Response (403 - Not Authorize)__
```javascript
{
    errors: 'Not authorize'
}
```

__Response (404 - Not Found)__
```javascript
{
  errors: "Product not found"
}
```

__Response (500 - Internal Server Error)__
```javascript
{
  errors: "Internal server error"
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
    deletedProduct: {
      id: '<product id>',
      name: "<product name>",
      image_url: "<product image_url>",
      price: "<updated product price>",
      stock: "<product stock>",
      status: "<product status>",
      description: "<product description>",
      categoryId: "<category id>",
      Category: {
        id: "<category id>",
        categoryName: "<categoryName>"
      }
    errors: 'Product has been deleted'
}
```

### *Error Responses*
__Response (401 - Invalid User)__
```javascript
{
    errors: 'Forbidden access'
}
```
__Response (403 - Not Authorize)__
```javascript
{
    errors: 'Not authorize'
}
```
__Response (404 - Not Found)__
```javascript
{
  errors: "Product not found"
}
```

__Response (500 - Internal Server Error)__
```javascript
{
  errors: "Internal server error"
}
```