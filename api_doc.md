**E-Commerce CMS**

### GET/PRODUCTS

* **REQUEST HEADERS**
    * **content**
    ```json
    [
        {
            "access_token": "string"
        }
    ]
    ```
* **SUCCESS RESPONSE**
    * **code** 200
    * **content**
    ```json
    [
        {
            "name": "string",
            "image_url": "string",
            "price": "number",
            "stock": "number"
        }
    ]
    ```
* **ERROR RESPONSE**
    * **code** 500
    * **content**
    ```json
    [
        {
            "message": "Internal Server Error"
        }
    ]
    ```

### POST/PRODUCTS

* **REQUEST HEADERS**
    * **content**
    ```json
    [
        {
            "access_token": "string"
        }
    ]
    ```
* **SUCCESS RESPONSE**
    * **code** 201
    * **content**
    ```json
    [
        {
            "name": "string",
            "image_url": "string",
            "price": "number",
            "stock": "number"
        }
    ]
    ```
* **ERROR RESPONSE**
    * **code** 500
    * **content**
    ```json
    [
        {
            "message": "Internal Server Error"
        }
    ]
    ```

### GET/PRODUCTS/:id

* **REQUEST HEADERS**
    * **content**
    ```json
    [
        {
            "access_token": "string"
        }
    ]
    ```
* **SUCCESS RESPONSE**
    * **code** 200
    * **content**
    ```json
    [
        {
            "name": "string",
            "image_url": "string",
            "price": "number",
            "stock": "number"
        }
    ]
    ```
* **ERROR RESPONSE**
    * **code** 404
    * **content**
    ```json
    [
        {
            "message": "Data Not Found"
        }
    ]
    ```
    * **code** 500
    * **content**
    ```json
    [
        {
            "message": "Internal Server Error"
        }
    ]
    ```

### PUT/PRODUCTS

* **REQUEST HEADERS**
    * **content**
    ```json
    [
        {
            "access_token": "string"
        }
    ]
    ```
* **SUCCESS RESPONSE**
    * **code** 200
    * **content**
    ```json
    [
        {
            "name": "string",
            "image_url": "string",
            "price": "number",
            "stock": "number"
        }
    ]
    ```
* **ERROR RESPONSE**
    * **code** 500
    * **content**
    ```json
    [
        {
            "message": "Internal Server Error"
        }
    ]
    ```


### DELETE/PRODUCTS/:id

* **REQUEST HEADERS**
    * **content**
    ```json
    [
        {
            "access_token": "string"
        }
    ]
    ```
* **SUCCESS RESPONSE**
    * **code** 200
    * **content**
    ```json
    [
        {
            "message": "Product Has Been Succesfully Deleted"
        }
    ]
    ```
* **ERROR RESPONSE**
    * **code** 404
    * **content**
    ```json
    [
        {
            "message": "Data Not Found"
        }
    ]
    ```
    * **code** 500
    * **content**
    ```json
    [
        {
            "message": "Internal Server Error"
        }
    ]
    ```

### POST/REGISTER

* **SUCCESS RESPONSE**
    * **code** 200
    * **content**
    ```json
    [
        {
            "id": "string",
            "email": "string",
            "role": "string"
        }
    ]
    ```
* **ERROR RESPONSE**
    * **code** 500
    * **content**
    ```json
    [
        {
            "message": "Internal Server Error"
        }
    ]
    ```

### POST/LOGIN

* **SUCCESS RESPONSE**
    * **code** 200
    * **content**
    ```json
    [
        {
            "access_token": "string",
            "email": "string",
            "role": "string"
        }
    ]
    ```
* **ERROR RESPONSE**
    * **code** 500
    * **content**
    ```json
    [
        {
            "message": "Internal Server Error"
        }
    ]
    ```


