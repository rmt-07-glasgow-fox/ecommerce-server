**Ecommerce cms server**
----
  Ecommerce cms server is an application to manage your product list. this app has:
  - RESTful endpoint for product's CRUD opration
  - JSON formatted response

&nbsp;

# RESTful endpoints

## _Auth Endpoint_
- `POST /register`
- `POST /login`

**Register**
----
  create user into server

* **URL**

  /register

* **Method**

  `POST`

* **Request Body**

  ```
  {
    "email": "rafli@gmail.com",
    "password": "123123123"
  }
  ```

* **Success Response:** <br />
  **Code:** 201 <br />
  **Content:**
  ```
  {
    "id": 2,
    "email": "rafli@gmail.com"
  }
  ```

* **Failed Response:** <br />
  **Code:** 400 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "name": "SequelizeValidationError",
    "message": [
        "email not valid",
        "email must be filled",
        "password must be filled",
        "password atleast 4 character"
    ]
  }
  ```
  **Code:** 500 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "error": <internal server error>
  }
  ```

**Login**
----
  login into server

* **URL**

  /login

* **Method**

  `POST`

* **Request Body**

  ```
  {
    "email": "rafli@gmail.com",
    "password": "123123123"
  }
  ```

* **Success Response:** <br />
  **Code:** 200 <br />
  **Content:**
  ```
  {
    "id": 2,
    "email": "rafli@gmail.com",
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJyYWZsaUBnbWFpbC5jb20iLCJyb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MTEzNjMyMTl9.SHpPAK0KlW-JeDzkaKBxzbgIL-fI9u5ve8IPReP_ERs"
  }
  ```

* **Failed Response:** <br />
  **Code:** 400 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "name": "SequelizeValidationError",
    "message": [
        "password atleast 6 character",
        "password must be filled"
    ]
  }
  ```
  **Code:** 401 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "name": "ErrorLogin",
    "message": "wrong email / password"
  }
  ```
  **Code:** 500 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "error": <internal server error>
  }
  ```
  <br/>

## _Product Endpoint_
- `POST /products`
- `GET /products`
- `GET /products/:id`
- `PUT /products/:id`
- `DELETE /products/:id`

**Create product**
----
  Create product into server

* **URL**

  /products

* **Method**

  `POST`

* **Request Body**

  ```
  {
    "name": "Xiaomi Redmi note 8 pro",
    "price": 2100000,
    "stock": 10,
    "image_url": "https://cdn.idntimes.com/content-images/community/2019/11/ejziz-sxyaa665x-a87937ecd17a7854c4b073350b97e823_600x400.jpg",
    "CategoryId" : 1
  }
  ```

* **Request Headers**

  ```
  {
    access_token : <your access_token>
  }
  ```

* **Success Response:** <br />
  **Code:** 201 <br />
  **Content:**
  ```
  {
    "id": 2,
    "name": "Xiaomi Redmi note 8 pro",
    "image_url": "https://cdn.idntimes.com/content-images/community/2019/11/ejziz-sxyaa665x-a87937ecd17a7854c4b073350b97e823_600x400.jpg",
    "price": 210000,
    "stock": 10,
    "UserId": 1,
    "CategoryId": 1,
    "updatedAt": "2021-01-23T01:03:30.815Z",
    "createdAt": "2021-01-23T01:03:30.815Z"
  }
  ```

* **Failed Response:** <br />
  **Code:** 400 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "name": "SequelizeValidationError",
    "message": [
        "price must be more then equal 0",
        "stock must be more then equal 0",
        "name must be filled",
        "image_url must be filled"
    ]
  }
  ```
  **Code:** 401 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "name": "ErrorAuthenticate",
    "message": "you need to login first"
  }
  ```
  **Code:** 403 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "name": "ErrorAccessToken",
    "message": "Jwt needed"
  }
  ```
  **Code:** 403 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "name": "ErrorAuthorize",
    "message": "you dont have access"
  }
  ```
  **Code:** 500 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "error": <internal server error>
  }
  ```

**Read product**
----
  Read product from server

* **URL**

  /products

* **Method**

  `GET`

* **Request Headers**

  ```
  not needed
  ```

* **Success Response:** <br />
  **Code:** 200 <br />
  **Content:**
  ```
  [
    {
        "id": 1,
        "name": "Xiaomi Redmi note 8 pro",
        "image_url": "https://cdn.idntimes.com/content-images/community/2019/11/ejziz-sxyaa665x-a87937ecd17a7854c4b073350b97e823_600x400.jpg",
        "price": 210000,
        "stock": 10,
        "UserId": 1,
        "CategoryId": null,
        "createdAt": "2021-01-23T01:02:42.606Z",
        "updatedAt": "2021-01-23T01:02:42.606Z",
        "User": {
            "id": 1,
            "email": "admin@mail.com",
            "password": "$2a$10$th/4SGps1EIjsloyocyNiOCTpN/LhVCfVxgvX2rDbfqtlOKc8F4zm",
            "role": "admin",
            "createdAt": "2021-01-23T00:45:31.212Z",
            "updatedAt": "2021-01-23T00:45:31.212Z"
        },
        "Category": null
    },
    {
        "id": 2,
        "name": "Xiaomi Redmi note 8 pro",
        "image_url": "https://cdn.idntimes.com/content-images/community/2019/11/ejziz-sxyaa665x-a87937ecd17a7854c4b073350b97e823_600x400.jpg",
        "price": 210000,
        "stock": 10,
        "UserId": 1,
        "CategoryId": 1,
        "createdAt": "2021-01-23T01:03:30.815Z",
        "updatedAt": "2021-01-23T01:03:30.815Z",
        "User": {
            "id": 1,
            "email": "admin@mail.com",
            "password": "$2a$10$th/4SGps1EIjsloyocyNiOCTpN/LhVCfVxgvX2rDbfqtlOKc8F4zm",
            "role": "admin",
            "createdAt": "2021-01-23T00:45:31.212Z",
            "updatedAt": "2021-01-23T00:45:31.212Z"
        },
        "Category": {
            "id": 1,
            "name": "other",
            "UserId": null,
            "createdAt": "2021-01-23T00:45:31.222Z",
            "updatedAt": "2021-01-23T00:45:31.222Z"
        }
    }
  ]
  ```

* **Failed Response:** <br />
  **Code:** 500 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "error": <internal server error>
  }
  ```

**Read product by id**
----
  Read product from server

* **URL**

  /products/:id

* **Method**

  `GET`

* **Request Headers**

  ```
  not needed
  ```

* **Success Response:** <br />
  **Code:** 200 <br />
  **Content:**
  ```
  {
    "id": 2,
    "name": "Xiaomi Redmi note 8 pro",
    "image_url": "https://cdn.idntimes.com/content-images/community/2019/11/ejziz-sxyaa665x-a87937ecd17a7854c4b073350b97e823_600x400.jpg",
    "price": 210000,
    "stock": 10,
    "UserId": 1,
    "CategoryId": 1,
    "createdAt": "2021-01-23T01:03:30.815Z",
    "updatedAt": "2021-01-23T01:03:30.815Z",
    "User": {
        "id": 1,
        "email": "admin@mail.com",
        "password": "$2a$10$th/4SGps1EIjsloyocyNiOCTpN/LhVCfVxgvX2rDbfqtlOKc8F4zm",
        "role": "admin",
        "createdAt": "2021-01-23T00:45:31.212Z",
        "updatedAt": "2021-01-23T00:45:31.212Z"
    }
  }
  ```

* **Failed Response:** <br />
  **Code:** 404 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "name": "ErrorNotFound",
    "message": "not found"
  }
  ```
  **Code:** 500 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "error": <internal server error>
  }
  ```

**Edit product**
----

* **URL**

  /products/:id

* **Method**

  `PUT`

* **Request Body**

  ```
  {
    "name": "Xiaomi",
    "price": 2100000,
    "stock": 10,
    "image_url": "https://cdn.idntimes.com/content-images/community/2019/11/ejziz-sxyaa665x-a87937ecd17a7854c4b073350b97e823_600x400.jpg",
    "CategoryId" : 1
  }
  ```

* **Request Headers**

  ```
  {
    access_token : <your access_token>
  }
  ```

* **Success Response:** <br />
  **Code:** 200 <br />
  **Content:**
  ```
  {
    "id": 1,
    "name": "Xiaomi",
    "image_url": "https://www.google.com/aclk?sa=l&ai=DChcSEwjr-8_88qTuAhUOlUsFHTQ6ATMYABAGGgJzZg&sig=AOD64_3MSRC6HcRRDNPzhqK3Q_rpcExcqQ&adurl&ctype=5&ved=2ahUKEwjmhLv88qTuAhXj3XMBHSaVBzIQvhd6BAgBEDM",
    "price": 210000,
    "stock": 10,
    "UserId": 1,
    "CategoryId": 1,
    "createdAt": "2021-01-23T01:02:42.606Z",
    "updatedAt": "2021-01-23T01:17:37.714Z"
  }
  ```

* **Failed Response:** <br />
  **Code:** 400 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "name": "SequelizeValidationError",
    "message": [
        "price must be more then equal 0",
        "stock must be more then equal 0",
        "name must be filled",
        "image_url must be filled"
    ]
  }
  ```
  **Code:** 401 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "name": "ErrorAuthenticate",
    "message": "you need to login first"
  }
  ```
  **Code:** 403 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "name": "ErrorAccessToken",
    "message": "Jwt needed"
  }
  ```
  **Code:** 403 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "name": "ErrorAuthorize",
    "message": "you dont have access"
  }
  ```
  **Code:** 404 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "name": "ErrorNotFound",
    "message": "not found"
  }
  ```
  **Code:** 500 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "error": <internal server error>
  }
  ```

**Delete product**
----

* **URL**

  /products/:id

* **Method**

  `DELETE`

* **Request Headers**

  ```
  {
    access_token : <your access_token>
  }
  ```

* **Success Response:** <br />
  **Code:** 200 <br />
  **Content:**
  ```
  {
    "message": "product deleted successfull"
  }
  ```

* **Failed Response:** <br />
  **Code:** 401 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "name": "ErrorAuthenticate",
    "message": "you need to login first"
  }
  ```
  **Code:** 403 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "name": "ErrorAccessToken",
    "message": "Jwt needed"
  }
  ```
  **Code:** 403 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "name": "ErrorAuthorize",
    "message": "you dont have access"
  }
  ```
  **Code:** 404 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "name": "ErrorNotFound",
    "message": "not found"
  }
  ```
  **Code:** 500 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "error": <internal server error>
  }
  ```

## _Banner Endpoint_
- `POST /banners`
- `GET /banners`
- `GET /banners/:id`
- `PUT /banners/:id`
- `DELETE /banners/:id`

**Create banner**
----
  Create banner into server

* **URL**

  /banners

* **Method**

  `POST`

* **Request Body**

  ```
  {
    "title": "discon shoes",
    "status": active,
    "image_url": "https://www.google.com/aclk?sa=l&ai=DChcSEwjr-8_88qTuAhUOlUsFHTQ6ATMYABAGGgJzZg&sig=AOD64_3MSRC6HcRRDNPzhqK3Q_rpcExcqQ&adurl&ctype=5&ved=2ahUKEwjmhLv88qTuAhXj3XMBHSaVBzIQvhd6BAgBEDM"
  }
  ```

* **Request Headers**

  ```
  {
    access_token : <your access_token>
  }
  ```

* **Success Response:** <br />
  **Code:** 201 <br />
  **Content:**
  ```
  {
    "id": 1,
    "title": "discon shoes",
    "status": "active",
    "image_url": "https://www.google.com/aclk?sa=l&ai=DChcSEwjr-8_88qTuAhUOlUsFHTQ6ATMYABAGGgJzZg&sig=AOD64_3MSRC6HcRRDNPzhqK3Q_rpcExcqQ&adurl&ctype=5&ved=2ahUKEwjmhLv88qTuAhXj3XMBHSaVBzIQvhd6BAgBEDM",
    "UserId": 1,
    "updatedAt": "2021-01-23T01:25:32.626Z",
    "createdAt": "2021-01-23T01:25:32.626Z"
  }
  ```

* **Failed Response:** <br />
  **Code:** 400 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "name": "SequelizeValidationError",
    "message": [
        "title must be filled",
        "image_url must be filled"
    ]
  }
  ```
  **Code:** 401 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "name": "ErrorAuthenticate",
    "message": "you need to login first"
  }
  ```
  **Code:** 403 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "name": "ErrorAccessToken",
    "message": "Jwt needed"
  }
  ```
  **Code:** 403 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "name": "ErrorAuthorize",
    "message": "you dont have access"
  }
  ```
  **Code:** 500 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "error": <internal server error>
  }
  ```

**Read banner**
----
  Read banner from server

* **URL**

  /banners

* **Method**

  `GET`

* **Request Headers**

  ```
  not needed
  ```

* **Success Response:** <br />
  **Code:** 200 <br />
  **Content:**
  ```
  [
    {
        "id": 1,
        "title": "discon shoes",
        "status": "active",
        "image_url": "https://www.google.com/aclk?sa=l&ai=DChcSEwjr-8_88qTuAhUOlUsFHTQ6ATMYABAGGgJzZg&sig=AOD64_3MSRC6HcRRDNPzhqK3Q_rpcExcqQ&adurl&ctype=5&ved=2ahUKEwjmhLv88qTuAhXj3XMBHSaVBzIQvhd6BAgBEDM",
        "UserId": 1,
        "createdAt": "2021-01-23T01:25:32.626Z",
        "updatedAt": "2021-01-23T01:25:32.626Z",
        "User": {
            "id": 1,
            "email": "admin@mail.com",
            "password": "$2a$10$th/4SGps1EIjsloyocyNiOCTpN/LhVCfVxgvX2rDbfqtlOKc8F4zm",
            "role": "admin",
            "createdAt": "2021-01-23T00:45:31.212Z",
            "updatedAt": "2021-01-23T00:45:31.212Z"
        }
    }
  ]
  ```

* **Failed Response:** <br />
  **Code:** 500 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "error": <internal server error>
  }
  ```

**Read banner by id**
----
  Read banner from server

* **URL**

  /banners/:id

* **Method**

  `GET`

* **Request Headers**

  ```
  not needed
  ```

* **Success Response:** <br />
  **Code:** 200 <br />
  **Content:**
  ```
  {
    "id": 1,
    "title": "discon shoes",
    "status": "active",
    "image_url": "https://www.google.com/aclk?sa=l&ai=DChcSEwjr-8_88qTuAhUOlUsFHTQ6ATMYABAGGgJzZg&sig=AOD64_3MSRC6HcRRDNPzhqK3Q_rpcExcqQ&adurl&ctype=5&ved=2ahUKEwjmhLv88qTuAhXj3XMBHSaVBzIQvhd6BAgBEDM",
    "UserId": 1,
    "createdAt": "2021-01-23T01:25:32.626Z",
    "updatedAt": "2021-01-23T01:25:32.626Z"
  }
  ```

* **Failed Response:** <br />
  **Code:** 404 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "name": "ErrorNotFound",
    "message": "not found"
  }
  ```
  **Code:** 500 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "error": <internal server error>
  }
  ```

**Edit banner**
----

* **URL**

  /banners/:id

* **Method**

  `PUT`

* **Request Body**

  ```
  {
    "title": "discon 50%",
    "status": inactive,
    "image_url": "https://www.google.com/aclk?sa=l&ai=DChcSEwjr-8_88qTuAhUOlUsFHTQ6ATMYABAGGgJzZg&sig=AOD64_3MSRC6HcRRDNPzhqK3Q_rpcExcqQ&adurl&ctype=5&ved=2ahUKEwjmhLv88qTuAhXj3XMBHSaVBzIQvhd6BAgBEDM"
  }
  ```

* **Request Headers**

  ```
  {
    access_token : <your access_token>
  }
  ```

* **Success Response:** <br />
  **Code:** 200 <br />
  **Content:**
  ```
  {
    "id": 1,
    "title": "discon 50%",
    "status": "inactive",
    "image_url": "https://www.google.com/aclk?sa=l&ai=DChcSEwjr-8_88qTuAhUOlUsFHTQ6ATMYABAGGgJzZg&sig=AOD64_3MSRC6HcRRDNPzhqK3Q_rpcExcqQ&adurl&ctype=5&ved=2ahUKEwjmhLv88qTuAhXj3XMBHSaVBzIQvhd6BAgBEDM",
    "UserId": 1,
    "createdAt": "2021-01-23T01:25:32.626Z",
    "updatedAt": "2021-01-23T01:29:36.087Z"
  }
  ```

* **Failed Response:** <br />
  **Code:** 400 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "name": "SequelizeValidationError",
    "message": [
        "title must be filled",
        "image_url must be filled"
    ]
  }
  ```
  **Code:** 401 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "name": "ErrorAuthenticate",
    "message": "you need to login first"
  }
  ```
  **Code:** 403 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "name": "ErrorAccessToken",
    "message": "Jwt needed"
  }
  ```
  **Code:** 403 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "name": "ErrorAuthorize",
    "message": "you dont have access"
  }
  ```
  **Code:** 404 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "name": "ErrorNotFound",
    "message": "not found"
  }
  ```
  **Code:** 500 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "error": <internal server error>
  }
  ```

**Delete banner**
----

* **URL**

  /banners/:id

* **Method**

  `DELETE`

* **Request Headers**

  ```
  {
    access_token : <your access_token>
  }
  ```

* **Success Response:** <br />
  **Code:** 200 <br />
  **Content:**
  ```
  {
    "message": "banner deleted successfully"
  }
  ```

* **Failed Response:** <br />
  **Code:** 401 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "name": "ErrorAuthenticate",
    "message": "you need to login first"
  }
  ```
  **Code:** 403 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "name": "ErrorAccessToken",
    "message": "Jwt needed"
  }
  ```
  **Code:** 403 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "name": "ErrorAuthorize",
    "message": "you dont have access"
  }
  ```
  **Code:** 404 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "name": "ErrorNotFound",
    "message": "not found"
  }
  ```
  **Code:** 500 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "error": <internal server error>
  }
  ```
  <br />

## _Category Endpoint_
- `POST /categories`
- `GET /categories`
- `GET /categories/:id`
- `PUT /categories/:id`
- `DELETE /categories/:id`

**Create category**
----
  Create category into server

* **URL**

  /categories

* **Method**

  `POST`

* **Request Body**

  ```
  {
    "name" : "Electronic"
  }
  ```

* **Request Headers**

  ```
  {
    access_token : <your access_token>
  }
  ```

* **Success Response:** <br />
  **Code:** 201 <br />
  **Content:**
  ```
  {
    "id": 2,
    "name": "Electronic",
    "UserId": 1,
    "updatedAt": "2021-01-23T01:34:32.258Z",
    "createdAt": "2021-01-23T01:34:32.258Z"
  }
  ```

* **Failed Response:** <br />
  **Code:** 400 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "name": "SequelizeValidationError",
    "message": [
        "name must be filled"
    ]
  }
  ```
  **Code:** 401 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "name": "ErrorAuthenticate",
    "message": "you need to login first"
  }
  ```
  **Code:** 403 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "name": "ErrorAccessToken",
    "message": "Jwt needed"
  }
  ```
  **Code:** 403 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "name": "ErrorAuthorize",
    "message": "you dont have access"
  }
  ```
  **Code:** 500 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "error": <internal server error>
  }
  ```

**Read category**
----
  Read category from server

* **URL**

  /categories

* **Method**

  `GET`

* **Request Headers**

  ```
  not needed
  ```

* **Success Response:** <br />
  **Code:** 200 <br />
  **Content:**
  ```
  [
    {
        "id": 1,
        "name": "other",
        "UserId": null,
        "createdAt": "2021-01-23T00:45:31.222Z",
        "updatedAt": "2021-01-23T00:45:31.222Z"
    },
    {
        "id": 2,
        "name": "Electronic",
        "UserId": 1,
        "createdAt": "2021-01-23T01:34:32.258Z",
        "updatedAt": "2021-01-23T01:34:32.258Z"
    }
  ]
  ```

* **Failed Response:** <br />
  **Code:** 500 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "error": <internal server error>
  }
  ```

**Read category by id**
----
  Read category from server

* **URL**

  /categories/:id

* **Method**

  `GET`

* **Request Headers**

  ```
  not needed
  ```

* **Success Response:** <br />
  **Code:** 200 <br />
  **Content:**
  ```
  {
    "id": 2,
    "name": "Electronic",
    "UserId": 1,
    "createdAt": "2021-01-23T01:34:32.258Z",
    "updatedAt": "2021-01-23T01:34:32.258Z"
  }
  ```

* **Failed Response:** <br />
  **Code:** 404 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "name": "ErrorNotFound",
    "message": "not found"
  }
  ```
  **Code:** 500 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "error": <internal server error>
  }
  ```

**Edit category**
----

* **URL**

  /categories/:id

* **Method**

  `PUT`

* **Request Body**

  ```
  {
    "name" : "others"
  }
  ```

* **Request Headers**

  ```
  {
    access_token : <your access_token>
  }
  ```

* **Success Response:** <br />
  **Code:** 200 <br />
  **Content:**
  ```
  {
    "id": 1,
    "name": "others",
    "UserId": 1,
    "createdAt": "2021-01-23T00:45:31.222Z",
    "updatedAt": "2021-01-23T01:38:09.707Z"
  }
  ```

* **Failed Response:** <br />
  **Code:** 400 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "name": "SequelizeValidationError",
    "message": [
        "name must be filled"
    ]
  }
  ```
  **Code:** 401 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "name": "ErrorAuthenticate",
    "message": "you need to login first"
  }
  ```
  **Code:** 403 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "name": "ErrorAccessToken",
    "message": "Jwt needed"
  }
  ```
  **Code:** 403 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "name": "ErrorAuthorize",
    "message": "you dont have access"
  }
  ```
  **Code:** 404 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "name": "ErrorNotFound",
    "message": "not found"
  }
  ```
  **Code:** 500 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "error": <internal server error>
  }
  ```

**Delete category**
----

* **URL**

  /categories/:id

* **Method**

  `DELETE`

* **Request Headers**

  ```
  {
    access_token : <your access_token>
  }
  ```

* **Success Response:** <br />
  **Code:** 200 <br />
  **Content:**
  ```
  {
    "message": "Category deleted successfully"
  }
  ```

* **Failed Response:** <br />
  **Code:** 401 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "name": "ErrorAuthenticate",
    "message": "you need to login first"
  }
  ```
  **Code:** 403 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "name": "ErrorAccessToken",
    "message": "Jwt needed"
  }
  ```
  **Code:** 403 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "name": "ErrorAuthorize",
    "message": "you dont have access"
  }
  ```
  **Code:** 404 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "name": "ErrorNotFound",
    "message": "not found"
  }
  ```
  **Code:** 500 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "error": <internal server error>
  }
  ```

## _Cart Endpoint_
- `POST /carts`
- `GET /carts`
- `GET /carts/transactions`
- `PATCH /carts`
- `PATCH /carts/:id`
- `DELETE /carts/:id`

**Create cart**
----
  Create cart into server

* **URL**

  /carts

* **Method**

  `POST`

* **Request Body**

  ```
  {
    "ProductId" : 2
  }
  ```

* **Request Headers**

  ```
  {
    access_token : <your access_token>
  }
  ```

* **Success Response:** <br />
  **Code:** 201 <br />
  **Content:**
  ```
  {
    "id": 104,
    "UserId": 2,
    "ProductId": 2,
    "updatedAt": "2021-01-28T02:03:55.418Z",
    "createdAt": "2021-01-28T02:03:55.418Z",
    "status": false,
    "quantity": 1
  }
  ```

* **Failed Response:** <br />
  **Code:** 401 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "name": "ErrorAuthenticate",
    "message": "you need to login first"
  }
  ```
  **Code:** 403 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "name": "ErrorAccessToken",
    "message": "Jwt needed"
  }
  ```
  **Code:** 500 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "error": <internal server error>
  }
  ```

**Read cart**
----
  Read cart from server

* **URL**

  /carts

* **Method**

  `GET`

* **Request Headers**

  ```
  {
    access_token : <your access_token>
  }
  ```

* **Success Response:** <br />
  **Code:** 200 <br />
  **Content:**
  ```
  [
    {
        "id": 104,
        "UserId": 2,
        "ProductId": 2,
        "quantity": 1,
        "status": false,
        "createdAt": "2021-01-28T02:03:55.418Z",
        "updatedAt": "2021-01-28T02:03:55.418Z",
        "Product": {
            "id": 2,
            "name": "Xiaomi Redmi note 8 pro",
            "image_url": "https://cdn.idntimes.com/content-images/community/2019/11/ejziz-sxyaa665x-a87937ecd17a7854c4b073350b97e823_600x400.jpg",
            "price": 210000,
            "stock": 0,
            "UserId": 1,
            "CategoryId": 1,
            "createdAt": "2021-01-23T01:03:30.815Z",
            "updatedAt": "2021-01-27T09:06:58.668Z"
        }
    }
  ]
  ```

* **Failed Response:** <br />
  **Code:** 401 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "name": "ErrorAuthenticate",
    "message": "you need to login first"
  }
  ```
  **Code:** 403 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "name": "ErrorAccessToken",
    "message": "Jwt needed"
  }
  ```
  **Code:** 500 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "error": <internal server error>
  }
  ```

**Read history transaction**
----

* **URL**

  /carts/transactions

* **Method**

  `GET`

* **Request Headers**

  ```
  {
    access_token : <your access_token>
  }
  ```

* **Success Response:** <br />
  **Code:** 200 <br />
  **Content:**
  ```
  [
    {
        "id": 103,
        "UserId": 2,
        "ProductId": 5,
        "quantity": 2,
        "status": true,
        "createdAt": "2021-01-28T00:57:52.054Z",
        "updatedAt": "2021-01-28T00:57:56.624Z",
        "Product": {
            "id": 5,
            "name": "Xiaomi Redmi note 8 pro",
            "image_url": "https://cdn.idntimes.com/content-images/community/2019/11/ejziz-sxyaa665x-a87937ecd17a7854c4b073350b97e823_600x400.jpg",
            "price": 210000,
            "stock": 12,
            "UserId": 1,
            "CategoryId": 1,
            "createdAt": "2021-01-27T22:48:21.594Z",
            "updatedAt": "2021-01-28T00:57:56.619Z"
        }
    },
    {
        "id": 102,
        "UserId": 2,
        "ProductId": 5,
        "quantity": 1,
        "status": true,
        "createdAt": "2021-01-28T00:56:04.854Z",
        "updatedAt": "2021-01-28T00:57:40.242Z",
        "Product": {
            "id": 5,
            "name": "Xiaomi Redmi note 8 pro",
            "image_url": "https://cdn.idntimes.com/content-images/community/2019/11/ejziz-sxyaa665x-a87937ecd17a7854c4b073350b97e823_600x400.jpg",
            "price": 210000,
            "stock": 12,
            "UserId": 1,
            "CategoryId": 1,
            "createdAt": "2021-01-27T22:48:21.594Z",
            "updatedAt": "2021-01-28T00:57:56.619Z"
        }
    }
  ]
  ```

* **Failed Response:** <br />
  **Code:** 401 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "name": "ErrorAuthenticate",
    "message": "you need to login first"
  }
  ```
  **Code:** 403 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "name": "ErrorAccessToken",
    "message": "Jwt needed"
  }
  ```
  **Code:** 500 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "error": <internal server error>
  }
  ```

**Checkout**
----
  update status cart & update product stock

* **URL**

  /carts

* **Method**

  `PATCH`

* **Request Body**
  ```
  not needed
  ```

* **Request Headers**

  ```
  {
    access_token : <your access_token>
  }
  ```

* **Success Response:** <br />
  **Code:** 200 <br />
  **Content:**
  ```
  {
    "message": "Checkout success"
  }
  ```

* **Failed Response:** <br />
  **Code:** 401 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "name": "ErrorAuthenticate",
    "message": "you need to login first"
  }
  ```
  **Code:** 403 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "name": "ErrorAccessToken",
    "message": "Jwt needed"
  }
  ```
  **Code:** 404 <br />
  **Content:**
  ```
  {
    "name": "NoCart",
    "message": "cart not found"
  }
  ```
  **Code:** 500 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "error": <internal server error>
  }
  ```

**Update quantity cart**
----
  update quantity cart

* **URL**

  /carts/:id

* **Method**

  `PATCH`

* **Request Body**
  ```
  {
    quantity: integer
  }
  ```

* **Request Headers**

  ```
  {
    access_token : <your access_token>
  }
  ```

* **Success Response:** <br />
  **Code:** 200 <br />
  **Content:**
  ```
  {
    "id": 106,
    "UserId": 2,
    "ProductId": 6,
    "quantity": 2,
    "status": false,
    "createdAt": "2021-01-28T02:20:10.836Z",
    "updatedAt": "2021-01-28T02:20:46.565Z"
  }
  ```

* **Failed Response:** <br />
  **Code:** 401 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "name": "ErrorAuthenticate",
    "message": "you need to login first"
  }
  ```
  **Code:** 403 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "name": "ErrorAccessToken",
    "message": "Jwt needed"
  }
  ```
  **Code:** 404 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "name": "ErrorNotFound",
    "message": "not found"
  }
  ```
  **Code:** 500 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "error": <internal server error>
  }
  ```

**Delete cart**
----

* **URL**

  /carts/:id

* **Method**

  `DELETE`

* **Request Headers**

  ```
  {
    access_token : <your access_token>
  }
  ```

* **Success Response:** <br />
  **Code:** 200 <br />
  **Content:**
  ```
  {
    "message": "successfully delete cart"
  }
  ```

* **Failed Response:** <br />
  **Code:** 401 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "name": "ErrorAuthenticate",
    "message": "you need to login first"
  }
  ```
  **Code:** 403 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "name": "ErrorAccessToken",
    "message": "Jwt needed"
  }
  ```
  **Code:** 403 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "name": "ErrorAuthorize",
    "message": "you dont have access"
  }
  ```
  **Code:** 404 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "name": "ErrorNotFound",
    "message": "not found"
  }
  ```
  **Code:** 500 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "error": <internal server error>
  }
  ```