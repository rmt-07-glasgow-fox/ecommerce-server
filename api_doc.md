# E-Commerce API Documentation
For make you easier to develop this app, I make a documentation about API endpoints.


| Route            | Method      | Description                   | Authorization |
| ---------------- | ----------- | ----------------------------- | ------------- |
| `/register`      | POST        | For register user             | Everyone      |
| `/login`         | POST        | For login user                | Everyone      |
| `/glogin`        | POST        | For login user with Google    | Everyone      |
| `/getuser`       | GET         | For get user information      | Everyone      |
|                                                                                |
| `/product`       | POST        | For add product to list       | Admin         | 
| `/product`       | GET         | For see product list          | Everyone      |
| `/product/:id`   | GET         | For see detailed              | Everyone      |
| `/product/:id`   | PUT         | For update product            | Admin         |
| `/product/:id`   | PATCH       | For change status product     | Admin         |
| `/product/:id`   | DELETE      | For delete product            | Admin         |
|                                                                                |
| `/banner`        | POST        | For add banner to list        | Admin         | 
| `/banner`        | GET         | For see banner list           | Everyone      |
| `/banner/:id`    | GET         | For see detailed              | Everyone      |
| `/banner/:id`    | PUT         | For update banner             | Admin         |
| `/banner/:id`    | PATCH       | For change status banner      | Admin         |
| `/banner/:id`    | DELETE      | For delete banner             | Admin         |
<br>

## Detailed Endpoints
### POST /register
_Request Header_
```
Unneeded
```

_Request Body_
```json
{
  "firstname": "<your firstname>",
  "lastname": "<your lastname>",
  "email": "<your email>",
  "password": "<your password>"
}
```

_Response (201)_
```json
{
  "id": "<your id>",
  "firstname": "<your firstname>",
  "lastname": "<your lastname>",
  "email": "<your email>"
}
```

_Response (400)_
```json
{
  "name": "SequelizeValidationError"
}
```

_Response (409)_
```json
{
  "name": "SequelizeUniqueConstraintError"
}
```

### POST /login
_Request Header_
```
Unneeded
```

_Request Body_
```json
{
  "email": "<your email>",
  "password": "<your password>"
}
```

_Response (200)_
```json
{
"access_token": "<your access token>"
}
```

_Response (401)_
```json
{
  "name": "invalidLogin"
}
```