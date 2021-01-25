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

>delete existing product

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