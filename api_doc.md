# E-commerce CMS 
* RESTful endpoint for e-commerce CRUD operation
* JSON formatted response

&nbsp;

## List Endpoints E-Commerce

- "POST/login"
- "POST/product"
- "GET/product"
- "GET/product/:category"
- "GET/product/:id"
- "PUT/product/:id"
- "Patch/product/:id"
- "DELETE/product/:id"

## RESTful endpoints

### POST /login

login process

_Request Body_
```json
{
  "email": "<email to get insert into>",
  "password": "<password to get insert into>",
}
```
_Response (200 - Login Success)_
```json
{
  "email": "<post task email>",
  "role": "<post role>",
  "access_token": "<post access_token>",
}
```
_Response (400 - Bad Request)_
```json

{
  "message": "email / password wrong"
}
```
_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal Server Error",
}
```

### POST /product

Add product

_Request Body_
```json
{
  "name":"<name to get insert into>",
  "description":"<description to get insert into>",
  "category":"<category to get insert into>",
  "price":"<price to get insert into>",
  "stock":"<stock to get insert into>",
  "image_url":"<imageURL to get insert into>"
}
```
_Response (201 - Created)_
```json
{
  "id":"<id given by system posted >",
  "name":"<name posted>",
  "description":"<description posted>",
  "category":"<category posted>",
  "price":"<price posted>",
  "stock":"<stock posted>",
  "image_url":"<imageURL posted>",
  "createdAt":"<createdAt given by system posted>",
  "updatedAt":"<createdAt given by system posted>"
}
```
_Response (400 - Bad Request)_
```json
{
  "message": [
    "name cannot empty",
    "category cannot empty",
    "price cannot empty",
    "price cannot 0",
    "invalid price value",
    "stock cannot empty",
    "invalid stock value"  
    ]
}
```
_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal Server Error",
}
```

### GET /product

List All Products

_Request Header_
```json
{
  "access_token":"<your access token>"
}
```

_Request Body_
```
no need
```
_Response (200 - OK)_
```json
{
  "id": 1,
  "name":"<product name>",
  "description":"<product description>",
  "category":"<product category>",
  "price":"<product price>",
  "stock":"<product stock>",
  "image_url":"<product imageURL>",
  "createdAt":"<2020-03-20T07:15:12.149Z>",
  "updatedAt":"<2020-03-20T07:15:12.149Z>"
},

{
  "id": 2,
  "name":"<product name>",
  "description":"<product description>",
  "category":"<product category>",
  "price":"<product price>",
  "stock":"<product stock>",
  "image_url":"<product imageURL>",
  "createdAt":"<2020-03-20T07:15:12.149Z>",
  "updatedAt":"<2020-03-20T07:15:12.149Z>"
}
```
_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal Server Error",
}
```

### GET /product/:category

Show All Products by Category

_Request Header_
```json
{
  "access_token":"<your access token>"
}
```

_Request Body_
```
no need
```
_Response (200 - OK)_
```json
{
  "id": 1,
  "name":"<product name>",
  "description":"<product description>",
  "category":"<product category>",
  "price":"<product price>",
  "stock":"<product stock>",
  "image_url":"<product imageURL>",
  "createdAt":"<2020-03-20T07:15:12.149Z>",
  "updatedAt":"<2020-03-20T07:15:12.149Z>"
},

{
  "id": 5,
  "name":"<product name>",
  "description":"<product description>",
  "category":"<product category>",
  "price":"<product price>",
  "stock":"<product stock>",
  "image_url":"<product imageURL>",
  "createdAt":"<2020-03-20T07:15:12.149Z>",
  "updatedAt":"<2020-03-20T07:15:12.149Z>"
}
```
_Response (404 - Not Found)_
```json
{
  "message": "Category not found or not posted yet",
}
```
_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal Server Error",
}
```

### GET /product/:id

Show All Products by id

_Request Header_
```json
{
  "access_token":"<your access token>"
}
```

_Request Body_
```
no need
```
_Response (200 - OK)_
```json
{
  "id": 6,
  "name":"<product name>",
  "description":"<product description>",
  "category":"<product category>",
  "price":"<product price>",
  "stock":"<product stock>",
  "image_url":"<product imageURL>",
  "createdAt":"<2020-03-20T07:15:12.149Z>",
  "updatedAt":"<2020-03-20T07:15:12.149Z>"
}
```
_Response (404 - Not Found)_
```json
{
  "message": "Product not found",
}
```
_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal Server Error",
}
```

### PUT /product/:id

Update Product

_Request Header_
```json
{
  "access_token":"<your access token>"
}
```
_Request Body_
```json
{
  "name":"<name to get updated>",
  "description":"<description to get updated>",
  "category":"<category to get updated>",
  "price":"<price to get updated>",
  "stock":"<stock to get updated>",
  "image_url":"<imageURL to get updated>"
}
```
_Response (200 - OK)_
```json
{
  "id":"<id same as before >",
  "name":"<name updated>",
  "description":"<description updated>",
  "category":"<category updated>",
  "price":"<price updated>",
  "stock":"<stock updated>",
  "image_url":"<imageURL updated>",
  "createdAt":"<createdAt same as before>",
  "updatedAt":"<createdAt given by system updated>"
}
```
_Response (400 - Bad Request)_
```json
{
  "message": [
    "name cannot empty",
    "category cannot empty",
    "price cannot empty",
    "price cannot 0",
    "invalid price value",
    "stock cannot empty",
    "invalid stock value"  
    ]
}
```
_Response (404 - Not Found)_
```json
{
  "message": "Product not found",
}
```
_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal Server Error",
}
```

### PATCH /product/:id

Update Stock

_Request Header_
```json
{
  "access_token":"<your access token>"
}
```
_Request Body_
```json
{
  "stock":"<stock to get updated>"
}
```
_Response (200 - OK)_
```json
{
  "id":"<id same as before >",
  "name":"<name same as before>",
  "description":"<description same as before>",
  "category":"<category same as before>",
  "price":"<price same as before>",
  "stock":"<stock updated>",
  "image_url":"<imageURL same as before>",
  "createdAt":"<createdAt same as before>",
  "updatedAt":"<createdAt given by system updated>"
}
```
_Response (400 - Bad Request)_
```json
{
  "message": [
    "stock cannot empty",
    "invalid stock value"  
    ]
}
```
_Response (404 - Not Found)_
```json
{
  "message": "Product not found",
}
```
_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal Server Error",
}
```
### DELETE /product/:id

Delete Product

_Request Header_
```json
{
  "access_token":"<your access token>"
}
```
_Request Body_
```
no need
```
_Response (200 - OK)_
```json
{
  "message":"Deleted"
}
```
_Response (404 - Not Found)_
```json
{
  "message": "Product not found",
}
```
_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal Server Error",
}
```