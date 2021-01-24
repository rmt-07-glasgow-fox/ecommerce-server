# E-Commerce CMS Documentation
E-commerce CMS App is an application to manage products on e-commerce website.
* RESTful endpoint for e-commerce product's CRUD operation
* JSON formatted response

---

>List of available endpoints:
​
- `POST /login`
- `GET /admin/products`
- `GET /admin/products/:id`
- `POST /admin/products`
- `PUT /admin/products/:id`
- `DELETE /admin/products/:id`

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
```
{
  "msg": "invalid email or password"
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
id: "integer"
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

```
{
  "message": "product has been deleted"
}
```
---
## GET /admin/products/:id

>get a product by id

_Request Params_
```
id: "integer"
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
```
{
   "message": "unauthorized access"
}
```
---
## PUT /admin/products/:id

>update a product

_Request Params_
```
id: "integer"
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