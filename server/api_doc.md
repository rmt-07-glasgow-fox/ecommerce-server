# Kang Bang Apps
​
List of available endpoints:
​
- `POST /login`
- `GET /contents`
- `GET /contents/:id`
- `POST /contents`
- `POST /contents/image`
- `PUT /contents/:id`
- `DELETE /contents/:id`
- `GET /banners`
- `GET /banners/:id`
- `POST /banners`
- `POST /banners/image`
- `PUT /banners/:id`
- `DELETE /banners/:id`


### POST /login

Request:

- data:

```json
{
  "password": "string",
  "email": "string"
}
```

Response:
- status: 201
- body:
  ​
```json
{
  "access_token": "string",
}
```

- status: 400
- body:
```json
{
    "message": "string"
}
```

- status: 500
- body:
```json
{
    "message": "string"
}
```

### GET /contents

Request:

- data:

dont need data

Response:
- status: 200
- body:
  ​
```json
{
  "id": "integer",
  "name": "string",
  "category": "string",
  "stock": "integer",
  "price": "double",
  "imageUrl":"string
}
```

- status: 401
- body:
```json
{
    "message": "string"
}
```

- status: 500
- body:
```json
{
    "message": "string"
}
```


### GET /contents/:id

Request:

- data:

dont need data

Response:
- status: 200
- body:
  ​
```json
{
  "id": "integer",
  "name": "string",
  "category": "string",
  "stock": "integer",
  "price": "double",
  "imageUrl":"string
}
```

- params: 
```json
{
  "id": "integer",
}
```


- status: 401
- body:
```json
{
    "message": "string"
}
```

- status: 500
- body:
```json
{
    "message": "string"
}
```



### POST /contents

Request:

- data:

```json
{
  "name": "string",
  "category": "string",
  "stock": "integer",
  "price": "double",
  "imageUrl":"string
}
```

Response:
- status: 200
- body:
  ​
```json
{
  "name": "string",
  "category": "string",
  "stock": "integer",
  "price": "double",
  "imageUrl":"string
}
```

- status: 401
- body:
```json
{
    "message": "string"
}
```

- status: 500
- body:
```json
{
    "message": "string"
}
```

### POST /contents/image

Request:

- data:

```json
{
  "file":"file"
}
```

Response:
- status: 200
- body:
  ​
```json
{
  "imageUrl":"string
}
```

- status: 401
- body:
```json
{
    "message": "string"
}
```

- status: 500
- body:
```json
{
    "message": "string"
}
```

### PUT /contents/:id

Request:

- data:
params :id

```json
{
  "name": "string",
  "category": "string",
  "stock": "integer",
  "price": "double",
  "imageUrl":"string
}
```

Response:
- status: 200
- body:
  ​
```json
{
  "message":"string"
}
```

- status: 401
- body:
```json
{
    "message": "string"
}
```

- status: 500
- body:
```json
{
    "message": "string"
}
```

### DELETE /contents/:id

Request:

- data:

params :id

Response:
- status: 200
- body:
  ​
```json
{
  "message":"string"
}
```

- status: 401
- body:
```json
{
    "message": "string"
}
```

- status: 500
- body:
```json
{
    "message": "string"
}
```


### GET /banners

Request:

- data:

dont need data

Response:
- status: 200
- body:
  ​
```json
{
  "id": "integer",
  "title": "string",
  "status": "boolean",
  "imageUrl":"string
}
```

- status: 401
- body:
```json
{
    "message": "string"
}
```

- status: 500
- body:
```json
{
    "message": "string"
}
```


### GET /banners/:id

Request:

- data:

dont need data

Response:
- status: 200
- body:
  ​
```json
{
  "id": "integer",
  "title": "string",
  "status": "boolean",
  "imageUrl":"string
}
```

- params: 
```json
{
  "id": "integer",
}
```


- status: 401
- body:
```json
{
    "message": "string"
}
```

- status: 500
- body:
```json
{
    "message": "string"
}
```

### POST /banners

Request:

- data:

```json
{
  "title": "string",
  "status": "boolean",
  "imageUrl":"string
}
```

Response:
- status: 200
- body:
  ​
```json
{
  "id": "integer",
  "title": "string",
  "status": "boolean",
  "imageUrl":"string
}
```

- status: 401
- body:
```json
{
    "message": "string"
}
```

- status: 500
- body:
```json
{
    "message": "string"
}
```

### POST /banners/image

Request:

- data:

```json
{
  "file":"file"
}
```

Response:
- status: 200
- body:
  ​
```json
{
  "imageUrl":"string
}
```

- status: 401
- body:
```json
{
    "message": "string"
}
```

- status: 500
- body:
```json
{
    "message": "string"
}
```

### PUT /contents/:id

Request:

- data:
params :id

```json
{
  "title": "string",
  "status": "boolean",
  "imageUrl":"string
}
```

Response:
- status: 200
- body:
  ​
```json
{
  "message":"string"
}
```

- status: 401
- body:
```json
{
    "message": "string"
}
```

- status: 500
- body:
```json
{
    "message": "string"
}
```

### DELETE /contents/:id

Request:

- data:

params :id

Response:
- status: 200
- body:
  ​
```json
{
  "message":"string"
}
```

- status: 401
- body:
```json
{
    "message": "string"
}
```

- status: 500
- body:
```json
{
    "message": "string"
}
```


