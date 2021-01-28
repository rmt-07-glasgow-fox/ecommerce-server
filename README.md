# ecommerce-server

#

CMS for eCommerce Server

&nbsp;


# ecommerce_server


```
ecommerce admin cms

admin login
email : admin@mail.com
password : 12341234

env
SECRET_KEY=thisIssecr3tKeyCMS
```

## Restful endpoints
#
# URL
```
Client URL : http://localhost:8080/ || https://ecommerce-cms-gg.web.app/
Server URL : http://localhost:3000/ || https://ecommerce-cms-gg.herokuapp.com/
```

### GET/login
>login

_Request Header_
```
none
```
_Request Body_
```
email : admin@mail.com
password : 12341234
```
_Response(200)_
```
{
  access_token : "token string"
}
```
_Response(404)_
```
{
  message : 'email is not registered'
}
```
_Response(400)_
```
{
  message : "invalid"
}
```
_Response(400)_
```
{
  message : "field can not be empty"
}
```
_Response(500)_
```
{
  message : "internal server error"
}
```
### POST /products
>create product

_Request Header_
```
access_token : 'token string'
```
_Request Body_
```
{
   "id": 14,
    "name": "Carrier 40L",
    "imageUrl": "https://apollo-singapore.akamaized.net/v1/files/tobzbt92dr192-ID/image;s=850x0",
    "price": 600000,
    "stock": 8,
}
```
_Response(201)_
```
{
   "id": 14,
    "name": "Carrier 40L",
    "imageUrl": "https://apollo-singapore.akamaized.net/v1/files/tobzbt92dr192-ID/image;s=850x0",
    "price": 600000,
    "stock": 8,
}
```
_Response(404)_
```
{
  message : 'email is not registered'
}
```
_Response(400)_
```
{
  message : "invalid"
}
```
_Response(400)_
```
{
  message : "field can not be empty"
}
```
_Response(500)_
```
{
  message : "internal server error"
}
```

### GET /products
>fetch all products

_Request Header_
```
access_token : 'token string'
```
_Request Body_
```
{
  none
}
```
_Response(200)_
```
{
  "products": [
        {
          "id": 14,
           "name": "Carrier 40L",
           "imageUrl": "https://apollo-singapore.akamaized.net/v1/files/tobzbt92dr192-ID/image;s=850x0",
           "price": 600000,
           "stock": 8,
           "createdAt": "2021-01-24T07:29:35.574Z",
           "updatedAt": "2021-01-24T07:29:35.574Z"
        },
        ...
  ]
}
```
_Response(500)_
```
{
  message : "internal server error"
}
```

### GET /products/:id
>find by id

_Request Header_
```
access_token : 'token string'
```
_Request Body_
```
{
  none
}
```
_Request Params_
```
{
  id : 3
}
```
_Response(200)_
```
{
  {
    "id": 14,
    "name": "Carrier 40L",
    "imageUrl": "https://apollo-singapore.akamaized.net/v1/files/tobzbt92dr192-ID/image;s=850x0",
    "price": 600000,
    "stock": 8,
    "createdAt": "2021-01-24T07:29:35.574Z",
    "updatedAt": "2021-01-24T07:29:35.574Z"
  },
}
```
_Response(500)_
```
{
  message : "internal server error"
}
```
### put /products/:id
>edit product

_Request Header_
```
access_token : 'token string'
```
_Request Params_
```
id : 3
```
_Request Body_
```
{
    "name": "Carrier 40L",
    "imageUrl": "https://apollo-singapore.akamaized.net/v1/files/tobzbt92dr192-ID/image;s=850x0",
    "price": 600000,
    "stock": 8,
}
```
_Response(200)_
```
{ 
    "id": 14,
    "name": "Carrier 40L",
    "imageUrl": "https://apollo-singapore.akamaized.net/v1/files/tobzbt92dr192-ID/image;s=850x0",
    "price": 600000,
    "stock": 8,
}
```
_Response(404)_
```
{ 
  "message": "product not found"
}
```
_Response(401)_
```
{ 
  "message": "please logoin first"
}
```
_Response(401)_
```
{ 
  "message": "you are unable to access this content"
}
```
_Response(400)_
```
{ 
  "message": [
    "stock must be 0 or more",
    "Price must be 0 or more",
    "stock must be a number",
    "price must be a number"
  ]
}
```
### delete /products/:id
>delete product

_Request Header_
```
access_token : 'token string'
```
_Request Params_
```
id : 3
```
_Request Body_
```
{
  none
}
```
_Response(200)_
```
{ 
  "message": "succesfully delete a product"
}
```
_Response(401)_
```
{ 
  "message": "please logoin first"
}
```
_Response(401)_
```
{ 
  "message": "you are unable to access this content"
}
```
### GET/register
>register

_Request Header_
```
none
```
_Request Body_
```
email : badi@mail.com
password : 123412
```
_Response(200)_
```
{
  {
    "id": 3,
    "email": "badi@mail.com",
    "password": "$2a$08$OXugZS7CtcODtT5Nd8/lbe1e5dJbQr4aBkykkJ0JdCDbofyIym.Yi",
    "role": "user",
    "updatedAt": "2020-12-15T03:43:40.823Z",
    "createdAt": "2020-12-15T03:43:40.823Z"
    }
}
```
_Response(400)_
```
{
  {
    "messages": [
        "email must be unique",
        "must be between 6 to 20 characters"
    ]
  }
}
```
### POST/carts
>creat or edit a cart for customer

_Request Header_
```
access_token: 'string'
```
_Request Body_
```
productId: number
```
_Response(201)_
```
{
  {
    "id": 28,
    "UserId": 3,
    "ProductId": 3,
    "quantity": 1,
    "status": false,
    "updatedAt": "2020-12-16T14:14:42.460Z",
    "createdAt": "2020-12-16T14:14:42.460Z"
  }
}
```
_Response(200)_
```
[
    1,
    [
        {
            "id": 28,
            "UserId": 3,
            "ProductId": 3,
            "status": false,
            "quantity": 2,
            "createdAt": "2020-12-16T14:14:42.460Z",
            "updatedAt": "2020-12-16T14:15:25.494Z"
        }
    ]
]

or

{
  message: 'successfully delete a cart'
}
```
_Response(401)_
```
{
  message: 'out of stock'
}
```
_Response(500)_
```
{
  message: 'internal server error'
}
```
### GET/carts
>fetch all unpaid carts for customer

_Request Header_
```
access_token: 'string'
```
_Request Body_
```
none
```
_Response(200)_
```
{
    "totalPrice": 600000,
    "carts": [
        {
            "id": 28,
            "UserId": 3,
            "ProductId": 3,
            "status": false,
            "quantity": 2,
            "createdAt": "2020-12-16T14:14:42.460Z",
            "updatedAt": "2020-12-16T14:15:25.494Z",
            "Product": {
                  "id": 3,
    							"name": "Carrier 40L",
    							"imageUrl": "https://apollo-singapore.akamaized.net/v1/files/tobzbt92dr192-ID/image;s=850x0",
    							"price": 600000,
    							"stock": 8,
    							"createdAt": "2021-01-24T07:29:35.574Z",
    							"updatedAt": "2021-01-24T07:29:35.574Z"
            }
        }
    ]
}
```
_Response(500)_
```
{
  message: 'internal server error'
}
```
### GET/carts/histories
>fetch histories for customer

_Request Header_
```
access_token: 'string'
```
_Request Body_
```
none
```
_Response(200)_
```
"carts": [
        {
            "id": 28,
            "UserId": 3,
            "ProductId": 3,
            "status": true,
            "quantity": 2,
            "createdAt": "2020-12-16T14:14:42.460Z",
            "updatedAt": "2020-12-16T14:15:25.494Z",
            "Product": {
                 "id": 14,
    							"name": "Carrier 40L",
    							"imageUrl": "https://apollo-singapore.akamaized.net/v1/files/tobzbt92dr192-ID/image;s=850x0",
    							"price": 600000,
    							"stock": 8,
    							"createdAt": "2021-01-24T07:29:35.574Z",
    							"updatedAt": "2021-01-24T07:29:35.574Z"
            }
        }
    ]
```
_Response(500)_
```
{
  message: 'internal server error'
}
```
### DELETE/carts/
>delete a cart for customer

_Request Header_
```
access_token: 'string'
```
_Request Body_
```
cartId
```
_Response(200)_
```
{
  message: 'succesfully deleted an item'
}
```
_Response(500)_
```
{
  message: 'internal server error'
}
```
### DELETE/carts/
>checkout all active cart for customer

_Request Header_
```
access_token: 'string'
```
_Request Body_
```
none
```
_Response(200)_
```
{
  {
    "success": [
        [
            1,
            [
                {
                     "id": 14,
    									"name": "Carrier 40L",
    									"imageUrl": "https://apollo-singapore.akamaized.net/v1/files/tobzbt92dr192-ID/image;s=850x0",
    									"price": 600000,
    									"stock": 8,
    									"createdAt": "2021-01-24T07:29:35.574Z",
    									"updatedAt": "2021-01-24T07:29:35.574Z"
                }
            ]
        ],
        [
            1,
            [
                {
                    "id": 28,
                    "UserId": 3,
                    "ProductId": 3,
                    "status": true,
                    "quantity": 2,
                    "createdAt": "2020-12-16T14:14:42.460Z",
                    "updatedAt": "2020-12-16T14:26:22.830Z"
                }
            ]
        ]
    ]
}
}
```
_Response(400)_
```
  {
    message: [
      'failed to buy {product-name}',
      ...
 		]
	}
```
