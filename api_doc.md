# Funorama E-Commerce API Documentation
For make you easier to develop this app, I make a documentation about API endpoints.

| Route              | Method      | Description                     | Authorization   |
| ------------------ | ----------- | ------------------------------- | --------------- |
| `/register`        | POST        | For register user               | Everyone        |
| `/loginadmin`      | POST        | For login admin user            | Everyone        |
| `/login`           | POST        | For login customer user         | Everyone        |
| `/getuser`         | GET         | For get user information        | Everyone        |
|                                                                                      |
| `/product`         | POST        | For add product to list         | Admin           |
| `/product`         | GET         | For see product list            | Everyone        |
| `/product/:id`     | GET         | For see detailed                | Admin, Customer |
| `/product/:id`     | PUT         | For update product              | Admin           |
| `/product/:id`     | DELETE      | For delete product              | Admin           |
|                                                                                      |
| `/category`        | POST        | For add category to list        | Admin           |
| `/category`        | GET         | For see category list           | Everyone        |
| `/category/:id`    | GET         | For see detailed                | Everyone        |
| `/category/:id`    | PUT         | For update category             | Admin           |
| `/category/:id`    | DELETE      | For delete category             | Admin           |
|                                                                                      |
| `/banner`          | POST        | For add banner to list          | Admin           |
| `/banner`          | GET         | For see banner list             | Everyone        |
| `/banner/:id`      | GET         | For see detailed                | Everyone        |
| `/banner/:id`      | PUT         | For update banner               | Admin           |
| `/banner/:id`      | DELETE      | For delete banner               | Admin           |
|                                                                                      |
| `/cart`            | POST        | For add product to cart         | Customer        |
| `/cart`            | GET         | For see cart list               | Customer        |
| `/cart/:id`        | PUT         | For update cart detail          | Customer        |
| `/cart/:id`        | DELETE      | For delete product in cart      | Customer        |
|                                                                                      |
| `/wishlist`        | POST        | For add product to wishlist     | Customer        |
| `/wishlist`        | GET         | For see wishlist list           | Customer        |
| `/wishlist/:id`    | DELETE      | For delete product in wishlist  | Customer        |
<br>

## Detailed Endpoints
<hr>

## User
### POST /register
_Request Header_
```
Unneeded
```

_Request Body_
```json
{
  "firstname": "<your firstname>",
  "lastname": "<your lastname>",
  "email": "<your email>",
  "password": "<your password>"
}
```

_Response (201)_
```json
{
  "id": "<your id>",
  "firstname": "<your firstname>",
  "lastname": "<your lastname>",
  "email": "<your email>"
}
```

_Response (400)_
```json
{
  "name": "SequelizeValidationError"
}
```

_Response (409)_
```json
{
  "name": "SequelizeUniqueConstraintError"
}
```

_Response (500)_
```json
{
  "name": "Internal server error"
}
```

### POST /loginadmin
_Request Header_
```
Unneeded
```

_Request Body_
```json
{
  "email": "<your email>",
  "password": "<your password>"
}
```

_Response (200)_
```json
{
  "access_token": "<your access token>"
}
```

_Response (401)_
```json
{
  "name": "invalidLogin"
}
```

_Response (401)_
```json
{
  "name": "unauthorizeAdmin"
}
```

_Response (500)_
```json
{
  "name": "Internal server error"
}
```

### GET /getuser
_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
Unneeded
```

_Response (200)_
```json
{
  "id": "<your id>",
  "firstname": "<your firstname>",
  "lastname": "<your lastname>",
  "email": "<your email>",
  "profpic": "<your profpic link>",
  "role": "<your role>
}
```

_Response (401)_
```json
{
  "name": "invalidLogin"
}
```

_Response (404)_
```json
{
  "name": "notFound"
}
```

_Response (500)_
```json
{
  "name": "Internal server error"
}
```

## Product
### POST /product
_Request Header_
```json
{
  "access_token": "<admin access_token>"
}
```

_Request Body_
```json
{
  "name": "<product name>",
  "image_url": "<product image_url>",
  "price": "<product price>",
  "stock": "<product stock>",
  "CategoryId": "<product CategoryId>"
}
```

_Response (201)_
```json
{
  "id": "<product id>",
  "name": "<product name>",
  "image_url": "<product image_url>",
  "price": "<product price>",
  "stock": "<product stock>",
  "CategoryId": "<product CategoryId>",
  "UserId": "<admin UserId>",
  "updatedAt": "<product updated date>",
  "createdAt": "<product created date>",
}
```

_Response (400)_
```json
{
  "name": "SequelizeValidationError"
}
```

_Response (401)_
```json
{
  "name": "unauthorize"
}
```

_Response (409)_
```json
{
  "name": "SequelizeUniqueConstraintError"
}
```

_Response (500)_
```json
{
  "name": "Internal server error"
}
```

### GET /product
_Request Header_
```
Unneeded
```

_Request Body_
```
Unneeded
```

_Response (200)_
```json
[
  {
    "id": "<product id>",
    "name": "<product name>",
    "image_url": "<product image_url>",
    "price": "<product price>",
    "stock": "<product stock>",
    "CategoryId": "<product CategoryId>",
    "UserId": "<admin UserId>",
    "updatedAt": "<product updated date>",
    "createdAt": "<product created date>",
    "User": {
      "id": "<admin UserId>"
    },
    "Category":{
      "id": "<category id>",
      "name": "<category name>"
    }
  },
  ...
]
```

_Response (500)_
```json
{
  "name": "Internal server error"
}
```

### GET /product/:id
_Request Header_
```json
{
  "access_token": "<your access_token>"
}
```

_Request Body_
```
Unneeded
```

_Response (200)_
```json
{
  "id": "<product id>",
  "name": "<product name>",
  "image_url": "<product image_url>",
  "price": "<product price>",
  "stock": "<product stock>",
  "CategoryId": "<product CategoryId>",
  "UserId": "<admin UserId>",
  "updatedAt": "<product updated date>",
  "createdAt": "<product created date>",
  "User": {
    "id": "<admin UserId>"
  },
  "Category":{
    "id": "<category id>",
    "name": "<category name>"
  }
}
```

_Response (401)_
```json
{
  "name": "unauthorize"
}
```

_Response (404)_
```json
{
  "name": "notFound"
}
```

_Response (500)_
```json
{
  "name": "Internal server error"
}
```

### PUT /product/:id
_Request Header_
```json
{
  "access_token": "<admin access_token>"
}
```

_Request Body_
```json
{
  "name": "<product name>",
  "image_url": "<product image_url>",
  "price": "<product price>",
  "stock": "<product stock>",
  "CategoryId": "<product CategoryId>"
}
```

_Response (200)_
```json
{
  "id": "<[new] product id>",
  "name": "<[new] product name>",
  "image_url": "<[new] product image_url>",
  "price": "<[new] product price>",
  "stock": "<[new] product stock>",
  "CategoryId": "<[new] product CategoryId>",
  "UserId": "<admin UserId>",
  "updatedAt": "<[new] product updated date>",
  "createdAt": "<product created date>",
}
```

_Response (400)_
```json
{
  "name": "SequelizeValidationError"
}
```

_Response (401)_
```json
{
  "name": "unauthorize"
}
```

_Response (404)_
```json
{
  "name": "notFound"
}
```

_Response (409)_
```json
{
  "name": "SequelizeUniqueConstraintError"
}
```

_Response (500)_
```json
{
  "name": "Internal server error"
}
```

### DELETE /product/:id
_Request Header_
```json
{
  "access_token": "<admin access_token>"
}
```

_Request Body_
```
Unneeded
```

_Response (200)_
```json
{
  "message": "Product has been deleted."
}
```

_Response (401)_
```json
{
  "name": "unauthorize"
}
```

_Response (404)_
```json
{
  "name": "notFound"
}
```

_Response (500)_
```json
{
  "name": "Internal server error"
}
```

## Category
### POST /category
_Request Header_
```json
{
  "access_token": "<admin access_token>"
}
```

_Request Body_
```json
{
  "name": "<category name>",
}
```

_Response (201)_
```json
{
  "id": "<category id>",
  "name": "<category name>",
  "updatedAt": "<category updated date>",
  "createdAt": "<category created date>",
}
```

_Response (400)_
```json
{
  "name": "SequelizeValidationError"
}
```

_Response (401)_
```json
{
  "name": "unauthorize"
}
```

_Response (409)_
```json
{
  "name": "SequelizeUniqueConstraintError"
}
```

_Response (500)_
```json
{
  "name": "Internal server error"
}
```

### GET /category
_Request Header_
```
Unneeded
```

_Request Body_
```
Unneeded
```

_Response (200)_
```json
[
  {
    "id": "<category id>",
    "name": "<category name>",
    "Products": {
      "id": "<product id>",
      "name": "<product name>",
      "image_url": "<product image_url>",
      "price": "<product price>",
      "stock": "<product stock>",
      "CategoryId": "<product CategoryId>",
    }
  },
  ...
]
```

_Response (500)_
```json
{
  "name": "Internal server error"
}
```

### GET /category/:id
_Request Header_
```json
{
  "access_token": "<your access_token>"
}
```

_Request Body_
```
Unneeded
```

_Response (200)_
```json
{
  "id": "<category id>",
  "name": "<category name>",
  "Products": {
    "id": "<product id>",
    "name": "<product name>",
    "image_url": "<product image_url>",
    "price": "<product price>",
    "stock": "<product stock>",
    "CategoryId": "<product CategoryId>",
}
```

_Response (401)_
```json
{
  "name": "unauthorize"
}
```

_Response (404)_
```json
{
  "name": "notFound"
}
```

_Response (500)_
```json
{
  "name": "Internal server error"
}
```

### PUT /category/:id
_Request Header_
```json
{
  "access_token": "<admin access_token>"
}
```

_Request Body_
```json
{
  "name": "<category name>",
}
```

_Response (200)_
```json
{
  "id": "<[new] category id>",
  "name": "<[new] category name>",
  "updatedAt": "<[new] category updated date>",
  "createdAt": "<category created date>",
}
```

_Response (400)_
```json
{
  "name": "SequelizeValidationError"
}
```

_Response (401)_
```json
{
  "name": "unauthorize"
}
```

_Response (404)_
```json
{
  "name": "notFound"
}
```

_Response (409)_
```json
{
  "name": "SequelizeUniqueConstraintError"
}
```

_Response (500)_
```json
{
  "name": "Internal server error"
}
```

### DELETE /category/:id
_Request Header_
```json
{
  "access_token": "<admin access_token>"
}
```

_Request Body_
```
Unneeded
```

_Response (200)_
```json
{
  "message": "Category has been deleted."
}
```

_Response (401)_
```json
{
  "name": "unauthorize"
}
```

_Response (404)_
```json
{
  "name": "notFound"
}
```

_Response (500)_
```json
{
  "name": "Internal server error"
}
```

## Banner
### POST /banner
_Request Header_
```json
{
  "access_token": "<admin access_token>"
}
```

_Request Body_
```json
{
  "name": "<banner name>",
}
```

_Response (201)_
```json
{
  "id": "<banner id>",
  "name": "<banner name>",
  "image_url": "<banner image url>",
  "updatedAt": "<banner updated date>",
  "createdAt": "<banner created date>",
}
```

_Response (400)_
```json
{
  "name": "SequelizeValidationError"
}
```

_Response (401)_
```json
{
  "name": "unauthorize"
}
```

_Response (409)_
```json
{
  "name": "SequelizeUniqueConstraintError"
}
```

_Response (500)_
```json
{
  "name": "Internal server error"
}
```

### GET /banner
_Request Header_
```
Unneeded
```

_Request Body_
```
Unneeded
```

_Response (200)_
```json
[
  {
    "id": "<banner id>",
    "name": "<banner name>",
    "image_url": "<banner image url>"
  },
  ...
]
```

_Response (500)_
```json
{
  "name": "Internal server error"
}
```

### GET /banner/:id
_Request Header_
```json
{
  "access_token": "<your access_token>"
}
```

_Request Body_
```
Unneeded
```

_Response (200)_
```json
{
  "id": "<banner id>",
  "name": "<banner name>",
  "image_url": "<banner image url>"
}
```

_Response (401)_
```json
{
  "name": "unauthorize"
}
```

_Response (404)_
```json
{
  "name": "notFound"
}
```

_Response (500)_
```json
{
  "name": "Internal server error"
}
```

### PUT /banner/:id
_Request Header_
```json
{
  "access_token": "<admin access_token>"
}
```

_Request Body_
```json
{
  "name": "<banner name>",
}
```

_Response (200)_
```json
{
  "id": "<[new] banner id>",
  "name": "<[new] banner name>",
  "image_url": "<banner image url>",
  "updatedAt": "<[new] banner updated date>",
  "createdAt": "<banner created date>",
}
```

_Response (400)_
```json
{
  "name": "SequelizeValidationError"
}
```

_Response (401)_
```json
{
  "name": "unauthorize"
}
```

_Response (404)_
```json
{
  "name": "notFound"
}
```

_Response (500)_
```json
{
  "name": "Internal server error"
}
```

### DELETE /banner/:id
_Request Header_
```json
{
  "access_token": "<admin access_token>"
}
```

_Request Body_
```
Unneeded
```

_Response (200)_
```json
{
  "message": "Banner has been deleted."
}
```

_Response (401)_
```json
{
  "name": "unauthorize"
}
```

_Response (404)_
```json
{
  "name": "notFound"
}
```

_Response (500)_
```json
{
  "name": "Internal server error"
}
```

## Cart
### POST /cart
_Request Header_
```json
{
  "access_token": "<customer access_token>"
}
```

_Request Body_
```json
{
  "ProductId": "<product id>",
}
```

_Response (201)_
```json
{
    "id": "<cart id>",
    "UserId": "<user id>",
    "ProductId": "<product id>",
    "quantity": "<product quantity>",
    "isPaid": "<product status>",
    "updatedAt": "<cart updated date>",
    "createdAt": "<cart created date>"
}
```

_Response (400)_
```json
{
  "name": "SequelizeValidationError"
}
```

_Response (500)_
```json
{
  "name": "SequelizeDatabaseError"
}
```

### GET /cart
_Request Header_
```json
{
  "access_token": "<customer access_token>"
}
```

_Request Body_
```
Unneeded
```

_Response (200)_
```json
[
  {
    "id": "<cart id>",
    "UserId": "<user id>",
    "ProductId": "<product id>",
    "quantity": "<product quantity>",
    "isPaid": "<product status>",
    "updatedAt": "<cart updated date>",
    "createdAt": "<cart created date>",
    "User": {
      "id": "<customer id>",
      "firstname": "<customer firstname>",
      "lastname": "<customer lastname>",
      "profpic": "<customer profpic image url>",
      "email": "<customer email>"
    },
    "Product": {
      "id": "<product id>",
      "name": "<product name>",
      "image_url": "<product image url>",
      "price": "<product price>",
      "stock": "<product stock>",
      "CategoryId": "<category id>",
      "createdAt": "<product created date>",
      "updatedAt": "<product updated date>"
    }
  }
  ...
]
```

_Response (500)_
```json
{
  "name": "Internal server error"
}
```

### PUT /cart/:id
_Request Header_
```json
{
  "access_token": "<customer access_token>"
}
```

_Request Body_
```json
{
  "ProductId": "<product id>",
  "quantity": "<product quantity>",
  "isPaid": "<product status>
}
```

_Response (200)_
```json
{
  "message": "Product has been checked out!"
}
```

_Response (400)_
```json
{
  "name": "SequelizeValidationError"
}
```

_Response (404)_
```json
{
  "name": "notFound"
}
```

_Response (500)_
```json
{
  "name": "Internal server error"
}
```

### DELETE /cart/:id
_Request Header_
```json
{
  "access_token": "<customer access_token>"
}
```

_Request Body_
```
Unneeded
```

_Response (200)_
```json
{
  "message": "Product has been removed from your cart!"
}
```

_Response (404)_
```json
{
  "name": "cartNotFound"
}
```

_Response (500)_
```json
{
  "name": "Internal server error"
}
```

## Wishlist
### POST /wishlist
_Request Header_
```json
{
  "access_token": "<customer access_token>"
}
```

_Request Body_
```json
{
  "ProductId": "<product id>",
}
```

_Response (201)_
```json
{
    "id": "<wishlist id>",
    "UserId": "<user id>",
    "ProductId": "<product id>",
    "updatedAt": "<wishlist updated date>",
    "createdAt": "<wishlist created date>"
}
```

_Response (400)_
```json
{
  "name": "SequelizeValidationError"
}
```

_Response (500)_
```json
{
  "name": "SequelizeDatabaseError"
}
```

### GET /wishlist
_Request Header_
```json
{
  "access_token": "<customer access_token>"
}
```

_Request Body_
```
Unneeded
```

_Response (200)_
```json
[
  {
    "id": "<wishlist id>",
    "UserId": "<user id>",
    "ProductId": "<product id>",
    "updatedAt": "<wishlist updated date>",
    "createdAt": "<wishlist created date>",
    "User": {
      "id": "<customer id>",
      "firstname": "<customer firstname>",
      "lastname": "<customer lastname>",
      "profpic": "<customer profpic image url>",
      "email": "<customer email>"
    },
    "Product": {
      "id": "<product id>",
      "name": "<product name>",
      "image_url": "<product image url>",
      "price": "<product price>",
      "stock": "<product stock>",
      "CategoryId": "<category id>",
      "createdAt": "<product created date>",
      "updatedAt": "<product updated date>"
    }
  }
  ...
]
```

_Response (500)_
```json
{
  "name": "Internal server error"
}
```

### DELETE /wishlist/:id
_Request Header_
```json
{
  "access_token": "<customer access_token>"
}
```

_Request Body_
```
Unneeded
```

_Response (200)_
```json
{
  "message": "Product has been removed from your wishlist!"
}
```

_Response (404)_
```json
{
  "name": "wishlistNotFound"
}
```

_Response (500)_
```json
{
  "name": "Internal server error"
}
```
