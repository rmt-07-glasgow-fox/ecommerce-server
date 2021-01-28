# Ecommerce Server

&nbsp;

## List of REST API
```

** USER **
* POST /login
* POST /register

** PRODUCTS **
* POST /products
* GET /products
* GET /products/:id
* PUT /products/:id
* DELETE /products/:id
* GET /customer/products

** CART **
* GET /cart
* POST /cart/:id
* POST /cart/:id
* PUT /cart/:id
* DELETE /cart/:id
```
&nbsp;
## RESTfull endpoints
---

### POST /login
> Create Product
_Request Header_
```
no needed
```
_Request Body_
```
{
  "email": "<email input>",
  "password": "<password input>"
}
```

_Response (200)_
```
{
  "access_token": "<user access token>"
}
```

_Response (400)_
```
{
  "msg": "email or password is undefined"
}
```

_Response (500)_
```
{
  "message": "Internal Server Error"
}
```
---

### POST /register
> Create Product
_Request Header_
```
no needed
```
_Request Body_
```
{
  "email": "<email input>"
  "password": "<password input>"
}
```

_Response (201)_
```
{
  "id": "<id by database>"
  "email": "<email input user>"
  "role": "customer"
}
```

_Response (500)_
```
{
  "message": "Internal Server Error"
}
```
---

### POST /products
> Create Product
_Request Header_
```
{
  "access_token": "<user access token>"
}
```
_Request Body_
```
{
  "name": "<Product name input>"
  "image_url": "<url image input>"
  "price": "<price input>" (integer)
  "stock": "<stock input>" (integer)
}
```

_Response (201)_
```
{
  "id": "<increment by database>"
  "name": "<Product name input>"
  "image_url": "<url image input>"
  "price": "<price input>" (integer)
  "stock": "<stock input>" (integer)
  "createdAt": "<input by database>"
  "updatedAt": "<input by database>"
}
```
_Response (403)_
```
{
  "msg": "Admin only"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---

### GET /products
> Get All Products Data
_Request Header_
```
{
  "access_token": "<user access token>"
}
```
_Request Body_
```
not needed
```

_Response (200)_
```
[
  {
    "id": 2
    "name": "Shoes"
    "image_url": "www.cdn.gif.Shoes.jpg"
    "price": 500000
    "stock": 10
    "createdAt": "<added by database>"
    "updatedAt": "<added by database>"
  },
  {
    "id": 1
    "name": "Tshirt"
    "image_url": "www.cdn.gif.Tshirt.jpg"
    "price": 10000
    "stock": 10
    "createdAt": "<added by database>"
    "updatedAt": "<added by database>"
  }
]
```

_Response (400)_
```
{
  "msg": "Require access_token"
}
```

_Response (500)_
```
{
  "message": "Internal Server Error"
}
```
---

### GET /products/:id
> Get Detail Product By Id
_Request Header_
```
{
  "access_token": "<your access token>"
}
```
_Request Body_
```
not needed
```

_Request Params_
```
{
  id: 1
}
```

_Response (200)_
```
{
  "id": 1
  "name": "Tshirt"
  "image_url": "www.cdn.gif.Tshirt.jpg"
  "price": 10000
  "stock": 10
  "createdAt": "<added by database>"
  "updatedAt": "<added by database>"
}
```
_Response (400)_
```
{
  "msg": "Require access_token"
}
```
_Response (404)_
```
{
  "message": "Data is undefined"
}
```

_Response (500)_
```
{
  "message": "Internal Server Error"
}
```
---

### PUT /products/:id
> Update Data Product By Id
_Request Header_
```
{
  "access_token": "<user access token>"
}
```
_Request Params_
```
{
  "id": "<Product id>"
}
```

_Request Body_
```
{
  "name": "Shoes Update"
  "image_url": "Shoes.jpg"
  "price": 100000
  "stock": 10
}
```

_Response (200)_
```
{
  "id": "<Product id>"
  "name": "Shoes Update"
  "image_url": "Shoes.jpg"
  "price": 100000
  "stock": 10
}
```
_Response (400)_
```
{
  "msg": "Require access_token"
}
```
_Response (403)_
```
{
  "msg": "Admin only"
}
```

_Response (404)_
```
{
  "msg": "Data is undefined"
}
```

_Response (500)_
```
{
  "message": "Internal Server Error"
}
```
---

### DELETE /products/:id
> Delete Data Product By Id
_Request Header_
```
{
  "access_token": "<user access token>"
}
```
_Request Body_
```
not needed
```

_Request Params_
```
{
  "id": 1
}
```

_Response (200)_
```
{
  "msg:" "product was deleted"
}
```
_Response (400)_
```
{
  "msg": "Require access_token"
}
```
_Response (403)_
```
{
  "msg:" "Admin only"
}
```

_Response (500)_
```
{
  "message": "Internal Server Error"
}
```

---



### GET /products/products
> Get All Products Data
_Request Header_
```
{
  "access_token": "<user access token>"
}
```
_Request Body_
```
not needed
```

_Response (200)_
```
[
  {
    "id": 2
    "name": "Shoes"
    "image_url": "www.cdn.gif.Shoes.jpg"
    "price": 500000
    "stock": 10
    "createdAt": "<added by database>"
    "updatedAt": "<added by database>"
  },
  {
    "id": 1
    "name": "Tshirt"
    "image_url": "www.cdn.gif.Tshirt.jpg"
    "price": 10000
    "stock": 10
    "createdAt": "<added by database>"
    "updatedAt": "<added by database>"
  }
]
```

_Response (400)_
```
{
  "msg": "Require access_token"
}
```

_Response (500)_
```
{
  "message": "Internal Server Error"
}
```
---

### GET /cart
> Get All Cart Data
_Request Header_
```
not needed
```
_Request Body_
```
not needed
```

_Response (200)_
```
[
  {
    "id": "<increment by database>"
    "UserId": "<UserId database>"
    "ProductId": "<ProductId database>"
    "quantity": 2
    "cost": "100000"
    "createdAt": "<added by database>"
    "updatedAt": "<added by database>"
    "Product": {
      "id": "<increment by database>"
      "name": "shirt"
      "image_url": "https://cdn-ssl.s7.disneystore.com/is/image/DisneyShopping/7505057372696"
      "price": 50000
      "stock": 2
      "UserId": 4
      "createdAt": "<added by database>"
      "updatedAt": "<added by database>"
    }
  },
]
```

_Response (400)_
```
{
  "msg": "Require access_token"
}
```

_Response (500)_
```
{
  "message": "Internal Server Error"
}
```
---



### POST /cart/:id
> Create Cart Data
_Request Header_
```
{
  "access_token": "<user access token>"
}
```
_Request Body_
```
not needed
(quantity 1 by default)
```
_Request Params_
```
{
  id: "product.id"
}
```

_Response (201)_
```
[
  {
    "id": "<increment by database>"
    "UserId": "<UserId database>"
    "ProductId": "product.id"
    "quantity": 1
    "cost": 100000
  }
]
```

_Response (400)_
```
{
  "msg": "Require access_token"
}
```

_Response (500)_
```
{
  "message": "Internal Server Error"
}
```
---

### PUT /cart/:id
> Update Cart Data
_Request Header_
```
{
  "access_token": "<user access token>"
}
```
_Request Body_
```
not needed
(increment quantity +1 by default)
```
_Request Params_
```
{
  id: "cart.id"
}
```

_Response (200)_
```
[
  {
    "id": "<increment by database>"
    "UserId": "<UserId database>"
    "ProductId": "<ProductId database>"
    "quantity": 2
    "cost": 100000
  }
]
```

_Response (400)_
```
{
  "msg": "Require access_token"
}
```

_Response (500)_
```
{
  "message": "Internal Server Error"
}
```
---



### DELETE /cart/:id
> Delete Cart Data
_Request Header_
```
{
  "access_token": "<user access token>"
}
```
_Request Body_
```
not needed
```
_Request Params_
```
{
  id: "cart.id"
}
```

_Response (200)_
```
{
  msg: "Data was deleted"
}
```

_Response (400)_
```
{
  "msg": "Require access_token"
}
```
_Response (404)_
```
{
  "msg": "Data is undefined"
}
```

_Response (500)_
```
{
  "message": "Internal Server Error"
}
```
---


