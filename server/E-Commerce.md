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
    "errorMessages": ["<Error Not Found>"],
    
}
```
