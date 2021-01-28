# E-Commerce CMS Documentation
E-commerce CMS App is an application to manage products on e-commerce website.
* RESTful endpoint for e-commerce product's CRUD operation
* JSON formatted response

---

>List of available endpoints:
​
- `POST /register`
- `POST /login`
- `GET /admin/products`
- `GET /admin/products/:id`
- `POST /admin/products`
- `PUT /admin/products/:id`
- `DELETE /admin/products/:id`

- `GET /cart/`
- `POST /cart/:ProductId`
- `PATCH /cart/:id/add`
- `PATCH /cart/:id/remove`
- `DELETE /cart/:id/`

- `GET /wishlist`
- `POST /wishlist/:ProductId`
- `DELETE /wishlist/:id`


## POST /register

>Customer register

_Request Params_
```
Not needed
```
_Request Header_
```
Not needed
```
_Request Body:_

```json
{
  "email": "<email>",
  "password": "<password>",
  "first_name": "<first_name>",
  "last_name": "<last_name>"
}
```

_Response (200)_

```json
{
    "id": "<id>",
    "email": "<email>",
    "first_name": "<first_name>",
    "last_name": "<last_name>"
}
```
_Response (400 - SequelizeValidationError)_
```json
{
  "message": "<error message>"
}
```

---
## POST /login

>Admin login

_Request Params_
```
Not needed
```
_Request Header_
```
Not needed
```
_Request Body:_

```json
{
  "email": "<email>",
  "password": "<password>"
}
```

_Response (200)_

```json
{
    "access_token": "<your access token>",
    "user_status": "<your login status>"
}
```
_Response (401 - Unauthorized)_
```json
{
  "message": "invalid email or password"
}
```
---
## GET /admin/products

>get all products

_Request Params_
```
Not needed
```
_Request Header :_
```json
{
  "access_token": "<your access token>"
}
```
_Request Body :_

```
not needed
```

_Response (200)_

```json
[
  {
    "id": "<product id>",
    "name": "<product name>",
    "image_url": "<product image url>",
    "price": "<product price>",
    "stock": "<product stock>",
    "category": "<product category>",
    "createdAt": "2021-01-19T09:38:54.386Z",
    "updatedAt": "2021-01-21T09:14:54.109Z"
  }
]
```
---
## POST /admin/products

>add a new product

_Request Params_
```
Not needed
```
_Request Header :_
```json
{
  "access_token": "<your access token>"
}
```
_Request Body :_

```json
{
  "name": "<product name>",
  "image_url": "<product image url>",
  "price": "<product price>",
  "stock": "<product stock>",
  "category": "<product category>",
}
```
_Response (200)_

```json
{
  "id": "<product id>",
  "name": "<product name>",
  "image_url": "<product image url>",
  "price": "<product price>",
  "stock": "<product stock>",
  "category": "<product category>",
  "createdAt": "2021-01-19T09:38:54.386Z",
  "updatedAt": "2021-01-21T09:14:54.109Z"
}
```
---
## DELETE /admin/products/:id

>delete product

_Request Params_
```json
id: "<Product.id>"
```
_Request Header :_

```json
{
  "access_token": "<your access token>"
}
```
_Request Body_
```
Not needed
```

_Response (200)_

```json
{
  "message": "product has been deleted"
}
```
---
## GET /admin/products/:id

>get a product by id

_Request Params_
```json
id: "<Product.id>"
```
_Request Header :_

```json
{
  "access_token": "<your access token>"
}
```
_Request Body_
```
Not needed
```

_Response (200)_

```json
{
  "id": "<product id>",
  "name": "<product name>",
  "image_url": "<product image url>",
  "price": "<product price>",
  "stock": "<product stock>",
  "category": "<product category>",
  "createdAt": "2021-01-19T09:38:54.386Z",
  "updatedAt": "2021-01-21T09:14:54.109Z"
}
```
_Response (401)_
```json
{
  "message": "unauthorized access"
}
```
---
## PUT /admin/products/:id

>update a product

_Request Params_
```json
id: "<Product.id>"
```
_Request Header :_

```json
{
  "access_token": "<your access token>"
}
```

_Request Body :_

```json
{
  "name": "<product name>",
  "image_url": "<product image url>",
  "price": "<product price>",
  "stock": "<product stock>",
  "category": "<product category>",
}
```

_Response (200)_

```json
{
  "id": "<product id>",
  "name": "<product name>",
  "image_url": "<product image url>",
  "price": "<product price>",
  "stock": "<product stock>",
  "category": "<product category>",
  "createdAt": "2021-01-19T09:38:54.386Z",
  "updatedAt": "2021-01-21T09:14:54.109Z"
}
```
---
## GET /cart

>get all products in cart

_Request Params_
```
Not needed
```
_Request Header :_
```json
{
  "access_token": "<your access token>"
}
```
_Request Body :_

```
not needed
```

_Response (200)_

```json
[
  {
    "id": "<id>",
    "UserId": "<UserId>",
    "ProductId": "<ProductId>",
    "quantity": "<quantity>",
    "createdAt": "2021-01-27T20:24:59.858Z",
    "updatedAt": "2021-01-27T20:24:59.858Z",
    "Product": {
      "id": "<Product.id>",
      "name": "<Product.name>",
      "image_url": "<Product.image_url>",
      "price": "<Product.price>",
      "stock": "<Product.stock>",
      "category": "<Product.category>",
      "createdAt": "2021-01-26T18:04:55.587Z",
      "updatedAt": "2021-01-26T18:04:55.587Z"
    }
  }
]
```
---
## POST /cart/:ProductId

>add product to cart

_Request Params_
```json
id: "<Product.id>"
```
_Request Header :_
```json
{
  "access_token": "<your access token>"
}
```
_Request Body :_

```json
Not needed
```
_Response (200)_

```json
{
  "id": "<id>",
  "UserId": "<UserId>",
  "ProductId": "<ProductId>",
  "updatedAt": "2021-01-28T04:03:07.797Z",
  "createdAt": "2021-01-28T04:03:07.797Z",
  "quantity": "<quantity>"
}
```

---
## PATCH /cart/:id/add

>increase product quantity in cart

_Request Params_
```json
id: "<Cart.id>"
```
_Request Header :_
```json
{
  "access_token": "<your access token>"
}
```
_Request Body :_

```json
Not needed
```
_Response (200)_

```json
{
  "quantity": "<quantity>"
}
```

---
## PATCH /cart/:id/remove

>decrease product quantity in cart

_Request Params_
```json
id: "<Cart.id>"
```
_Request Header :_
```json
{
  "access_token": "<your access token>"
}
```
_Request Body :_

```json
Not needed
```
_Response (200)_

```json
{
  "quantity": "<quantity>"
}
```

---
## DELETE /cart/:id

>remove product from cart

_Request Params_
```json
id: "<Cart.id>"
```
_Request Header :_
```json
{
  "access_token": "<your access token>"
}
```
_Request Body :_

```json
Not needed
```
_Response (200)_

```json
{
  "message": "Product removed"
}
```

---
## GET /wishlist

>Get all wishlist

_Request Params_
```
Not needed
```
_Request Header :_
```json
{
  "access_token": "<your access token>"
}
```
_Request Body :_

```json
Not needed
```
_Response (200)_

```json
[
  {
    "id": "<id>",
    "UserId": "<UserId>",
    "ProductId": "<ProductId>",
    "createdAt": "2021-01-27T20:25:04.013Z",
    "updatedAt": "2021-01-27T20:25:04.013Z",
    "Product": {
      "id": "<id>",
      "name": "<name>",
      "image_url": "<image_url>",
      "price": "<price>",
      "stock": "<stock>",
      "category": "<category>",
      "createdAt": "2021-01-26T18:04:55.587Z",
      "updatedAt": "2021-01-26T18:04:55.587Z"
    }
  }
]
```

---
## POST /wishlist/:ProductId

>Add product to wishlist

_Request Params_
```json
id: "<Product.id>"
```
_Request Header :_
```json
{
  "access_token": "<your access token>"
}
```
_Request Body :_

```json
Not needed
```
_Response (200)_

```json
{
  "id": "<>",
  "UserId": "<>",
  "ProductId": "<>",
  "updatedAt": "2021-01-28T04:16:37.908Z",
  "createdAt": "2021-01-28T04:16:37.908Z"
}
```

---
## DELETE /wishlist/:id

>Delete product from wishlist

_Request Params_
```json
id: "<Wishlist.id>"
```
_Request Header :_
```json
{
  "access_token": "<your access token>"
}
```
_Request Body :_

```json
Not needed
```
_Response (200)_

```json
{
  "message": "The product has been removed from your wishlist"
}
```