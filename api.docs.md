# **E-commerce**

  > Hactiv8 e-commerce applicaton

 1. ## **Client Management System** ( CMS )

    - ### **Response Error**
      - Status 400 :
        > Bad request ( Validation or login )
        ```
        {
            "msg": [<string>, ...]
        }
        ```
      - Status 401 :
        > Auth error ( Not logged in or not an admin )
        ```
        {
            "msg": <string>
        }
        ```
      - Status 404 :
        > Not found
        ```
        {
            "msg": <string>
        }
        ```
      - Status 500 :
        > Server error
        ```
        {
            "msg": <string>
        }
        ```
    - ### **Routes**
      - POST ``` /login ```
        - Request
          - Body
            ```
            {
                "email": <string>,
                "password": <string>
            }
            ```
        - Response
          - Success
            ```
            {
                "access_token": <string>
            }
            ```
          - Error
            > 400 and 500
      - POST ``` /products ```
        - Request
          - Headers
            ```
            {
                "access_token": <string>
            }
            ```
          - Body
            ```
            {
                "name": <string>,
                "image_url": <string>,
                "price": <integer>,
                "stock": <integer>,
                "categoryId": <integer>
            }
            ```
        - Response
          - Success
            ```
            {
                "id": <integer>,
                "name": <string>,
                "image_url": <string>,
                "price": <integer>,
                "stock": <integer>,
                "Category": {
                    "name": <string>
                }
            }
            ```
          - Error
            > 400, 401, 404, and 500
      - GET ``` /products ```
        - Request
          - Headers
            ```
            {
                "access_token": <string>
            }
            ```
        - Response
          - Success
            ```
            [
                {
                    "id": <integer>,
                    "name": <string>,
                    "image_url": <string>,
                    "price": <integer>,
                    "stock": <integer>,
                    "Category": {
                        "name": <string>
                    }
                },{
                    ...
                }, ...
            ]
            ```
          - Error
            > 401 and 500
      - UPDATE ``` /products/:id ```
        - Request
          - Headers
            ```
            {
                "access_token": <string>
            }
            ```
          - Body
            ```
            {
                "name": <string>,
                "image_url": <string>,
                "price": <integer>,
                "stock": <integer>,
                "categoryId": <integer>
            }
            ```
        - Response
          - Success
            ```
            {
                "id": <integer>,
                "name": <string>,
                "image_url": <string>,
                "price": <integer>,
                "stock": <integer>,
                "Category": {
                    "name": <string>
                }
            }
            ```
          - Error
            > 400, 401, 404, and 500
      - PATCH ```/products/:id```
        - Request
          - Headers
            ```
            {
                "access_token": <string>
            }
            ```
          - Body
            ```
            {
                "stock": <integer>
            }
            ```
        - Response
          - Success
          - Error
            > 400, 401, 404, and 500
      - DELETE ``` /products/:id ```
        - Request
          - Headers
            ```
            {
                "access_token": <string>
            }
            ```
        - Response
          - Success
            ```
            {
                "msg": "Product has been deleted"
            }
            ```
          - Error
            > 401, 404, and 500
      - POST ```/categories```
      - GET ```/categories```
      - UPDATE ```/categories```
      - DELETE ```/categories```
      - POST ```/banners```
      - GET ```/banners```
      - UPDATE ```/banners```
      - DELETE ```/banners```