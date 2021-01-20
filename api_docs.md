# Ecommerce Server
## RESTful endpoints
_Auth Endpoint_

-  `POST /register`
-  `POST /login`

**Register**
----
Create new User
*  **URL**  `/register`

*  **Method**  `POST`

* **Request Body**

  ```
  {
    "email": "<user_email>",
    "password": "<user_password>"
    "role": "customer"
  }
  ```

* **Success Response:** <br>
  **Code:** 201 <br>
  **Content:**

  ```
  {
    "message": "Success create user"
  }
  ```

* **Failed Response:** <br>
  **Code:** 400 <br>
  **Content:**

  ```
  [
    {
      name: "Bad Request"
      errors: [
        <error_messages>
      ]
    }
  ]
  ```
  **Code:** 500 <br>
  **Content:**
  ```
  {
    "name": "Internal server error",
    "message": <error_message>
  }
  ```

**Login**
----
Login User
*  **URL**  `/login`

*  **Method**  `POST`

* **Request Body**

  ```
  {
    "email": "<user_email>",
    "password": "<user_password>"
  }
  ```

* **Success Response:** <br>
  **Code:** 200 <br>
  **Content:**

  ```
  {
    "access_token": <jwt_token>
  }
  ```

* **Failed Response:** <br>
  **Code:** 400 <br>
  **Content:**

  ```
  {
    "name": "Bad Request",
    "message": <error_message>
  }
  ```
  **Code:** 500 <br>
  **Content:**
  ```
  {
    "name": "Internal server error",
    "message": <error_message>
  }
  ```
<br>
----
_Products Endpoint_

-  `GET /products`
-  `GET /products/:id`
-  `POST /tasks`
-  `PUT /tasks/:id`
-  `DELETE /tasks/:id`

**Products**
----
Get all products
*  **URL**  `/products`

*  **Method**  `GET`

* **Request Headers**
  ```
  Not needed
  ```

* **Request Body**

  ```
  Not needed
  ```

* **Success Response:** <br>
  **Code:** 200 <br>
  **Content:**

  ```
  [
    {
      "id": "<product id>",
      "name": "<product name>",
      "imageUrl": "<product imageUrl>",
      "price": "<product price>",
      "stock": "<product stock>",
      "createdAt": "<product created at>",
      "updatedAt": "<product updated at>"
    }
  ]  
  ```

* **Failed Response:** <br>
  **Code:** 500 <br>
  **Content:**
  ```
  {
    "name": "Internal server error",
    "message": <error_message>
  }
  ```
----
Get Product by id
*  **URL**  `/products/:id`

*  **Method**  `GET`

* **Request Headers**
  ```
  Not needed
  ```

* **Request Body**

  ```
  Not needed
  ```

* **Success Response:** <br>
  **Code:** 200 <br>
  **Content:**

  ```
  {
    "id": "<product id>",
    "name": "<product name>",
    "imageUrl": "<product imageUrl>",
    "price": "<product price>",
    "stock": "<product stock>",
    "createdAt": "<product created at>",
    "updatedAt": "<product updated at>"
  }
  ```

* **Failed Response:** <br>
  **Code:** 500 <br>
  **Content:**
  ```
  {
    "name": "Internal server error",
    "message": <error_message>
  }
  ```
----
Create new product
*  **URL**  `/products`

*  **Method**  `POST`

* **Request Headers**
  ```
    {
      "access_token": "<admin access_token>"
    }
  ```

* **Request Body**

  ```
  {
    "name": "<product name>",
    "imageUrl": "<product imageUrl>",
    "price": <product price>,
    "stock": <product stock>
  }
  ```

* **Success Response:** <br>
  **Code:** 201 <br>
  **Content:**

  ```
  {
    "id": "<product id>",
    "name": "<product name>",
    "imageUrl": "<product imageUrl>",
    "price": "<product price>",
    "stock": "<product stock>",
    "createdAt": "<product created at>",
    "updatedAt": "<product updated at>"
  }
  ```

* **Failed Response:** <br>
  **Code:** 400 <br>
  **Content:**
  ```
  {
    "name": "Bad Request",
    "errors": [
      <error_messages>
    ]
  }
  ```
  **Code:** 401 <br>
  **Content:**
  ```
  {
    "name": "Unauthorized",
    "message": <error_message>
  }
  ```
  **Code:** 500 <br>
  **Content:**
  ```
  {
    "name": "Internal server error",
    "message": <error_message>
  }
  ```
----
Update Product
*  **URL**  `/products/:id`

*  **Method**  `PUT`

* **Request Headers**
  ```
    {
      "access_token": "<admin access_token>"
    }
  ```

* **Request Body**

  ```
  {
    "name": "<product name>",
    "imageUrl": "<product imageUrl>",
    "price": <product price>,
    "stock": <product stock>
  }
  ```

* **Success Response:** <br>
  **Code:** 200 <br>
  **Content:**

  ```
  {
    "id": "<product id>",
    "name": "<updated product name>",
    "imageUrl": "<updated product imageUrl>",
    "price": <updated product price>,
    "stock": <updated product stock>
  }
  ```

* **Failed Response:** <br>
  **Code:** 401 <br>
  **Content:**
  ```
  {
    "name": "Unauthorized",
    "message": "Not authorized"
  }
  ```
  **Code:** 500 <br>
  **Content:**
  ```
  {
    "name": "Internal server error",
    "message": <error_message>
  }
  ```
----
Delete Product
*  **URL**  `/products/:id`

*  **Method**  `DELETE`

* **Request Headers**
  ```
    {
      "access_token": "<admin access_token>"
    }
  ```

* **Request Body**

  ```
  Not needed
  ```

* **Success Response:** <br>
  **Code:** 200 <br>
  **Content:**

  ```
  {
    message: "Success delete task"
  }
  ```

* **Failed Response:** <br>
  **Code:** 401 <br>
  **Content:**
  ```
  {
    "name": "Unauthorized",
    "message": "Not Authorized"
  }
  ```
  **Code:** 500 <br>
  **Content:**
  ```
  {
    "name": "Internal server error",
    "message": <error_message>
  }
  ```