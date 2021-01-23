# ecommerce-server
Server for "AnTz Shop" e-commerce CMS app, created using node.js, express, sequelize, postgres.


## URL:
https://______________________________



## List of available endpoints:

- `POST /login/admin`
- `GET /products`
- `GET /products/:id`
- `POST /products`
- `PUT /products/:id`
- `DELETE /products/:id`


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
  "message": [
    "Wrong Email or Password"
  ]
}
```

- status: 403
- body:
  ​

```json
{
  "message": [
    "You Don't Have Access To This Panel"
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

### GET /products

description: 
  get list of all products

Request:

- headers: access_token (string) 

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
  get product which is selected by admin

Request:

- headers: access_token (string)
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
