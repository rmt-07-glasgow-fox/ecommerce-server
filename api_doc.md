# Ecommerce Server

&nbsp;

## List of REST API
```
** USER ADMIN **
* POST /login

** PRODUCTS **
* POST /products
* GET /products
* GET /products/:id
* PUT /products/:id
* PATCH /products/:id
* DELETE /products/:id

** BANNERS **
* POST /banners
* GET /banners
* GET /banners/active
* GET /banners/:id
* PUT /banners/:id
* PATCH /banners/:id
* DELETE /banners/:id

** CATEGORIES **
* POST /categories
* GET /categories
* GET /categories/:id
* PUT /categories/:id
* PATCH /categories/:id
* DELETE /categories/:id

** CARTS **
* POST /carts
* GET /carts/customer
* PATCH /carts/:id
* DELETE /carts/:id

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
    "email": "<email to get insert into>",
    "password": "<password to get insert into>"
}
```

_Response (200 - Ok)_
```
{
    "access_token": "<user access token>"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Email or Password wrong!"
}
```

_Response (500 - Internal Server Error)_
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
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
    "name": "Helmet",
    "image_url": "helmet.jpg",
    "price": 300000,
    "stock": 10,
    "CategoryId": 1,
    "Category": {
        "id": 1,
        "name": "Fashion",
        "createdAt": "2021-01-24T07:58:14.776Z",
        "updatedAt": "2021-01-24T07:58:14.776Z"
    }
}
```

_Response (201 - Created)_
```
{
    "id": 1,
    "name": "Helmet",
    "image_url": "helmet.jpg",
    "price": 300000,
    "stock": 10,
    "CategoryId": 1
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Failed! Foreign key not exist" or
  "message": [
              'Name cannot be empty!',
              'Image cannot be empty!',
              'Price cannot be empty!',
              'Stock cannot be empty!',
              'Stock cannot less than 0',
              'Price cannot less than 0',
              'Price only allow number!',
              'Stock only allow number!'
            ]
}
```

_Response (401 - Unauthorized)_
```
{
  "message": "Please login first!"
}
```

_Response (403 - Forbidden)_
```
{
  "message": "You dont have access!"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": ["Internal Server Error"]
}
```
---

### GET /products
> Get All Products Data
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

_Response (200)_
```
[
  {
    "id": 8,
    "name": "Helmet",
    "image_url": "helmet.jpg",
    "price": 300000,
    "stock": 10,
    "CategoryId": 1,
    "createdAt": "2021-01-24T08:54:23.584Z",
    "updatedAt": "2021-01-24T08:54:23.584Z",
    "Category": {
      "id": 1,
      "name": "Fashion",
      "createdAt": "2021-01-24T07:58:14.776Z",
      "updatedAt": "2021-01-24T07:58:14.776Z"
    }
  },
  {
    "id": 1,
    "name": "Helmet",
    "image_url": "helmet.jpg",
    "price": 300000,
    "stock": 10,
    "CategoryId": 1,
    "createdAt": "2021-01-24T08:00:37.289Z",
    "updatedAt": "2021-01-24T08:00:37.289Z",
    "Category": {
      "id": 1,
      "name": "Fashion",
      "createdAt": "2021-01-24T07:58:14.776Z",
      "updatedAt": "2021-01-24T07:58:14.776Z"
    }
  }
]
```

_Response (500 - Internal Server Error)_
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
    "id": 1,
    "name": "Helmet",
    "image_url": "helmet.jpg",
    "price": 300000,
    "stock": 10,
    "CategoryId": 1,
    "createdAt": "2021-01-24T08:00:37.289Z",
    "updatedAt": "2021-01-24T08:00:37.289Z"
}
```

_Response (404 - Not Found)_
```
{
  "message": "Product Not Found"
}
```

_Response (500 - Internal Server Error)_
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
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
    "name": "Helmet Update",
    "image_url": "helmet.jpg",
    "price": 350000,
    "stock": 5,
    "CategoryId": 1,
    "Category": {
        "id": 1,
        "name": "Fashion",
        "createdAt": "2021-01-24T07:58:14.776Z",
        "updatedAt": "2021-01-24T07:58:14.776Z"
    }
}
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
    "id": 1,
    "name": "Helmet Update",
    "image_url": "helmet.jpg",
    "price": 350000,
    "stock": 5,
    "CategoryId": 1
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Failed! Foreign key not exist" or
  "message": [
              'Name cannot be empty!',
              'Image cannot be empty!',
              'Price cannot be empty!',
              'Stock cannot be empty!',
              'Stock cannot less than 0',
              'Price cannot less than 0',
              'Price only allow number!',
              'Stock only allow number!'
            ]
}
```

_Response (401 - Unauthorized)_
```
{
  "message": "Please login first!"
}
```

_Response (403 - Forbidden)_
```
{
  "message": "You dont have access!"
}
```

_Response (404 - Not Found)_
```
{
  "message": "Product Not Found"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---

### PATCH /products/:id
> Update Stock Product By Id
_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
    "stock": 100
}
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
    "id": 1,
    "stock": 100
}
```

_Response (400 - Bad Request)_
```
{
  "message": [
              'Stock cannot be empty!',
              'Stock cannot less than 0',
              'Stock only allow number!
            ]
}
```

_Response (401 - Unauthorized)_
```
{
  "message": "Please login first!"
}
```

_Response (403 - Forbidden)_
```
{
  "message": "You dont have access!"
}
```

_Response (404 - Not Found)_
```
{
  "message": "Product Not Found"
}
```

_Response (500 - Internal Server Error)_
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
    "message:" "Product success deleted!"
}
```

_Response (401 - Unauthorized)_
```
{
  "message": "Please login first!"
}
```

_Response (403 - Forbidden)_
```
{
  "message": "You dont have access!"
}
```

_Response (404 - Not Found)_
```
{
  "message": "Product Not Found"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```

---

## Banners

### POST /banners
> Create Banner
_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
    "title": "Discount 50%",
    "image_url": "discount.jpg",
    "status": false
    "CategoryId": 1
}
```

_Response (201 - Created)_
```
{
    "id": 1,
    "title": "Discount 50%",
    "image_url": "discount.jpg",
    "status": false
    "CategoryId": 1
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Failed! Foreign key not exist" or
  "message": [
              'Title cannot be empty!',
              'Image cannot be empty!'
            ]
}
```

_Response (401 - Unauthorized)_
```
{
  "message": "Please login first!"
}
```

_Response (403 - Forbidden)_
```
{
  "message": "You dont have access!"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---

### GET /banners
> Get All Banners Data
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

_Response (200)_
```
[
  {
    "id": 1,
    "title": "Discount 50%",
    "image_url": "discount.jpg",
    "status": false
    "CategoryId": 1,
    "createdAt": "2021-01-24T08:54:23.584Z",
    "updatedAt": "2021-01-24T08:54:23.584Z",
    "Category": {
      "id": 1,
      "name": "Fashion",
      "createdAt": "2021-01-24T07:58:14.776Z",
      "updatedAt": "2021-01-24T07:58:14.776Z"
    }
  },
  {
    "id": 2,
    "title": "Discount 50%",
    "image_url": "discount.jpg",
    "status": false
    "CategoryId": 1,
    "createdAt": "2021-01-24T08:00:37.289Z",
    "updatedAt": "2021-01-24T08:00:37.289Z",
    "Category": {
      "id": 1,
      "name": "Fashion",
      "createdAt": "2021-01-24T07:58:14.776Z",
      "updatedAt": "2021-01-24T07:58:14.776Z"
    }
  }
]
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---

### GET /banners/active
> Get All Banners Data
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

_Response (200)_
```
[
  {
    "id": 1,
    "title": "Discount 50%",
    "image_url": "discount.jpg",
    "status": true
    "CategoryId": 1,
    "createdAt": "2021-01-24T08:54:23.584Z",
    "updatedAt": "2021-01-24T08:54:23.584Z",
    "Category": {
      "id": 1,
      "name": "Fashion",
      "createdAt": "2021-01-24T07:58:14.776Z",
      "updatedAt": "2021-01-24T07:58:14.776Z"
    }
  },
  {
    "id": 2,
    "title": "Discount 50%",
    "image_url": "discount.jpg",
    "status": true
    "CategoryId": 1,
    "createdAt": "2021-01-24T08:00:37.289Z",
    "updatedAt": "2021-01-24T08:00:37.289Z",
    "Category": {
      "id": 1,
      "name": "Fashion",
      "createdAt": "2021-01-24T07:58:14.776Z",
      "updatedAt": "2021-01-24T07:58:14.776Z"
    }
  }
]
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---

### GET /banners/:id
> Get Detail Banner By Id
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
    "id": 1,
    "title": "Discount 50%",
    "image_url": "discount.jpg",
    "status": false
    "CategoryId": 1,
    "createdAt": "2021-01-24T08:00:37.289Z",
    "updatedAt": "2021-01-24T08:00:37.289Z"
}
```

_Response (404 - Not Found)_
```
{
  "message": "Banner Not Found"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---

### PUT /banners/:id
> Update Data Banner By Id
_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
    "title": "Discount 50% Update",
    "image_url": "discount.jpg",
    "price": 350000,
    "stock": 5,
    "CategoryId": 1
}
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
    "id": 1,
    "name": "Discount 50% Update",
    "image_url": "discount.jpg",
    "price": 350000,
    "stock": 5,
    "CategoryId": 1
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Failed! Foreign key not exist" or
  "message": [
              'Title cannot be empty!',
              'Image cannot be empty!'
            ]
}
```

_Response (401 - Unauthorized)_
```
{
  "message": "Please login first!"
}
```

_Response (403 - Forbidden)_
```
{
  "message": "You dont have access!"
}
```

_Response (404 - Not Found)_
```
{
  "message": "Banner Not Found"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---

### PATCH /banners/:id
> Update Status Banner By Id
_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
    "status": true
}
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
    "id": 1,
    "status": true
}
```

_Response (400 - Bad Request)_
```
{
  "message": 'Only boolean'
}
```

_Response (401 - Unauthorized)_
```
{
  "message": "Please login first!"
}
```

_Response (403 - Forbidden)_
```
{
  "message": "You dont have access!"
}
```

_Response (404 - Not Found)_
```
{
  "message": "Banner Not Found"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---

### DELETE /banners/:id
> Delete Data Banner By Id
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
    "message:" "Banner success deleted!"
}
```

_Response (401 - Unauthorized)_
```
{
  "message": "Please login first!"
}
```

_Response (403 - Forbidden)_
```
{
  "message": "You dont have access!"
}
```

_Response (404 - Not Found)_
```
{
  "message": "Banner Not Found"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```

---

## CART
---

### POST /carts
> Create Cart
_Request Header_
```
no needed
```

_Request Body_
```
{
    "ProductId": 4,
    "quantity": 10
}
```

_Response (201 - Created)_
```
{
    "id": 1,
    "quantity": 10,
    "Product": {
        "id": 4,
        "name": "Helmet3",
        "image_url": "helmet.jpg",
        "price": 300000,
        "stock": 10,
        "CategoryId": 2
    }
}
```

_Response (200 - Ok)_
```
{
    "id": 1,
    "quantity": 10,
    "Product": {
        "id": 4,
        "name": "Helmet3",
        "image_url": "helmet.jpg",
        "price": 300000,
        "stock": 10,
        "CategoryId": 2
    }
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Out of Stock!"
}
```

_Response (404 - Not Found)_
```
{
  "message": "Product Not Found"
}
```

_Response (404 - Not Found)_
```
{
  "message": "Cart Not Found"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---

### GET /carts/customer
> Get Customer Cart
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

_Response (200)_
```
[
    {
        "id": 69,
        "quantity": 2,
        "Product": {
            "id": 1,
            "name": "Helmet",
            "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRew3vXSN6RJJn3jJRFOXwnoMmnXkOPxMutdA&usqp=CAU",
            "price": 300000,
            "stock": 10,
            "CategoryId": null
        }
    },
    {
        "id": 70,
        "quantity": 1,
        "Product": {
            "id": 2,
            "name": "Helmet 2",
            "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRew3vXSN6RJJn3jJRFOXwnoMmnXkOPxMutdA&usqp=CAU",
            "price": 300000,
            "stock": 10,
            "CategoryId": 2
        }
    }
]
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---

### PATCH /carts/:id
> Update Stock Product By Id
_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
    "quantity": 1
}
```

_Request Params_
```
{
  id: 1
}
```

_Response (200 - Ok)_
```
{
    "id": 1,
    "UserId": 6,
    "ProductId": 4,
    "quantity": 1,
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Out of Stock!"
}
```

_Response (404 - Not Found)_
```
{
  "message": "Product Not Found"
}
```

_Response (404 - Not Found)_
```
{
  "message": "Cart Not Found"
}
```

_Response (401 - Unauthorized)_
```
{
  "message": "Please login first!"
}
```

_Response (403 - Forbidden)_
```
{
  "message": "You dont have access!"
}
```

_Response (500 - Internal Server Error)_
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
    "message:" "Cart success deleted!"
}
```

_Response (401 - Unauthorized)_
```
{
  "message": "Please login first!"
}
```

_Response (403 - Forbidden)_
```
{
  "message": "You dont have access!"
}
```

_Response (404 - Not Found)_
```
{
  "message": "Cart Not Found"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```

---

