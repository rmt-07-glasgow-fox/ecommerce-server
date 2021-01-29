# ecommerce-server
Admin side ecommerce

&nbsp;

## RESTful endpoints
### POST /register

>Creat new user

_Request Header_
```
not needed
```
_Request Params_
```
not needed
```
_Request Body_
```
{
    "firstname": "<firstname to get insert into>",
    "lastname": "<lastname to get insert into>",
    "email": "<email to get insert into>",
    "password": "<password to get insert into>"
    "role": "<role to get insert into>"
}
```
_Response (201 - Created)_
```
{
    "id": "<given id by system>",
    "firstname": "<posted firstname>",
    "lastname": "<posted lastname>",
    "email": "<posted email>",
    "role": "<posted role>"
}
```
_Response (400 - Bad Request)_
```
[<validation error message>]
```
_Response (500 - Internal Server Error)_
```
{<errors message>}
```
### POST /login

>Login

_Request Header_
```
not needed
```
_Request Params_
```
not needed
```
_Request Body_
```
{
    "email": "<email to get submit>",
    "password": "<password to get submit>"
}
```
_Response (200 - Submited)_
```
{
    "accestoken": "<given jwt system>",

}
```
_Response (404 - Not Found)_
```
[<validation error message>]
```
_Response (400 - Bad Request)_
```
[<validation error message>]
```
_Response (500 - Internal Server Error)_
```
{<errors message>}
```
### POST /Product

>Creat new product

_Request Header_
```
"<access token>"
```
_Request Params_
```
not needed
```
_Request Body_
```
{
    "name": "<name to get insert into>",
    "imageUrl": "<imageUrl to get insert into>",
    "price": "<price to get insert into>",
    "stock": "<stock to get insert into>"
}
```
_Response (200 - Submited)_
```
{
    "id": "<posted name>",
    "name": "<posted name>",
    "imageUrl": "<posted imageUrl>",
    "price": "<posted price>",
    "stock": "<posted stock>"
}
```
_Response (400 - Bad Request)_
```
[<validation error message>]
```
_Response (500 - Internal Server Error)_
```
{<errors message>}
```
### PUT /Product/:id

>Update existing product

_Request Header_
```
"<access token>"
```
_Request Params_
```
"<id product>"
```
_Request Body_
```
{
    "name": "<product name>",
    "imageUrl": "<product imageUrl>",
    "price": "<product price>",
    "stock": "<product stock
```
_Response (200 - Submited)_
```
{
    "id": "<id product>",
    "name": "<updated name>",
    "imageUrl": "<updated imageUrl>",
    "price": "<updated price>",
    "stock": "<updated stock>"
}
```
_Response (404 - Not Found)_
```
[<error message>]
```
_Response (400 - Bad Request)_
```
[<validation error message>]
```
_Response (500 - Internal Server Error)_
```
{<errors message>}
```
### DELETE /Product/:id

>delete existing product

_Request Header_
```
"<access token>"
```
_Request Params_
```
"<id product>"
```
_Request Body_
```
not needed
```
_Response (200 - Submited)_
```
{
    'message': 'Deleted successfully'
}
```
_Response (404 - Not Found)_
```
[<error message>]
```
_Response (500 - Internal Server Error)_
```
{<errors message>}
```
### POST /checktoken

>check token

_Request Header_
```
"<access token>"
```
_Request Params_
```
"not needed"
```
_Request Body_
```
not needed
```
_Response (200 - Submited)_
```
{
    'role': '<role user>'
}
```
_Response (404 - Not Found)_
```
[<error message>]
```
_Response (500 - Internal Server Error)_
```
{<errors message>}
```
### get /product
>get existing wishlist

_Request Header_
```
"<access token>"
```
_Request Params_
```
not needed
```
_Request Body_
```
not needed
```
_Response (200)_
```
[
    {
        "id": <id>,
        "name": "<name>",
        "imageUrl": "<image Url>",
        "price": <price>,
        "stock": <stock>,
        "category": "<category>",
        "createdAt": "2021-01-26T10:41:41.445Z",
        "updatedAt": "2021-01-28T05:15:43.800Z"
    }
]
```
_Response (404 - Not Found)_
```
[<error message>]
```
_Response (500 - Internal Server Error)_
```
{<errors message>}
```
### get /product/:id
>get existing wishlist

_Request Header_
```
"<access token>"
```
_Request Params_
```
<product id>
```
_Request Body_
```
not needed
```
_Response (200)_
```
{
    "id": <id>,
    "name": "<name>",
    "imageUrl": "<image Url>",
    "price": <price>,
    "stock": <stock>,
    "category": "<category>",
    "createdAt": "2021-01-26T10:41:41.445Z",
    "updatedAt": "2021-01-28T05:15:43.800Z"
}
```
_Response (404 - Not Found)_
```
[<error message>]
```
_Response (500 - Internal Server Error)_
```
{<errors message>}
```
### POST /product/:id/wishlist
>Add new wishlist

_Request Header_
```
"<access token>"
```
_Request Params_
```
"<id product>"
```
_Request Body_
```
not needed
```
_Response (200 - Submited)_
```
{
    'message': '<Success create new wish list.>'
}
```
_Response (404 - Not Found)_
```
[<error message>]
```
_Response (500 - Internal Server Error)_
```
{<errors message>}
```
### DELETE /product/:id/wishlist
>delete existing wishlist

_Request Header_
```
"<access token>"
```
_Request Params_
```
"<id product>"
```
_Request Body_
```
not needed
```
_Response (200 - Submited)_
```
{
    'message': '<Deleted.>'
}
```
_Response (404 - Not Found)_
```
[<error message>]
```
_Response (500 - Internal Server Error)_
```
{<errors message>}
```
### get /product/:id/wishlist
>get existing wishlist

_Request Header_
```
"<access token>"
```
_Request Params_
```
not needed
```
_Request Body_
```
not needed
```
_Response (200 - Submited)_
```
[
    {
        "id": <id>,
        "name": "<name>",
        "imageUrl": "<image Url>",
        "price": <price>,
        "stock": <stock>,
        "category": "<category>",
        "createdAt": "2021-01-26T10:41:41.445Z",
        "updatedAt": "2021-01-28T05:15:43.800Z",
        "WishList": {
            "UserId": <userid>,
            "ProductId": <product id>,
            "createdAt": "2021-01-28T18:27:02.720Z",
            "updatedAt": "2021-01-28T18:27:02.720Z"
        }
    }
]
```
_Response (404 - Not Found)_
```
[<error message>]
```
_Response (500 - Internal Server Error)_
```
{<errors message>}
```
### get /history
>get existing wishlist

_Request Header_
```
"<access token>"
```
_Request Params_
```
not needed
```
_Request Body_
```
not needed
```
_Response (200 - Submited)_
```
[
    {
        "id": <id>,
        "UserId": <user id>,,
        "status": "<status>",
        "createdAt": "2021-01-28T03:38:48.570Z",
        "updatedAt": "2021-01-28T05:15:43.784Z",
        "Products": [
            {
                "id": <id>,
                "name": "<name>",
                "imageUrl": "<image url>",
                "price": <price>,
                "stock": <stock>,
                "category": "<category>",
                "createdAt": "2021-01-26T10:41:41.445Z",
                "updatedAt": "2021-01-28T05:15:43.800Z",
                "CartList": {
                    "CartId": <cart id>,
                    "ProductId": <product id>,
                    "qty": <qty>,
                    "currentPrice": <curent price>,
                    "createdAt": "2021-01-28T05:15:38.655Z",
                    "updatedAt": "2021-01-28T05:15:38.655Z"
                }
            }
        ]
    }
]
```
_Response (404 - Not Found)_
```
[<error message>]
```
_Response (500 - Internal Server Error)_
```
{<errors message>}
```
### get /product/:id/cart
>get existing cart with status 'UNPAID'

_Request Header_
```
"<access token>"
```
_Request Params_
```
not needed
```
_Request Body_
```
not needed
```
_Response (200 - Submited)_
```
[
    {
        "id": <id>,
        "name": "<name>",
        "imageUrl": "<image url>",
        "price": <price>,
        "stock": <satock>,
        "category": "<category>",
        "createdAt": "2021-01-26T12:08:53.800Z",
        "updatedAt": "2021-01-28T00:32:30.878Z",
        "CartList": {
            "CartId": <cart id>,
            "ProductId": <product id>,
            "qty": <qty>,
            "currentPrice": <curent price>,
            "createdAt": "2021-01-28T18:49:33.992Z",
            "updatedAt": "2021-01-28T18:49:33.992Z"
        }
    }
]
```
_Response (404 - Not Found)_
```
[<error message>]
```
_Response (500 - Internal Server Error)_
```
{<errors message>}
```
### POST /product/:id/cart

>Creat new cart

_Request Header_
```
"<access token>"
```
_Request Params_
```
"<ProductId>"
```
_Request Body_
```
{
    "qty": "<qty to get insert into>",
    "curentPrice": "<curentPrice to get insert into>",
    "status": "<status to get insert into>",
}
```
_Response (201 - Created)_
```
{
    "message": "Success create new cart list."
}
```
_Response (400 - Bad Request)_
```
[<validation error message>]
```
_Response (500 - Internal Server Error)_
```
{<errors message>}
```
### PUT /product/:id/cart/:cartid

>Put/Update existing cart

_Request Header_
```
"<access token>"
```
_Request Params_
```
"<ProductId>"
"<CartId>"
```
_Request Body_
```
{
    "qty": "<qty to get insert into>",
    "curentPrice": "<curentPrice to get insert into>"
}
```
_Response (201 - Created)_
```
{
    "message": "Success update product in cart list."
}
```
_Response (400 - Bad Request)_
```
[<validation error message>]
```
_Response (500 - Internal Server Error)_
```
{<errors message>}
```
### DELETE /product/:id/cart/:cartid

>Delete existing cart

_Request Header_
```
"<access token>"
```
_Request Params_
```
"<ProductId>"
"<CartId>"
```
_Request Body_
```
not needed
```
_Response (201 - Created)_
```
{
    "message": "Deleted."
}
```
_Response (400 - Bad Request)_
```
[<validation error message>]
```
_Response (500 - Internal Server Error)_
```
{<errors message>}
```
### DELETE /product/:id/cart/:cartid/all

>Delete existing cart

_Request Header_
```
"<access token>"
```
_Request Params_
```
"<CartId>"
```
_Request Body_
```
not needed
```
_Response (201 - Created)_
```
{
    "message": "Deleted."
}
```
_Response (400 - Bad Request)_
```
[<validation error message>]
```
_Response (500 - Internal Server Error)_
```
{<errors message>}
```
### POST /product/:id/cart/:cartid

>Update existing cart and Product

_Request Header_
```
"<access token>"
```
_Request Params_
```
"<ProductId>"
"<CartId>"
```
_Request Body_
```
not needed
```
_Response (201 - Created)_
```
{
    "message": "Checkout success."
}
```
_Response (400 - Bad Request)_
```
[<validation error message>]
```
_Response (500 - Internal Server Error)_
```
{<errors message>}
```