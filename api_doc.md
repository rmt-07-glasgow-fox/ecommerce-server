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

### GET/carts

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
            "id": "number",
            "UserId": "number",
            "ProductId": "number",
            "quantity": "number",
            "isPaid": "boolean",
            "totalPrice": "number",
            "Product": {
                "id": "number",
                "name": "string",
                "image_url": "string",
                "price": "number",
                "stock": "number",
            }
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

### GET/carts/:id

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
            "id": "number",
            "UserId": "number",
            "ProductId": "number",
            "quantity": "number",
            "isPaid": "boolean",
            "totalPrice": "number",
            "Product": {
                "id": "number",
                "name": "string",
                "image_url": "string",
                "price": "number",
                "stock": "number",
            }
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

### POST/carts

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
            "id": "number",
            "UserId": "number",
            "ProductId": "number",
            "quantity": "number",
            "isPaid": "boolean",
            "totalPrice": "number",
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

### DELETE/carts/:id

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
            "message": "Cart Has Been Succesfully Deleted"
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

### PUT/carts/:id

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
            "id": "number",
            "UserId": "number",
            "ProductId": "number",
            "quantity": "number",
            "isPaid": "boolean",
            "totalPrice": "number",
            "Product": {
                "id": "number",
                "name": "string",
                "image_url": "string",
                "price": "number",
                "stock": "number",
            }
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

### GET/wishlist

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
            "id": "number",
            "UserId": "number",
            "ProductId": "number",
            "Product": {
                "id": "number",
                "name": "string",
                "image_url": "string",
                "price": "number",
                "stock": "number",
            }
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

### GET/wishlist/:id

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
            "id": "number",
            "UserId": "number",
            "ProductId": "number",
            "Product": {
                "id": "number",
                "name": "string",
                "image_url": "string",
                "price": "number",
                "stock": "number",
            }
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

### POST/wishlist

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
            "id": "number",
            "UserId": "number",
            "ProductId": "number"
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
### DELETE/wishlist/:id

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
            "message": "Wishlist Has Been Succesfully Deleted"
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
