## e-commerce-cms-app App Server
```
ToDo App is an application to Shoping. This app has :
```

## RESTful endpoint for product's CRUD operation
```
JSON formatted response
```
 

## All RESTful endpoints
```
POST /login
GET /products
POST /products
GET /products/:id
PUT /products/:id
DELETE /products/:id
```

# POST /login
### Create account

## Request Header
```json
not needed
```
## Request Body
```json
{
  "email": "<your email>",
  "password": "<your password>"
}
```
## Response (201 - Created)
```json
{
  "access_token": "<your access token that has been generated>"
}
```
## Response (400 - Bad Request)
```json
{
  "message": "Wrong email / password"
}
```

# GET /products
### Get all To Do Lists

## Request Header
```json
{
  "access_token": "<your access token>"
}
```

## Request Body
```json
not needed
```
## Response (200)

```json
[
  {
    "id": "<product id>",
    "name": "<product name>",
    "image_url": "<product image_url>",
    "price": "<product price>",
    "stock": "<product stock>"
  }
]
```

## Response (400 - Bad Request)
```json
{
  "message": "Someting Wrong"
}
```

# POST /products
### Create a new To Do List

## Request Header
```json
{
  "access_token": "<your access token>"
}
```
## Request Body
```json
{
  "name": "<product name>",
  "image_url": "<product image_url>",
  "price": "<product price>",
  "stock": "<product stock>"
}
```
## Response (201 - Created)
```json
{
  "id": "<product id>",
  "name": "<product name>",
  "image_url": "<product image_url>",
  "price": "<product price>",
  "stock": "<product stock>"
}
```
## Response (400 - Bad Request)
```json
{
  "message": "Something Wrong"
}
```

# GET /products/:id
### Get current list depends on id

## Request Header
```json
{
  "access_token": "<your access token>"
}
```

## Request Params
```json
{
  "id": "<your id>"
}
```
## Request Body
```json
no needed
```
## Response (200)
```json
{
  "id": "<product id>",
  "name": "<product name>",
  "image_url": "<product image_url>",
  "price": "<product price>",
  "stock": "<product stock>"
}
```
## Response (400 - Bad Request)
```json
{
  "message": "Something Wrong"
}
```

# PUT /products/:id
### Update data current list depends on id
## Request Header
```json
{
  "access_token": "<your access token>"
}
```

## Request Params
```json
{
  "id": "<your id>"
}
```
## Request Body
```json
{
  "name": "<product name>",
  "image_url": "<product image_url>",
  "price": "<product price>",
  "stock": "<product stock>"
}
```
## Response (200)
```json
{
  "message": "Updated Successfully"
}
```
## Response (400 - Bad Request)
```json
{
  "message": "Something Wrong"
}
```

# DELETE /products/:id
### Delete current list depends on id
## Request Header
```json
{
  "access_token": "<your access token>"
}
```

## Request Params
```json
{
  "id": "<your id>"
}
```
## Request Body
```json
not needed
```
## Response (200)
```json
{
  "message": "Deleted Successfully"
}
```
## Response (400 - Bad Request)
```json
{
  "message": "Something Wrong"
}
```