# E-Commerce Web App Server
E-Commerce is a web application to Browse and Buy Your Daily Necessities. This Web App has:
- RESTful endpoint for E-Commerce's CRUD Operation
- JSON formatted response

# URL
```
http://localhost:3333
```
# Method
## POST/login
### *Request Header*

```Not Needed```
### *Request Body*

```js
{
    email: "<string>",
    password: "<string>"
}
```
### *Success Response*
```js
Code: 201 Created
Content: 
{
    access_token: "<your access_token>"
}
```

### *Error Response*
```js
Code: 400 Bad Request
Content:
{
    errors: ["<error_messages>"]
}
```

## POST /register
### *Request Header*

```Not Needed```
### *Request Body*

```js
{
    username: "<string>",
    email: "<string>",
    password: "<string>"
}
```
### *Success Response*
```js
Code: 201 Created
Content: 
{
    id: "<integer>",  
    username: "<string>",
    email: "<string>",
}
```

### *Error Response*
```js
Code: 400 Bad Request
Content:
{
    errors: ["<error_messages>"]
}
```

## GET /products
### *Request Header*

```js
{
    access_token: "<token_jwt>"
}
```
### *Request Body*

```
Not Needed
```
### *Success Response*
```js
Code: 200 OK
Content: 
{
    id: "<integer>",  
    name: "<string>",
    image_url: "<string>",
    price: <integer>,
    stock: <integer>,
    status: <boolean>
}
```

### *Error Response*
```js
Code: 500 Internal Server Error
Content:
{
    errors: ["<Internal Server Error>"]
}
```

## POST /products
### *Request Header*

```js
{
    access_token: "<token_jwt>"
}
```
### *Request Body*

```js
{
    name: "<string>",
    image: "<string>",
    price: <integer>,
    stock: <integer>,
    status: <boolean>
}
```
### *Success Response*
```js
Code: 201 Created
Content: 
{ 
    name: "<string>",
    image: "<string>",
    price: <integer>,
    stock: <integer>
}
```

### *Error Response*
```js
Code: 400 Bad Request
Content:
{
    errors: ["<error_message>"]
}
```
OR
```js
Code: 500 Internal Server Error
Content:
{
    errors: ["<Internal Server Error>"]
}
```

## GET /products/:id
### *Request Header*

```js
{
    access_token: "<token_jwt>"
}
```
### *Request Body*

```
Not Needed
```
### *Request Params*

```js
{
    id: "<integer>"
}
```

### *Success Response*
```js
Code: 200 OK
Content: 
{ 
    name: "<string>",
    image: "<string>",
    price: <integer>,
    stock: <integer>
}
```

### *Error Response*
```js
Code: 404 Not Found
Content:
{
    "errors": ["<Error Not Found>"],
    
}
```

## PUT /products/:id
### *Request Header*

```js
{
    access_token: "<token_jwt>"
}
```
### *Request Body*

```js
{
    name: "<string>",
    imageUrl: "<string>",
    price: <integer>,
    stock: <integer>,
    category: "<string>"
}
```
### *Request Params*

```js
{
    id: "<integer>"
}
```

### *Success Response*
```js
Code: 200 OK
Content: 
{ 
    message: "SuccessFully Update Product"
}
```

### *Error Response*
```js
Code: 404 Not Found
Content:
{
    "errors": ["<Not Found>"],
    
}
```
OR
```js
Code: 500 Server Internal Error 
Content:
{
    "errors": ["<Internal Server Error>"],
    
}
```

## PATCH /products/:id
### *Request Header*

```js
{
    access_token: "<token_jwt>"
}
```
### *Request Body*

```js
{
    status: <boolean>
}
```
### *Request Params*

```js
{
    id: "<integer>"
}
```

### *Success Response*
```js
Code: 201 Created
Content: 
{ 
    message: "SuccessFully Update Product"
}
```

### *Error Response*
```js
Code: 404 Not Found
Content:
{
    "errors": ["<Not Found>"],
    
}
```
OR
```js
Code: 500 Server Internal Error 
Content:
{
    "errors": ["<Internal Server Error>"],
    
}
```

## DELETE /products/:id
### *Request Header*

```js
{
    access_token: "<token_jwt>"
}
```
### *Request Body*

```
Not Needed
```

### *Request Params*

```js
{
    id: "<integer>"
}
```

### *Success Response*
```js
Code: 200 OK
Content: 
{ 
    message: "Task Succesfully Deleted"
}
```

### *Error Response*
```js
Code: 404 Not Found
Content:
{
    "errors": ["<Not Found>"],
    
}
```
OR
```js
Code: 500 Internal Server Error
Content:
{
    "errors": ["<Internal Server Error>"],
    
}
```

## GET /carts/
### *Request Header*

```js
{
    access_token: "<token_jwt>"
}
```
### *Request Body*

```
Not Needed
```
### *Request User*

```js
{
    id: "<integer>"
}
```

### *Success Response*
```js
Code: 200 OK
Content: 
{ 
    id: <integer>,
    quantity: <integer>,
    status: <boolean>,
    UserId: <integer>,
    Product: {
        id: <integer>,
        name: "<string>",
        image: "<string>",
        price: <integer>,
        stock: <integer>
    } 
}
```

### *Error Response*
```js
Code: 500 Internal Server Error
Content:
{
    "errors": ["<Internal Server Error>"],
    
}
```


## POST /carts/
### *Request Header*

```js
{
    access_token: "<token_jwt>"
}
```
### *Request Body*

```js
{
    id: <product_id>
}
```
### *Request User*

```js
{
    id: "<integer>"
}
```

### *Success Response*
```js
Code: 201 Created
Content: 
{ 
    cartId: <integer>,
    quantity: <integer>,
    status: <boolean>,
    stockProduct: <integer>,
    ProductPrice: <integer>
}
```

### *Error Response*
```js
Code: 400 Bad Request
Content:
{
    "errors": ["<Sorry..We Ran Out of Product>"],
    
}
```
OR
```js
Code: 500 Internal Server Error
Content:
{
    "errors": ["<Internal Server Error>"],
    
}
```

## PATCH /carts/:id
### *Request Header*

```js
{
    access_token: "<token_jwt>"
}
```
### *Request Body*

```js
{
    quantity: <new-quantity>
}
```
### *Request Params*

```js
{
    id: "<integer>"
}
```
### *Request User*

```js
{
    id: "<integer>"
}
```

### *Success Response*
```js
Code: 201 Created
Content: 
{ 
    message: "Success in Updating Cart"
}
```

### *Error Response*
```js
Code: 400 Bad Request
Content:
{
    "errors": ["<Sorry..We Ran Out of Product>"],
    
}
```
OR
```js
Code: 404 Not Found
Content:
{
    "errors": ["<Not Found>"],
    
}
```
OR
```js
Code: 500 Internal Server Error
Content:
{
    "errors": ["<Internal Server Error>"],
    
}
```

## DELETE /carts/:id
### *Request Header*

```js
{
    access_token: "<token_jwt>"
}
```
### *Request Body*

```
Not Needed
```
### *Request User*

```js
{
    id: "<integer>"
}
```
### *Request Params*

```js
{
    id: "<integer>"
}
```

### *Success Response*
```js
Code: 200 OK
Content: 
{ 
    message: "Successfully Delete The Cart"
}
```

### *Error Response*
```js
Code: 404 Not Found
Content:
{
    "errors": ["<Not Found>"],
    
}
```
OR
```js
Code: 500 Internal Server Error
Content:
{
    "errors": ["<Internal Server Error>"],
    
}
```
