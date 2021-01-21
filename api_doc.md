# E-commerce REST APIs Documentation

## Open Endpoints

* [Login](#login) : `POST /api/users/login/`

## Endpoints that require authentification and authorization

Closed endpoints require a Valid Token to be included in the header of the request and can only accessed by an Admin user. A Token can be acquired from the Login view above.

### Authentification Example

`in header request put:`

```json
{
  "access_token": "2jh3kjdbkqjh2kj3hkjncd23bnkd3981ndjka89h32jkkjnasdl"
}
```

### Error Response for Authentification Endpoints

**Condition** : If not provide valid `access_token` on header while request

**Code** : `401 UNAUTHORIZED`

**Content** :

```json
{
  "errors": [
    "Login first"
  ]
}
```


### Error Response for Authorization Endpoints

**Condition** : If request not from Admin user.

**Code** : `403 FORBIDDEN`

**Conten examples** :

```json
{
  "errors": [
    "Unauthorized"
  ]
}
```

## Product Related

* [Create Product](#create-a-product) : `POST /api/products/`
* [Show Products](#show-products) : `GET /api/products/`
* [Show a Product](#show-a-product) : `GET /api/products/:id`
* [Update a Product](#update-a-product) : `PUT /api/products/:id`
* [Delete a Product](#delete-a-product) : `DELETE /api/products/:id/`

## Banner Related

* [Create Banner](#create-a-banner) : `POST /api/banners/`
* [Show Banners](#show-banners) : `GET /api/banners/`
* [Show a Banner](#show-a-banner) : `GET /api/banners/:id`
* [Update a Banner](#update-a-banner) : `PUT /api/banners/:id`
* [Delete a Banner](#delete-a-banner) : `DELETE /api/banners/:id`

## Error Response because Server Error

**Condition** : Internal Server Error

**Code** : `500 INTERNAL SERVER ERROR`

**Content** :

```json
{
  "errors": [
    "INTERNAL SERVER ERROR"
  ]
}
```

# Login

Used to collect a Token for registered User.

**URL** : `/api/users/login/`

**Method** : `POST`

**Auth required** : `None`

**Permission required** : `None`

```json
{
  "email": "[valid email address; unique email]",
  "password": "[password in plain text; at least 6 characters]"
}
```

**Data examples** All fields must be sent

```json
{
  "email": "admin@mail.com",
  "password": "1234"
}
```

## Success Response

**Code** : `200 OK`

**Content examples** :

```json
{
  "access_token": "2jh3kjdbkqjh2kj3hkjncd23bnkd3981ndjka89h32jkkjnasdl"
}
```

## Error Response

**Condition** : If Account does not exits.

**Code** : `400 BAD REQUEST`

**Content examples** :

```json
{
  "errors": [
    "Email does not exist"
  ]
}
```

### Or

**Condition** : If email field is missed

**Code** : `400 BAD REQUEST`

**Content examples** :

```json
{
  "errors": [
    "Email is required"
  ]
}
```

### Or

**Condition** : If email fields not filled with valid email address.

**Code** : `400 BAD REQUEST`

**Content examples** :

```json
{
  "errors": [
    "Email must be valid email address"
  ]
}
```

### Or

**Condition** : If password is wrong.

**Code** : `400 BAD REQUEST`

**Content examples** :

```json
{
  "errors": [
    "Wrong password"
  ]
}
```

### Or

**Condition** : If password field is missed.

**Code** : `400 BAD REQUEST`

**Content examples** :

```json
{
  "errors": [
    "Password is required"
  ]
}
```

### Or

**Condition** : If password length less than 6 characters.

**Code** : `400 BAD REQUEST`

**Content examples** :

```json
{
  "errors": [
    "Password at least 6 characters"
  ]
}
```

# Create a Product

**URL**: `/api/products/`

**Method** : `POST`

**Auth required** : `YES`

**Permission required** : `YES`

**Dta constraints** :

```json
{
  "name": "[string]",
  "image_url": "[url in string]",
  "price": "[number]",
  "stock": "[number]",
  "category": "[string]"
}
```

**Data examples** All fields must be sent

```json
{
  "name": "Perahu Karet Rescue BlueLines 100% Original Produk",
  "image_url": "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTpj1u7h60ZB6Z4HlTY97_6GwCwmAkGtBCG3Ji7cOMmwOIUntqGR_MTKKdDdC6XjvK8icy5s_YfEDqI7s2oh-kL8-73ZjcD7NccidUzWotI&usqp=CAE",
  "price": "32700000",
  "stock": "100",
  "category": "Olahraga Outdoor"
}
```

## Success Response

**Code** : `201 CREATED`

**Content examples** :

```json
{
  "id": "1",
  "name": "Perahu Karet Rescue BlueLines 100% Original Produk",
  "image_url": "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTpj1u7h60ZB6Z4HlTY97_6GwCwmAkGtBCG3Ji7cOMmwOIUntqGR_MTKKdDdC6XjvK8icy5s_YfEDqI7s2oh-kL8-73ZjcD7NccidUzWotI&usqp=CAE",
  "price": "32700000",
  "stock": "100",
  "category": "Olahraga Outdoor"
}
```

## Error Response

**Condition** : If name field is missed.

**Code** : `400 BAD REQUEST`

**Content examples** :

```json
{
  "errors": [
    "Name is required"
  ]
}
```

### Or

**Condition** : If image url field is missed.

**Code** : `400 BAD REQUEST`

**Content examples** :

```json
{
  "errors": [
    "Image url field is required"
  ]
}
```

### Or

**Condition** : If price field is missed.

**Code** : `400 BAD REQUEST`

**Content examples** :

```json
{
  "errors": [
    "Price is required"
  ]
}
```

### Or

**Condition** : If stock field is missed.

**Code** : `400 BAD REQUEST`

**Content examples** :

```json
{
  "errors": [
    "Stock is required"
  ]
}
```

### Or

**Condition** : If category field is missed.

**Code** : `400 BAD REQUEST`

**Content examples** :

```json
{
  "errors": [
    "Category is required"
  ]
}
```

# Show Products 

**URL** : `/api/products/`

**Method** : `GET`

**Auth required** : `YES`

**Permission required** : `YES`

## Success Response

**Code** : `200 OK`

**Content examples** :

```json
[
  {
    "id": "1",
    "name": "Perahu Karet Rescue BlueLines 100% Original Produk",
    "image_url": "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTpj1u7h60ZB6Z4HlTY97_6GwCwmAkGtBCG3Ji7cOMmwOIUntqGR_MTKKdDdC6XjvK8icy5s_YfEDqI7s2oh-kL8-73ZjcD7NccidUzWotI&usqp=CAE",
    "price": "32700000",
    "stock": "100",
    "category": "Olahraga Outdoor"
  }
]
```

# Show a Product

**URL** : `/api/products/:id`

**Method** : `GET`

**Auth required** : `YES`

**Permission required** : `YES`

## Success Response

**Code** : `200 OK`

**Content examples** :

```json
{
  "id": "1",
  "name": "Perahu Karet Rescue BlueLines 100% Original Produk",
  "image_url": "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTpj1u7h60ZB6Z4HlTY97_6GwCwmAkGtBCG3Ji7cOMmwOIUntqGR_MTKKdDdC6XjvK8icy5s_YfEDqI7s2oh-kL8-73ZjcD7NccidUzWotI&usqp=CAE",
  "price": "32700000",
  "stock": "100",
  "category": "Olahraga Outdoor"
}
```

# Update a Product

**URL** : `/api/products/:id`

**Method** : `PUT`

**Auth required** : `YES`

**Permission required**: `YES`

**Data constraints** :

```json
{
  "name": "[string]",
  "image_url": "[url in string]",
  "price": "[number]",
  "stock": "[number]",
  "category": "[string]"
}
```

**Data examples** Partial data is allowed.

```json
{
  "name": "Perahu Karet Rescue BlueLines 100% Original Produk",
  "image_url": "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTpj1u7h60ZB6Z4HlTY97_6GwCwmAkGtBCG3Ji7cOMmwOIUntqGR_MTKKdDdC6XjvK8icy5s_YfEDqI7s2oh-kL8-73ZjcD7NccidUzWotI&usqp=CAE",
  "price": "3270000",
  "stock": "1000",
  "category": "Olahraga Outdoor"
}
```

## Succress Response

**Condition** : Update can be performed either fully or partially by an Admin.

**Code** : `200 OK`

**Content examples** : For the example above,when the `price` and `stock` is updated and posted to `/api/products/1` ...

```json
{
  "id": "1",
  "name": "Perahu Karet Rescue BlueLines 100% Original Produk",
  "image_url": "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTpj1u7h60ZB6Z4HlTY97_6GwCwmAkGtBCG3Ji7cOMmwOIUntqGR_MTKKdDdC6XjvK8icy5s_YfEDqI7s2oh-kL8-73ZjcD7NccidUzWotI&usqp=CAE",
  "price": "3270000",
  "stock": "1000",
  "category": "Olahraga Outdoor"
}
```

## Error Response

**Condition** : Product does not exist

**Code** : `400 BAD REQUEST`

**Content examples** :

```json
{
  "errors": [
    "Product does not exist"
  ]
}
```

# Delete a Product

**URL** : `/api/products/:id`

**Methode** : `DELETE`

**Auth required** : `YES`

**Permission required** : `YES`

## Success Response

**Code** : `200 OK`

**Content examples** :

```json
{
  "Product named: 'Perahu Karet Rescue BlueLines 100% Original Produk' success to delete"
}
```

## Error Response

**Condition** : Product does not exist.

**Code** : `400 BAD REQUEST`

**Content examples** :

```json
{
  "errors": [
    "Product does not exist"
  ]
}
```

# Create a Banner

**URL**: `/api/banners/`

**Method** : `POST`

**Auth required** : `YES`

**Permission required** : `YES`

**Dta constraints** :

```json
{
  "title": "[string]",
  "status": "[string]",
  "image_url": "[url in string]"
}
```

**Data examples** All fields must be sent

```json
{
  "title": "Tenda BNPB",
  "status": "diskon",
  "image_url": "https://www.tenda.news/wp-content/uploads/2019/09/tenda-bnpb.jpg"
}
```

## Success Response

**Code** : `201 CREATED`

**Content examples** :

```json
{
  "id": "1",
  "title": "Tenda BNPB",
  "status": "diskon",
  "image_url": "https://www.tenda.news/wp-content/uploads/2019/09/tenda-bnpb.jpg"
}
```

## Error Response

**Condition** : If title field is missed.

**Code** : `400 BAD REQUEST`

**Content examples** :

```json
{
  "errors": [
    "Title is required"
  ]
}
```

### Or

**Condition** : If status field is missed.

**Code** : `400 BAD REQUEST`

**Content examples** :

```json
{
  "errors": [
    "Status is required"
  ]
}
```

### Or

**Condition** : If image url field is missed.

**Code** : `400 BAD REQUEST`

**Content examples** :

```json
{
  "errors": [
    "Image url field is required"
  ]
}
```

# Show Banners

**URL** : `/api/banners/`

**Method** : `GET`

**Auth required** : `YES`

**Permission required** : `YES`

## Success Response

**Code** : `200 OK`

**Content examples** :

```json
[
  {
    "id": "1",
    "title": "Tenda BNPB",
    "status": "diskon",
    "image_url": "https://www.tenda.news/wp-content/uploads/2019/09/tenda-bnpb.jpg"
  }
]
```

# Show a Banner

**URL** : `/api/banners/:id`

**Method** : `GET`

**Auth required** : `YES`

**Permission required** : `YES`

## Success Response

**Code** : `200 OK`

**Content examples** :

```json
{
  "id": "1",
  "title": "Tenda BNPB",
  "status": "diskon",
  "image_url": "https://www.tenda.news/wp-content/uploads/2019/09/tenda-bnpb.jpg"
}
```

# Update a Banner

**URL** : `/api/banners/:id`

**Method** : `PUT`

**Auth required** : `YES`

**Permission required**: `YES`

**Data constraints** :

```json
{
  "name": "[string]",
  "status": "[string]",
  "image_url": "[url in string]"
}
```

**Data examples** Partial data is allowed.

```json
{
  "title": "Diskon! Tenda BNPB",
  "status": "diskon",
  "image_url": "https://www.tenda.news/wp-content/uploads/2019/09/tenda-bnpb.jpg"
}
```

## Succress Response

**Condition** : Update can be performed either fully or partially by an Admin.

**Code** : `200 OK`

**Content examples** : For the example above,when the `price` and `stock` is updated and posted to `/api/banners/1` ...

```json
{
  "id": "1",
  "title": "Diskon! Tenda BNPB",
  "status": "diskon",
  "image_url": "https://www.tenda.news/wp-content/uploads/2019/09/tenda-bnpb.jpg"
}
```

## Error Response

**Condition** : Banner does not exist

**Code** : `400 BAD REQUEST`

**Content examples** :

```json
{
  "errors": [
    "Banner does not exist"
  ]
}
```

# Delete a Banner

**URL** : `/api/banners/:id`

**Methode** : `DELETE`

**Auth required** : `YES`

**Permission required** : `YES`

## Success Response

**Code** : `200 OK`

**Content examples** :

```json
{
  "Banner titled: 'Diskon! Tenda BNPB' success to delete"
}
```

## Error Response

**Condition** : Banner does not exist.

**Code** : `400 BAD REQUEST`

**Content examples** :

```json
{
  "errors": [
    "Banner does not exist"
  ]
}
```
