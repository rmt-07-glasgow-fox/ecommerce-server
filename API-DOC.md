# ecommerce cms admin

**LOGIN USER**
----
  <_LOGIN User _>

* **URL**

  `/login`

* **Method:**

  `POST`
  
*  **URL Params**

    Required: 

    `none`

* **Body**
    ```json
        {
          "data": {
              "email": "tedgeorge@gmail.com",
              "password": "123456"
            }
        }
    ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
        {
          "access_token":"asdadasdwdasaedasda"
        }
    ```
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** 
    ```json
        {
            "message": [
                "name cannot be empty",
                "password cannot be empty"
            ]
        }
    ```

  * **Code:** 404 <br />
    **Content:** 
    ```json
        {
            "message": "wrong email/password"
        }
    ```

  * **Code:** 500 <br />
    **Content:** 
    ```json
        { 
            "message" : "internal server error" 
        }
    ```

**SHOW ALL PRODUCT**
----
  <_SHOW PRODUCT _>

* **URL**

  `/product`

* **Method:**

  `GET`
  
*  **URL Params**

    Required: 

    `none`

* **Data Params**

  `none`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    [
      {
        "id": 9,
        "name": "tas",
        "price": 20000,
        "stock": 2,
        "category": "fashion",
        "createdAt": "2020-11-25T16:01:28.995Z",
        "updatedAt": "2020-11-25T16:01:28.996Z",
      }
    ]
    ```
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** 
    ```json
        {
            "message": "internal server error"
        }
    ```

  * **Code:** 401 <br />
    **Content:** 
    ```json
        {
            "message": "please login first"
        }
    ```






**DELETE PRODUCT**
----
  <_DELETE PRODUCT _>

* **URL**

  `/product/:id`

* **Method:**

  `DELETE`
  
*  **URL Params**

    Required: 

    `id =[integer]`

* **Data Params**

  `none`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
      {
        "message": "Product deleted"
      }
    ```
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** 
    ```json
        {
            "message": "internal server error"
        }
    ```


  * **Code:** 404  <br />
    **Content:** 
    ```json
        {
            "message": "Product not found"
        }
    ```

  * **Code:** 401  <br />
    **Content:** 
    ```json
        {
            "message": "you aren't an admin"
        }
    ```

  * **Code:** 401 <br />
    **Content:** 
    ```json
        {
            "message": "please login first"
        }
    ```

**UPDATE PRODUCT**
----
  <_UPDATE PRODUCT _>

* **URL**

  `/product/:id`

* **Method:**

  `UPDATE`
  
*  **URL Params**

    Required: 

    `id =[integer]`

* **Data Params**
    ```json
      {
        "name": "tas",
        "price": 20000,
        "stock": 2,
        "category": "fashion"
      }
    ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
      {
        "id": 9,
        "name": "tas",
        "price": 20000,
        "stock": 2,
        "category": "fashion",
        "createdAt": "2020-11-25T16:01:28.995Z",
        "updatedAt": "2020-11-25T16:01:28.996Z",
      }
    ```
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** 
    ```json
        {
            "message": "internal server error"
        }
    ```


  * **Code:** 404  <br />
    **Content:** 
    ```json
        {
            "message": "Product not found!"
        }
    ```

  * **Code:** 401  <br />
    **Content:** 
    ```json
        {
            "message": "you aren't an admin"
        }
    ```

  * **Code:** 401 <br />
    **Content:** 
    ```json
        {
            "message": "please login first"
        }
    ```
  * **Code:** 400  <br />
    **Content:** 
    ```json
        {
            "message": [
              "name cannot be empty",
              "stock cannot be empty",
              "category cannot be empty"
              ]
        }
    ```


**ADD PRODUCT**
----
  <_ADD PRODUCT _>

* **URL**

  `/product`

* **Method:**

  `POST`
  
*  **URL Params**

    Required: 

    `none`

* **Body**
    ```json
      {
        "name": "tas",
        "price": 20000,
        "stock": 2,
        "category": "fashion"
      }
    ```

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```json
      {
        "id": 9,
        "name": "tas",
        "price": 20000,
        "stock": 2,
        "category": "fashion",
        "createdAt": "2020-11-25T16:01:28.995Z",
        "updatedAt": "2020-11-25T16:01:28.996Z",
      }
    ```
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** 
    ```json
        {
            "message": "internal server error"
        }
    ```

  * **Code:** 400  <br />
    **Content:** 
    ```json
        {
            "message": [
              "name cannot be empty",
              "stock cannot be empty",
              "category cannot be empty"
              ]
        }
    ```

  * **Code:** 401 <br />
    **Content:** 
    ```json
        {
            "message": "please login first"
        }
    ```