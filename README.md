# ecommerce-server
Server for "AnTz Shop" e-commerce CMS & Customer Client app, created using node.js, express, sequelize, postgres.


## URL:
https://ecommerce-glasgow-server.herokuapp.com

#### Link for CMS Client:
[AnTz Shop - CMS Client](https://github.com/AnthonyGunardi/ecommerce-client-CMS)

#### Link Customer Client:
[AnTz Shop - Customer Client](https://github.com/AnthonyGunardi/ecommerce-client-customer)


## List of available endpoints:

- `POST /login/admin`
- `POST /login/customer`
- `POST /login/google`
- `POST /register`
- `GET /user`
- `GET /products`
- `GET /products/:id`
- `POST /products`
- `PUT /products/:id`
- `DELETE /products/:id`
- `GET /categories`
- `GET /categories/:id`
- `POST /categories`
- `PUT /categories/:id`
- `DELETE /categories/:id`
- `GET /banners`
- `GET /banners/:id`
- `POST /banners`
- `PUT /banners/:id`
- `DELETE /banners/:id`
- `GET /transaction`
- `GET /history`
- `PUT /transaction/:id`
- `DELETE /transaction/:id`
- `POST /cart/:id`
- `PUT /cart/:id`
- `DELETE /cart/:id`
- `GET /wishlists`
- `POST /wishlists/:id`
- `DELETE /wishlists/:id`


### POST /login/admin

description: 
  login for admin

Request:

- data:

```json
{
  "email": "string",
  "password": "string"
}
```

Response:

- status: 200
- body:
  ​

```json
{
    "access_token": "jwt string"
}
```

- status: 401
- body:
  ​

```json
{
  "message": "Wrong Email or Password"
}
```

- status: 403
- body:
  ​

```json
{
  "message": "You Don't Have Access To This Panel"
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal Server Error"
}
```

### POST /login/customer

description: 
  login for customer

Request:

- data:

```json
{
  "email": "string",
  "password": "string"
}
```

Response:

- status: 200
- body:
  ​

```json
{
  "access_token": "jwt string"
}
```

- status: 401
- body:
  ​

```json
{
  "message": "Wrong Email or Password"
}
```

- status: 403
- body:
  ​

```json
{
  "message": "Admin Account Cannot Be Used In Customer Side"
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal Server Error"
}
```

### POST /login/google

description: 
  sign in as Google user

Request:

- data:

```json
{
  "idToken": "google token"
}
```

Response:

- status: 200
- body:
  ​

```json
{
    "access_token": "jwt string",
    "name" : "string"
}
```

- status: 201
- body:
  ​

```json
{
    "access_token": "jwt string",
    "name" : "string"
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal Server Error"
}
```

### POST /register

description: 
  register for customer user

Request:

- data:

```json
{
  "email": "string",
  "password": "string"
}
```

Response:

- status: 200
- body:
  ​

```json
{
  "id": "integer",
  "email": "string"
}
```

- status: 400
- body:
  ​

```json
{
  "message": [
    "Email is Required",
    "Email is Invalid",
    "Password is Required",
    "Password Should Have Minimum 6 Characters"
  ]
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal Server Error"
}
```

### GET /users

description: 
  get current user data

Request:

- headers: access_token (string) 

Response:

- status: 200
- body:

```json
{
  "id": "integer",
  "email": "string",
  "role": "string"
}  

```

- status: 500
- body:
  ​

```json
{
  "message": "Internal Server Error"
}
```

### GET /products

description: 
  get list of all products.

Request:

- headers: access_token (string) [for CMS only]

Response:

- status: 200
- body:

```json
{
  "products": [
    {
      "id": 1,
      "name": "Keyboard Logitech K380",
      "image_url": "https://www.jakartanotebook.com/images/products/41/67/17659/2/logitech-multi-device-bluetooth-keyboard-k380-black-7.jpg",
      "price": 100000,
      "stock": 5,
      "CategoryId": 4,
      "createdAt": "2021-01-18T03:46:59.661Z",
      "updatedAt": "2021-01-18T03:46:59.661Z",
      "Category": {
        "id": 4,
        "name": "Keyboard",
        "image": "keyboard",
        "createdAt": "2021-01-18T03:46:59.657Z",
        "updatedAt": "2021-01-18T03:46:59.657Z"
      }
    },
    {
      "id": 2,
      "name": "Mouse Logitech B100",
      "image_url": "https://www.jakartanotebook.com/images/products/40/67/7435/2/logitech-wired-mouse-b100-black-3.jpg",
      "price": 70000,
      "stock": 4,
      "CategoryId": 1,
      "createdAt": "2021-01-18T03:46:59.661Z",
      "updatedAt": "2021-01-18T03:46:59.661Z",
      "Category": {
        "id": 1,
        "name": "Mouse",
        "image": "mouse",
        "createdAt": "2021-01-18T03:46:59.657Z",
        "updatedAt": "2021-01-18T03:46:59.657Z"
      }
    },
    {
      "id": 3,
      "name": "Printer Epson L3110",
      "image_url": "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//106/MTA-2669479/epson_epson-l3110-ecotank-multifungsi-printer--print--scan--copy-_full05.jpg",
      "price": 2500000,
      "stock": 7,
      "CategoryId": 2,
      "createdAt": "2021-01-18T03:46:59.661Z",
      "updatedAt": "2021-01-18T03:46:59.661Z",
      "Category": {
        "id": 2,
        "name": "Printer",
        "image": "print",
        "createdAt": "2021-01-18T03:46:59.657Z",
        "updatedAt": "2021-01-18T03:46:59.657Z"
      }
    },
    {
      "id": 4,
      "name": "Aspire 3 A314-32",
      "image_url": "https://www.jakartanotebook.com/images/products/1/3/48030/2/acer-aspire-3-a314-32-c2uy-laptop-intel-n4120-4gb-1tb-14-inch-windows-10-black-1.jpg",
      "price": 4999999,
      "stock": 10,
      "CategoryId": 3,
      "createdAt": "2021-01-18T03:46:59.661Z",
      "updatedAt": "2021-01-18T03:46:59.661Z",
      "Category": {
        "id": 3,
        "name": "Laptop",
        "image": "laptop",
        "createdAt": "2021-01-18T03:46:59.657Z",
        "updatedAt": "2021-01-18T03:46:59.657Z"
      }
    }
  ]
}  

```

- status: 401
- body:

```json
{
  "message": "Please Login First"
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal Server Error"
}
```

### GET /products/:id

description: 
  get product which is selected by user

Request:

- headers: access_token (string) [for CMS only]
- params: id (integer)

Response:

- status: 200
- body:

```json
{
  "products": [
    {
      "id": 1,
      "name": "Keyboard Logitech K380",
      "image_url": "https://www.jakartanotebook.com/images/products/41/67/17659/2/logitech-multi-device-bluetooth-keyboard-k380-black-7.jpg",
      "price": 100000,
      "stock": 5,
      "CategoryId": 4,
      "createdAt": "2021-01-18T03:46:59.661Z",
      "updatedAt": "2021-01-18T03:46:59.661Z",
      "Category": {
        "id": 4,
        "name": "Keyboard",
        "image": "keyboard",
        "createdAt": "2021-01-18T03:46:59.657Z",
        "updatedAt": "2021-01-18T03:46:59.657Z"
      }
    }
  ]
} 
```

- status: 401
- body:

```json
{
  "message": "Please Login First"
}
```
- status: 404
- body:

```json
{
  "message": "Error Not Found"
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal Server Error"
}
```

### POST /products

description: 
  Create product which is made by admin from input form

Request:

- headers: access_token (string)
- body:

```json
{
    "name": "string",
    "image_url": "string",
    "price": "integer",
    "stock": "integer",
    "CategoryId": "integer"
}
```

Response:

- status: 200
- body:

```json
{
  "products": [
    {
      "id": 4,
      "name": "Aspire 3 A314-32",
      "image_url": "https://www.jakartanotebook.com/images/products/1/3/48030/2/acer-aspire-3-a314-32-c2uy-laptop-intel-n4120-4gb-1tb-14-inch-windows-10-black-1.jpg",
      "price": 4999999,
      "stock": 10,
      "CategoryId": 3,
      "createdAt": "2021-01-18T03:46:59.661Z",
      "updatedAt": "2021-01-18T03:46:59.661Z"
    }
  ]
} 
```

- status: 400
- body:
  ​
```json
{
  "message": [
    "Product Name is Required",
    "Price Must Be a Number",
    "Minimum Price is Rp. 1,-",
    "Stock Must Be a Number",
    "Minimum Stock is 0",
    "Product Category is Required"
  ]
}
```

- status: 401
- body:

```json
{
  "message": "Please Login First"
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal Server Error"
}
```

### PUT /products/:id

description: 
  Update product which is edited by admin

Request:

- headers: access_token (string)
- params: id (integer)
- body:

```json
{
   "name": "string",
   "image_url": "string",
   "price": "integer",
   "stock": "integer",
   "CategoryId": "integer"
}
```

Response:

- status: 200
- body:

```json
{
  "products": [
    {
      "id": 4,
      "name": "Aspire 3 A314-32",
      "image_url": "https://www.jakartanotebook.com/images/products/1/3/48030/2/acer-aspire-3-a314-32-c2uy-laptop-intel-n4120-4gb-1tb-14-inch-windows-10-black-1.jpg",
      "price": 4999999,
      "stock": 10,
      "CategoryId": 3,
      "createdAt": "2021-01-18T03:46:59.661Z",
      "updatedAt": "2021-01-18T03:46:59.661Z"
    }
  ]
}
```

- status: 400
- body:
  ​
```json
{
  "message": [
    "Product Name is Required",
    "Price Must Be a Number",
    "Minimum Price is Rp. 1,-",
    "Stock Must Be a Number",
    "Minimum Stock is 0",
    "Product Category is Required"
  ]
}
```

- status: 401
- body:

```json
{
  "message": "Please Login First"
}
```

- status: 404
- body:

```json
{
  "message": "Error Not Found"
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal Server Error"
}
```

### DELETE /products/:id

description: 
  Delete product which is selected by admin

Request:

- headers: access_token (string)
- params: id (integer)

Response:

- status: 200
- body:

```json
{
    "message": "Product is Deleted"
}
```

- status: 401
- body:

```json
{
  "message": "Please Login First"
}
```
- status: 404
- body:

```json
{
  "message": "Error Not Found"
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal Server Error"
}
```

### GET /categories

description: 
  get list of all categories

Request:

- headers: access_token (string) [For CMS only]

Response:

- status: 200
- body:

```json
{
  "categories": [
    {
      "id": 1,
      "name": "Mouse",
      "image": "mouse",
      "createdAt": "2021-01-18T03:46:59.657Z",
      "updatedAt": "2021-01-18T03:46:59.657Z"
    },
    {
      "id": 2,
      "name": "Printer",
      "image": "print",
      "createdAt": "2021-01-18T03:46:59.657Z",
      "updatedAt": "2021-01-18T03:46:59.657Z"
    },
    {
      "id": 3,
      "name": "Laptop",
      "image": "laptop",
      "createdAt": "2021-01-18T03:46:59.657Z",
      "updatedAt": "2021-01-18T03:46:59.657Z"
    },
    {
      "id": 4,
      "name": "Keyboard",
      "image": "keyboard",
      "createdAt": "2021-01-18T03:46:59.657Z",
      "updatedAt": "2021-01-18T03:46:59.657Z"
    }
  ]
}  

```

- status: 500
- body:
  ​

```json
{
  "message": "Internal Server Error"
}
```

### GET /categories/:id

description: 
  get category which is selected by user

Request:

- headers: access_token (string) [For CMS only]
- params: id (integer)

Response:

- status: 200
- body:

```json
{
  "categories": [
    {
      "id": 1,
      "name": "Mouse",
      "image": "mouse",
      "createdAt": "2021-01-18T03:46:59.657Z",
      "updatedAt": "2021-01-18T03:46:59.657Z"
    }
  ]
} 
```

- status: 404
- body:

```json
{
  "message": "Error Not Found"
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal Server Error"
}
```

### POST /categories

description: 
  Create category which is made by admin from input form

Request:

- headers: access_token (string)
- body:

```json
{
    "name": "string",
    "image": "string"
}
```

Response:

- status: 200
- body:

```json
{
  "categories": [
    {
      "id": 4,
      "name": "Keyboard",
      "image": "keyboard",
      "createdAt": "2021-01-18T03:46:59.657Z",
      "updatedAt": "2021-01-18T03:46:59.657Z"
    }
  ]
} 
```

- status: 400
- body:
  ​
```json
{
  "message": "Category Name is Required"
}
```

- status: 401
- body:

```json
{
  "message": "Please Login First"
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal Server Error"
}
```

### PUT /categories/:id

description: 
  Update category which is edited by admin

Request:

- headers: access_token (string)
- params: id (integer)
- body:

```json
{
    "name": "string",
    "image": "string"
}
```

Response:

- status: 200
- body:

```json
{
  "categories": [
    {
      "id": 4,
      "name": "Keyboard",
      "image": "keyboard",
      "createdAt": "2021-01-18T03:46:59.657Z",
      "updatedAt": "2021-01-18T03:46:59.657Z"
    }
  ]
}
```

- status: 400
- body:
  ​
```json
{
  "message": "Category Name is Required"
}
```

- status: 401
- body:

```json
{
  "message": "Please Login First"
}
```

- status: 404
- body:

```json
{
  "message": "Error Not Found"
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal Server Error"
}
```

### DELETE /categories/:id

description: 
  Delete category which is selected by admin

Request:

- headers: access_token (string)
- params: id (integer)

Response:

- status: 200
- body:

```json
{
    "message": "Category is Deleted"
}
```

- status: 401
- body:

```json
{
  "message": "Please Login First"
}
```
- status: 404
- body:

```json
{
  "message": "Error Not Found"
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal Server Error"
}
```

### GET /banners

description: 
  get list of all banners

Request:

- headers: access_token (string) [For CMS only]

Response:

- status: 200
- body:

```json
{
  "banners": [
    {
      "id": 1,
      "title": "PC Components",
      "status": true,
      "image_url": "https://www.ohc.co.nz/wp-content/uploads/2018/12/Computer-Service-Banner-sml.png",
      "createdAt": "2021-01-18T03:46:59.657Z",
      "updatedAt": "2021-01-18T03:46:59.657Z"
    },
    {
      "id": 2,
      "name": "Headset",
      "status": true,
      "image_url": "https://north-america.beyerdynamic.com/media/catalog/category/beyerdynamic-Katalogbanner-Amiron-Copper-ohne-bubble.jpg",
      "createdAt": "2021-01-18T03:46:59.657Z",
      "updatedAt": "2021-01-18T03:46:59.657Z"
    },
    {
      "id": 3,
      "name": "Desktop PC",
      "status": true,
      "image_url": "https://nextshop.pk/wp-content/uploads/2018/08/New-Refurbished-Banner.jpg",
      "createdAt": "2021-01-18T03:46:59.657Z",
      "updatedAt": "2021-01-18T03:46:59.657Z"
    }
  ]
}  

```

- status: 500
- body:
  ​

```json
{
  "message": "Internal Server Error"
}
```

### GET /banners/:id

description: 
  get banner which is selected by user

Request:

- headers: access_token (string) [For CMS only]
- params: id (integer)

Response:

- status: 200
- body:

```json
{
  "banners": [
    {
      "id": 1,
      "title": "PC Components",
      "status": true,
      "image_url": "https://www.ohc.co.nz/wp-content/uploads/2018/12/Computer-Service-Banner-sml.png",
      "createdAt": "2021-01-18T03:46:59.657Z",
      "updatedAt": "2021-01-18T03:46:59.657Z"
    }
  ]
} 
```

- status: 404
- body:

```json
{
  "message": "Error Not Found"
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal Server Error"
}
```

### POST /banners

description: 
  Create banner which is made by admin from input form

Request:

- headers: access_token (string)
- body:

```json
{
    "title": "string",
    "status": "boolean",
    "image_url": "string"
}
```

Response:

- status: 200
- body:

```json
{
  "banners": [
    {
      "id": 3,
      "name": "Desktop PC",
      "status": true,
      "image_url": "https://nextshop.pk/wp-content/uploads/2018/08/New-Refurbished-Banner.jpg",
      "createdAt": "2021-01-18T03:46:59.657Z",
      "updatedAt": "2021-01-18T03:46:59.657Z"
    }
  ]
} 
```

- status: 400
- body:
  ​
```json
{
  "message": [
    "Status is Required",
    "Status Must Be Boolean"
  ]
}
```

- status: 401
- body:

```json
{
  "message": "Please Login First"
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal Server Error"
}
```

### PUT /banners/:id

description: 
  Update banner which is edited by admin

Request:

- headers: access_token (string)
- params: id (integer)
- body:

```json
{
    "title": "string",
    "status": "boolean",
    "image_url": "string"
}
```

Response:

- status: 200
- body:

```json
{
  "banners": [
    {
      "id": 3,
      "name": "Desktop PC",
      "status": true,
      "image_url": "https://nextshop.pk/wp-content/uploads/2018/08/New-Refurbished-Banner.jpg",
      "createdAt": "2021-01-18T03:46:59.657Z",
      "updatedAt": "2021-01-18T03:46:59.657Z"
    }
  ]
}
```

- status: 400
- body:
  ​
```json
{
  "message": [
    "Status is Required",
    "Status Must Be Boolean"
  ]
}
```

- status: 401
- body:

```json
{
  "message": "Please Login First"
}
```

- status: 404
- body:

```json
{
  "message": "Error Not Found"
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal Server Error"
}
```

### DELETE /banners/:id

description: 
  Delete banner which is selected by admin

Request:

- headers: access_token (string)
- params: id (integer)

Response:

- status: 200
- body:

```json
{
    "message": "Category is Deleted"
}
```

- status: 401
- body:

```json
{
  "message": "Please Login First"
}
```
- status: 404
- body:

```json
{
  "message": "Error Not Found"
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal Server Error"
}
```

### GET /transaction

description: 
  get list of all uncompleted transactions.

Request:

- headers: access_token (string) 

Response:

- status: 200
- body:

```json
{
  "transaction": {
    "id": 1,
    "status": "uncompleted",
    "UserId": 2,
    "history": null,
    "total": 0,
    "createdAt": "2021-01-27T04:56:54.694Z",
    "updatedAt": "2021-01-27T04:56:54.694Z",
    "Products": [
      {
        "id": 1,
        "name": "Keyboard Logitech K380",
        "image_url": "https://www.jakartanotebook.com/images/products/41/67/17659/2/logitech-multi-device-bluetooth-keyboard-k380-black-7.jpg",
        "price": 100000,
        "stock": 5,
        "CategoryId": 4,
        "createdAt": "2021-01-18T03:46:59.657Z",
        "updatedAt": "2021-01-18T03:46:59.657Z",
        "Cart": {
          "id": 1,
          "TransactionId": 1,
          "ProductId": 1,
          "quantity": 2,
          "total": 200000,
          "createdAt": "2021-01-27T05:17:55.894Z",
          "updatedAt": "2021-01-27T05:18:11.953Z"
        }
      }
    ]
  }
}  

```

- status: 401
- body:

```json
{
  "message": "Please Login First"
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal Server Error"
}
```

### GET /history

description: 
  get list of all completed transactions.

Request:

- headers: access_token (string) 

Response:

- status: 200
- body:

```json
{
  "transaction": {
    "id": 1,
    "status": "completed",
    "UserId": 2,
    "history": "1 Keyboard Logitech K380 2 100000" ,
    "total": 200000,
    "createdAt": "2021-01-27T04:56:54.694Z",
    "updatedAt": "2021-01-27T04:58:04.694Z",
    "Products": [
      {
        "id": 1,
        "name": "Keyboard Logitech K380",
        "image_url": "https://www.jakartanotebook.com/images/products/41/67/17659/2/logitech-multi-device-bluetooth-keyboard-k380-black-7.jpg",
        "price": 100000,
        "stock": 3,
        "CategoryId": 4,
        "createdAt": "2021-01-18T03:46:59.657Z",
        "updatedAt": "2021-01-27T04:58:14.657Z",
        "Cart": {
          "id": 1,
          "TransactionId": 1,
          "ProductId": 1,
          "quantity": 2,
          "total": 200000,
          "createdAt": "2021-01-27T05:17:55.894Z",
          "updatedAt": "2021-01-27T05:18:11.953Z"
        }
      }
    ]
  }
}  

```

- status: 401
- body:

```json
{
  "message": "Please Login First"
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal Server Error"
}
```

### PUT /transaction/:id

description: 
  Checkout current transaction

Request:

- headers: access_token (string)
- params: id (integer)

Response:

- status: 200
- body:

```json
{
  "message": "Checkout Successfully"
}
```

- status: 400
- body:
  ​
```json
{
  "message": [
    "Cannot Checkout Empty Cart",
    "Cannot Checkout If The Quantity is More Than Product(s) Stock"
  ]
}
```

- status: 401
- body:

```json
{
  "message": [
    "Please Login First",
    "Cannot Change Completed Transaction"
  ]
}
```

- status: 403
- body:

```json
{
  "message": [
    "Cannot Checkout Others Cart",
    "Cannot Change Others Transaction"
  ]
}
```

- status: 404
- body:

```json
{
  "message": "Error Not Found"
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal Server Error"
}
```

### DELETE /transaction/:id

description: 
  Clear the cart

Request:

- headers: access_token (string)
- params: id (integer)

Response:

- status: 200
- body:

```json
{
    "message": "Cart Has Been Cleared"
}
```

- status: 401
- body:

```json
{
  "message": [
    "Please Login First",
    "Cannot Change Others Transaction"
  ]
}
```

- status: 403
- body:

```json
{
  "message": "Cannot Change Others Transaction"
}
```

- status: 404
- body:

```json
{
  "message": "Error Not Found"
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal Server Error"
}
```

### POST /cart/:id

description: 
  Add product to cart

Request:

- headers: access_token (string)
- params: id (integer)

Response:

- status: 200
- body:

```json
{
  "cart": {
    "id": 1,
    "TransactionId": 1,
    "ProductId": 1,
    "quantity": 1,
    "total": 100000,
    "createdAt": "2021-01-27T05:17:55.894Z",
    "updatedAt": "2021-01-27T05:18:11.953Z"
  }
}
```

- status: 400
- body:
  ​
```json
{
  "message": "Cannot Add to Cart"
}
```

- status: 401
- body:

```json
{
  "message": "Please Login First"
}
```

- status: 404
- body:

```json
{
  "message": "Error Not Found"
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal Server Error"
}
```

### PUT /cart/:id

description: 
  Edit quantity of product in cart

Request:

- headers: access_token (string)
- params: id (integer)
- body:

```json
{
  "quantity": "integer"
}
```

Response:

- status: 200
- body:

```json
{
  "cart": {
    "id": 1,
    "TransactionId": 1,
    "ProductId": 1,
    "quantity": 2,
    "total": 200000,
    "createdAt": "2021-01-27T05:17:55.894Z",
    "updatedAt": "2021-01-27T05:22:53.347Z"
  }
}
```

- status: 400
- body:
  ​
```json
{
  "message": "Cannot Add to Cart"
}
```

- status: 401
- body:

```json
{
  "message": "Please Login First"
}
```

- status: 404
- body:

```json
{
  "message": "Error Not Found"
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal Server Error"
}
```

### DELETE /cart/:id

description: 
  Remove a product from cart

Request:

- headers: access_token (string)
- params: id (integer)

Response:

- status: 200
- body:

```json
{
  "message": "Product Has Been Removed From Cart"
}
```

- status: 401
- body:

```json
{
  "message": "Please Login First"
}
```

- status: 404
- body:

```json
{
  "message": "Error Not Found"
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal Server Error"
}
```

### GET /wishlists

description: 
  get list of wishlist.

Request:

- headers: access_token (string) 

Response:

- status: 200
- body:

```json
{
  "wishlist": {
    "id": 1,
    "UserId": 2,
    "ProductId": 2,
    "createdAt": "2021-01-27T04:58:54.694Z",
    "updatedAt": "2021-01-27T04:58:54.694Z",
    "Products": [
      {
        "id": 1,
        "name": "Keyboard Logitech K380",
        "image_url": "https://www.jakartanotebook.com/images/products/41/67/17659/2/logitech-multi-device-bluetooth-keyboard-k380-black-7.jpg",
        "price": 100000,
        "stock": 5,
        "CategoryId": 4,
        "createdAt": "2021-01-18T03:46:59.661Z",
        "updatedAt": "2021-01-18T03:46:59.661Z",
        "Category": {
          "id": 4,
          "name": "Keyboard",
          "image": "keyboard",
          "createdAt": "2021-01-18T03:46:59.657Z",
          "updatedAt": "2021-01-18T03:46:59.657Z"
        }
      }
    ]
  }
}  

```

- status: 401
- body:

```json
{
  "message": "Please Login First"
}
```

- status: 404
- body:

```json
{
  "message": "Error Not Found"
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal Server Error"
}
```

### POST /wishlists/:id

description: 
  Add product to wishlist

Request:

- headers: access_token (string)
- params: id (integer)

Response:

- status: 200
- body:

```json
{
  "wishlist": {
    "id": 1,
    "UserId": 2,
    "ProductId": 2,
    "createdAt": "2021-01-27T04:58:54.694Z",
    "updatedAt": "2021-01-27T04:58:54.694Z"
  }
}
```

- status: 400
- body:
  ​
```json
{
  "message": "Item is Already on The Wishlist"
}
```

- status: 401
- body:

```json
{
  "message": "Please Login First"
}
```

- status: 404
- body:

```json
{
  "message": "Error Not Found"
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal Server Error"
}
```

### DELETE /wishlists/:id

description: 
  Remove a product from wishlist

Request:

- headers: access_token (string)
- params: id (integer)

Response:

- status: 200
- body:

```json
{
  "message": "Product Has Been Removed From Wishlist"
}
```

- status: 401
- body:

```json
{
  "message": "Please Login First"
}
```

- status: 404
- body:

```json
{
  "message": "Error Not Found"
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal Server Error"
}
```


