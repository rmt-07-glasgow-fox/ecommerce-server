<!-- # Kanban API

Kanban App is an application that helps you track the tasks you need to do. This app has:

- RESTful endpoint for kanban's CRUD operation
- JSON formatted response

&nbsp;

## List of available endpoints

- `POST /register`
- `POST /login`
- `GET /tasks`
- `POST /tasks`
- `PUT /tasks/:id`
- `PATCH /tasks/:id`
- `DELETE /tasks/:id`

&nbsp;

# POST /register

_Request Header_

```
not needed
```

_Request Body_

```
{
  "name": "Amanda",
  "email": "amanda@mail.com",
  "password": "12345"
}
```

_Success Response_

```
code: 201

content:
{
    "id": 1,
    "email": "amanda@mail.com"
}
```

_Error Response_

```
code: 400

content:
{
    "message": [
        "Please fill out your name",
        "Please fill out your name",
        "Email format is not valid",
        "Please fill out your name",
        "Password must be at least 4 to 10 characters"
    ]
}

OR

content:
{
  "message" : "Please register with a different email"
}

OR

code: 500

content:
{
  "message" : "internal server error"
}
```

&nbsp;

# GET /login

_Request Header_

```
not needed
```

_Request Body_

```
{
  "email": "amanda@mail.com",
  "password": "12345"
}
```

_Success Response_

```
code: 200

content:
{
  "access_token": "<access token>"
}
```

_Error Response_

```
code: 404

content:
{
    "message": "Password or Email is not valid"
}


code: 500

content:
{
  "message" : "internal server error"
}
```

&nbsp;

# GET /tasks

_Request Header_

```
{
  "access_token": "<access token>"
}
```

_Success Response_

```
code: 200

content:
[
    {
        "id": 1,
        "title": "Menyelesaikan Tugas Kanban",
        "category": "todo",
        "importance": "urgent",
        "UserId": 1,
        "createdAt": "2021-01-12T11:09:34.420Z",
        "updatedAt": "2021-01-12T13:38:43.594Z"
    },
    {
        "id": 2,
        "title": "Tidur tepat waktu",
        "category": "backlog",
        "importance": "important",
        "UserId": 2,
        "createdAt": "2021-01-12T11:10:23.648Z",
        "updatedAt": "2021-01-12T13:39:23.899Z"
    }
]
```

_Error Response_

```
code: 401

content:
{
    "message": "JWT must be provided"
}

OR

code: 500

content:
{
  "message": "internal server error"
}
```

&nbsp;

# POST /tasks

_Request Header_

```
{
  "access_token": "<access token>"
}
```

_Request Body_

```
{
  "title": "Belajar Vue",
  "category": "todo",
  "importance": "important"
}
```

_Success Response_

```
code: 201

content:
{
    "id": 3,
    "title": "Belajar Vue",
    "category": "todo",
    "importance": "important",
    "UserId": 2,
    "updatedAt": "2021-01-12T14:32:28.433Z",
    "createdAt": "2021-01-12T14:32:28.433Z"
}
```

_Error Response_

```
code: 400

content:
{
    "message": [
        "Please write down your task"
    ]
}

OR

code: 500

content:
{
  "message" : "internal server error"
}
```

&nbsp;

# PUT /tasks/:id

_Request Header_

```
{
  "access_token": "<access token>"
}
```

_Request Body_

```
{
  "title": "Belajar Bootstrap",
  "category": "backlog",
  "importance": "urgent"
}
```

_Request Params_

```
id : 1
```

_Success Response_

```
code: 200

content:
{
    "id": 1,
    "title": "Belajar Bootstrap",
    "category": "todo",
    "importance": "urgent",
    "UserId": 1,
    "createdAt": "2021-01-12T11:09:34.420Z",
    "updatedAt": "2021-01-12T14:36:58.795Z"
}
```

_Error Response_

```
code: 400

content:
{
    "message": [
        "Please write down your task"
    ]
}

OR

code: 401

content:
{
    "message": "JWT must be provided"
}

OR

{
    "message": "access denied"
}

code: 500

content:
{
  "message" : "internal server error"
}
```

&nbsp;

# PATCH /tasks/:id

_Request Header_

```
{
  "access_token": "<access token>"
}
```

_Request Body_

```
{
  "category": "important"
}
```

_Request Params_

```
id : 1
```

_Success Response_

```
code: 200

content:
{
    "id": 1,
    "title": "Belajar Bootstrap",
    "category": "todo",
    "importance": "important",
    "UserId": 1,
    "createdAt": "2021-01-12T11:09:34.420Z",
    "updatedAt": "2021-01-12T14:41:51.201Z"
}
```

_Error Response_

```
code: 401

content:
{
    "message": "access denied"
}

code: 404

content:
{
    "message": "resource not found"
}

code: 500

content:
{
  "message" : "internal server error"
}
```

&nbsp;

# DELETE /tasks/id

_Request Header_

```
{
  "access_token": "<access token>"
}
```

_Request Body_

```
not needed
```

_Request Params_

```
id : 1
```

_Success Response_

```
code: 200

content:
{
    "message": "Task succesfully deleted"
}
```

_Error Response_

```
code: 401

content:
{
    "message": "access denied"
}

code: 404

content:
{
    "message": "resource not found"
}

code: 500

content:
{
  "message" : "internal server error"
}
``` -->
