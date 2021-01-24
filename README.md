# CMS App Server
CMS App is an application to show product list. This app has:
* RESTful endpoint for asset's CRUD operation
* Using Vue as client
* Using Express JS as server
* Using Postgress and sequelize as Database

&nbsp;

## USAGE
- Make sure you have Node.js and npm in your computer and then run `npm install`.
- In order to get access to all of the routes, you will need a `JWT(JSON Web Token) Token` which will be generated automatically after you sign in successfully.
- For start the server: `npm run dev`.

&nbsp;


## RESTful endpoints
### GET /tasks

> Get all Tasks list

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
none
```

_Response (200)_
```json
[
{
        "id": 12,
        "name": "Shoes",
        "image_url": "http:/image...... .jpg",
        "price": 2999999,
        "stock": 5,
    },
    ...
]
```

_Response(401- Unauthorized)_
```
{
    "Error": "Invalid Authentication",
    "message": "The requested page needs a username and a password."
}
```

_Response (500 - Internal Server Error)_
```
{
    "Error": "Error from Server",
    "message": "Internal server error"
}
```
---

### POST /tasks

> Create new Task

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
[
{
        "name": "<name to get insert into>",
        "image_url": "<image url to get insert into>",
        "price": "<price to get insert into>",
        "stock": "<stock to get insert into>",,
    },
]
```

_Response (201 - Created)_
```json
{
    "id": 12,
    "name": "Shoes",
    "UserId": 1
    "image_url": "http:/image...... .jpg",
    "price": 2999999,
    "stock": 5,
}
```

_Response(400- bad request)_
```
{
    "Error": "Validation error",
    "message": "Title cannot empty,Cannot input an older date than now"
}
```

_Response(401- Unauthorized)_
```
{
    "Error": "Invalid Authentication",
    "message": "The requested page needs a username and a password."
}
```

_Response (500 - Internal Server Error)_
```
{
    "Error": "Error from Server",
    "message": "Internal server error"
}
```

---

### GET /tasks/:id

> get Tasks list by id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
none
```

_Response (200)_
```json
{
    "id": 12,
    "name": "Shoes",
    "UserId": 1
    "image_url": "http:/image...... .jpg",
    "price": 2999999,
    "stock": 5,
}
```

_Response(401- Unauthorized)_
```
{
    "Error": "Invalid Authentication",
    "message": "The requested page needs a username and a password."
}
```

_Response(403- Forbidden)_
```
{
    "Error": "Forbidden access",
    "message": "You are not authorized to access the file"
}
```

_Response(404 - not found)_
```
{
    "Error": "Invalid Id",
    "message": "Data not found"
}
```

_Response (500 - Internal Server Error)_
```
{
    "Error": "Error from Server",
    "message": "Internal server error"
}
```
---

### PUT /tasks/:id

> Update Task list by ID

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{

  "title": "<title to get updated later on>",
  "CategoryId": "<Category to get updated later on>"
}
```


_Response(200)_
```json
{
    "message": "data have been updated" 
}
```

_Response(401- Unauthorized)_
```
{
    "Error": "Invalid Authentication",
    "message": "Invalid email / password"
}
```

_Response(403- Forbidden)_
```
{
    "Error": "Forbidden access",
    "message": "You are not authorized to access the file"
}
```

_Response(404 - not found)_
```
{
    "Error": "Invalid Id",
    "message": "Data not found"
}

```

_Response(400- bad request)_
```
{
    "Error": "Validation error",
    "message": "Title cannot empty,Cannot input an older date than now"
}
```

_Response (500 - Internal Server Error)_
```
{
    "Error": "Error from Server",
    "message": "Internal server error"
}
```
---

### DELETE /tasks/:id

>Delete Task list by ID

_Request Header_
```
{
  "access_token": "<your access token>"
}
```


_Request Body_
selected Task data by User

_Response(200)_
```json
{
    "message": "data have been updated" 
}
```

_Response(401- Unauthorized)_
```
{
    "Error": "Invalid Authentication",
    "message": "Invalid email / password"
}
```

_Response(403- Forbidden)_
```
{
    "Error": "Forbidden access",
    "message": "You are not authorized to access the file"
}
```

_Response(404 - not found)_
```
{
    "Error": "Invalid Id",
    "message": "Data not found"
}

```

_Response (500 - Internal Server Error)_
```
{
    "Error": "Error from Server",
    "message": "Internal server error"
}
```

---

### POST /register

>Create User

_Request Header_
```
none
```

_Request Body_
```json
{
    "email": "<User's email>",
    "password": "<User's password>"
    
}
```

_Response(201)_
```json
{
    "id": 22,
    "email": "admin31@mail.com"
}
```


_Response(400- bad request)_
```
{
    "Error": "Bad request",
    "message": "Invalid email / password"
}
```


_Response (500)_
```
{
    "Error": "Error from Server",
    "message": "Internal server error"
}
```

### POST/login

> Login User

_Request Header_
```
none
```


_Request Body_
```json
{

    "email": "<User's email>",
    "password": "<User's password>"
    
}
```

_Response(200)_
```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJhZG1pbjJAbWFpbC5jb20iLCJpYXQiOjE2MTA3MjY4MDV9.FZIlb4E0MygIiUHgF4qBqY8y6e5zfzMvHE9BzDmgdBU"
}
```


_Response(400- bad request)_
```
{
    "Error": "Bad request",
    "message": "Invalid email / password"
}
```
_Response (500)_
```
{
    "Error": "Error from Server",
    "message": "Internal server error"
}
```
