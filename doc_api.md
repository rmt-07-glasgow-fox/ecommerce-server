# e-Commerce App Server
e-Commerce App is an application to manage your assets. This app has : 
* RESTful endpoint for asset's CRUD operation
* JSON formatted response

&nbsp;
# All endpoints in server
list endpoints:
- POST /login
- GET /products
- GET /products/:id
- POST /products
- PUT /products/:id
- DELETE /products/:id

&nbsp;
# RESTful endpoints

### POST /login/
_Request_
- body

    ```json
    {
        "email" : "mail@email.com",
        "passoword" : "password"
    }
    ```
_Response (200)_
- body

    ```json
    {
        "access_token":"youraccesstoken"
    },
    ```
_Response (400)_
- body

    ```json
    {
        "message":"errormessage"
    },
    ```

### GET /products
_Request_
- headers

    ```json
    {
        "access_token":"youraccesstoken"
    }
    ```
_Response (200)_
- body

    ```json
    
        [
            {
                "id": 1,
                "title": "title",
                "image_url": "url",
                "price": "price",
                "stock": "stock",
                "createdAt": "2021-01-12T16:12:55.843Z",
                "updatedAt": "2021-01-12T16:12:55.843Z"
            },
            {
                "id": 2,
                "title": "title",
                "image_url": "url",
                "price": "price",
                "stock": "stock",
                "createdAt": "2021-01-12T16:12:55.843Z",
                "updatedAt": "2021-01-12T16:12:55.843Z"
            },
            ...
        ]
    
    ```

### POST /products
_Request_
- headers

    ```json
    {
        "access_token":"youraccesstoken"
    }
    ```
- body

    ```json
    {
        "title": "title",
        "image_url": "url",
        "price": "price",
        "stock": "stock",
    }
    ```

_Response (201)_
- body

    ```json  
    {
        "id": "productsid",
        "title": "title",
        "image_url": "url",
        "price": "price",
        "stock": "stock",
        "createdAt": "timestamp created_at",
        "updatedAt": "timestamp updated_at"
    }
    ```
_Response (400)_
- body

    ```json
    {
        "message":"errormessage"
    },
    ```
_Response (401)_
- body

    ```json
    {
        "message":"errormessage"
    },
    ```
_Response (403)_
- body

    ```json
    {
        "message":"errormessage"
    },
    ```
### PUT /products/:id
_Request_
- headers

    ```json
    {
        "access_token":"youraccesstoken"
    }
    ```
- params

    ```json
    {
        "id":"productsid"
    }
    ```
- body

    ```json
    {
        "title": "title",
        "image_url": "url",
        "price": "price",
        "stock": "stock",
    }
    ```
_Response (201)_
- body

    ```json  
    {
        "id": "productsid",
        "title": "title",
        "image_url": "url",
        "price": "price",
        "stock": "stock",
        "createdAt": "timestamp created_at",
        "updatedAt": "timestamp updated_at"
    }
    ```
_Response (400)_
- body

    ```json
    {
        "message":"errormessage"
    },
    ```
_Response (401)_
- body

    ```json
    {
        "message":"errormessage"
    },
    ```
_Response (403)_
- body

    ```json
    {
        "message":"errormessage"
    },
    ```

### DELETE /products/:id
_Request_
- headers

    ```json
    {
        "access_token":"youraccesstoken"
    }
    ```
- params

    ```json
    {
        "id":"productsid"
    }
    ```

_Response (200)_
- body

    ```json
    {
        "message":"delete product success"
    },
    ```
_Response (401)_
- body

    ```json
    {
        "message":"errormessage"
    },
    ```
_Response (403)_
- body

    ```json
    {
        "message":"errormessage"
    },
    ```