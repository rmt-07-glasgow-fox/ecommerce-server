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
      - GET ```/products/:productId```
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
            > 401, 404, and 500
      - PUT ```/products/:productId```
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
      - DELETE ```/products//:productId```
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
              "msg": "Success delete product"
            }
            ```
          - Error
            > 401, 404, and 500
      - POST ```/categories```
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
              "name": <string>
            }
            ```
        - Response
          - Success
            ```
            {
              "id": <integer>,
              "name": <string>
            }
            ```
          - Error
            > 400, 401, and 500
      - GET ```/categories```
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
                "name": <string>
              }, {
                ...
              }, ...
            ]
            ```
          - Error
            > 400, 401, and 500
      - DELETE ```/categories/:categoryId```
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
              "msg": "Success delete category"
            }
            ```
          - Error
            > 401, 404, and 500
      - POST ```/banners```
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
              "title": <string>,
              "image_url": <string>,
              "status": <boolean>
            }
            ```
        - Response
          - Success
            ```
            {
              "id": <integer>,
              "title": <string>,
              "image_url": <string>,
              "status": <boolean>
            }
            ```
          - Error
            > 400, 401, and 500
      - GET ```/banners```
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
                "title": <string>,
                "image_url": <string>,
                "status": <boolean>
              }, {
                ...
              }, ...
            ]
            ```
          - Error
            > 401 and 500
      - GET ```/banners/:bannerId```
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
              "id": <integer>,
              "title": <string>,
              "image_url": <string>,
              "status": <boolean>
            }
            ```
          - Error
      - PUT ```/banners/:bannerId```
        - Headers
            ```
            {
              "access_token": <string>
            }
            ```
          - Body
            ```
            {
              "title": <string>,
              "image_url": <string>,
              "status": <boolean>
            }
            ```
        - Response
          - Success
            ```
            {
              "id": <integer>,
              "title": <string>,
              "image_url": <string>,
              "status": <boolean>
            }
            ```
          - Error
            > 400, 401, 404, and 500
      - DELETE ```/banners/:bannerId```
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
              "msg": "Success delete banner"
            }
            ```
          - Error
            > 401, 404, and 500