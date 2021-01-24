# Kanban Board App
E Commerce CMS concerned on Building Materials
​
List of available endpoints:

- `POST /login`
​
Need an Authentication

- `GET /materials`
- `GET /materials/:id`
- `GET /materials/category/:category`
- `GET /banners`
- `GET /banners/:id`

Need an Authorization

- `POST /materials`
- `POST /banners`
- `PUT /materials/:id`
- `PUT /banners/:id`
- `DELETE /materials/:id`
- `DELETE /banners/:id`

### POST /login

Request:

- data:

```json
{
  "email": "string",
  "password": "string"
}
```

Response:

- status: 200
- body:
  ​

```json
{
    "id": "integer",
    "email": "string",
    "access_token": "jwt string"
}
```

Errors:
```json

{
"message": "Invalid email/password",
"code": 401,
"from": "Controller User: login user"
},
{
"message": "Invalid email/password",
"code": 400,
"from": "Controller User: login user"
},
{
"message": "Internal server error",
"code": 500,
"from": "Controller User: login user"
}

```

### GET /materials

description: 
  get all material list (all category)

Request:

- headers: access_token (string)

Response:

- status: 200
- body:

```json
[
  {
  "id": 1,
  "name": "Besi Beton",
  "image_url": "https://i0.wp.com/supplierkayuindonesia.com/wp-content/uploads/2019/03/Harga-Kayu-Ulin-per-kubik.jpg?resize=680%2C350&ssl=1",
  "category": "besi",
  "price": 100000,
  "stock": 100
  },
  {
  "id": 2,
  "name": "Pasir Sungai",
  "image_url": "https://i0.wp.com/supplierkayuindonesia.com/wp-content/uploads/2019/03/Harga-Kayu-Ulin-per-kubik.jpg?resize=680%2C350&ssl=1",
  "category": "pasir",
  "price": 200000,
  "stock": 200
  }
]
```

Errors:
```json

{
"message": "Internal server error",
"code": 500,
"from": "Controller Material: show all material"
}

```

### GET /banners

description: 
  get all banner list

Request:

- headers: access_token (string)

Response:

- status: 200
- body:

```json
[
  {
  "id": 1,
  "title": "Big Sale",
  "image_url": "https://i0.wp.com/supplierkayuindonesia.com/wp-content/uploads/2019/03/Harga-Kayu-Ulin-per-kubik.jpg?resize=680%2C350&ssl=1",
  "status": "available"
  } ,
  {
  "id": 2,
  "title": "Banner Toko",
  "image_url": "https://i0.wp.com/supplierkayuindonesia.com/wp-content/uploads/2019/03/Harga-Kayu-Ulin-per-kubik.jpg?resize=680%2C350&ssl=1",
  "status": "available"
  }
]

```

Errors:
```json

{
"message": "Internal server error",
"code": 500,
"from": "Controller Banner: show all banner"
}

```

### GET /materials/:id

description: 
  get single material requested by its id

Request:

- headers: access_token (string)

Response:

- status: 200
- body:

```json
{
  "id": 1,
  "name": "Besi Beton",
  "image_url": "https://i0.wp.com/supplierkayuindonesia.com/wp-content/uploads/2019/03/Harga-Kayu-Ulin-per-kubik.jpg?resize=680%2C350&ssl=1",
  "category": "doing",
  "price": 100000,
  "stock": 100
}
```

Errors:
```json

{
"message": "Internal server error",
"code": 500,
"from": "Controller Material: show material by id"
}

```

### GET /banners/:id

description: 
  get single banner requested by its id

Request:

- params: id (integer)

- headers: access_token (string)

Response:

- status: 200
- body:

```json
{
  "id": 2,
  "title": "Banner Toko",
  "image_url": "https://i0.wp.com/supplierkayuindonesia.com/wp-content/uploads/2019/03/Harga-Kayu-Ulin-per-kubik.jpg?resize=680%2C350&ssl=1",
  "status": "available"
}
```

Errors:
```json

{
"message": "Internal server error",
"code": 500,
"from": "Controller Banner: show one banner"
}

```

### GET /materials/category/:category

description: 
  get materials sorted by its category 

Request:

- params: category (string)

- headers: access_token (string)

Response:

- status: 200
- body:

```json
[
  {
  "id": 1,
  "name": "Besi Beton",
  "image_url": "https://i0.wp.com/supplierkayuindonesia.com/wp-content/uploads/2019/03/Harga-Kayu-Ulin-per-kubik.jpg?resize=680%2C350&ssl=1",
  "category": "besi",
  "price": 100000,
  "stock": 100
  },
  {
  "id": 2,
  "name": "Besi Murni",
  "image_url": "https://i0.wp.com/supplierkayuindonesia.com/wp-content/uploads/2019/03/Harga-Kayu-Ulin-per-kubik.jpg?resize=680%2C350&ssl=1",
  "category": "besi",
  "price": 200000,
  "stock": 200
  }
]
```

Errors:
```json
{
"message": "Internal server error",
"code": 500,
"from": "Controller Material: show materal by category"
}
```

### POST /materials

description: 
  create/add single material

Request:

- headers: access_token (string)

- body: 
```json
{
  "name": "string",
  "image_url": "string",
  "category": "string",
  "price": "integer",
  "stock": "integer"
}
```

Response:

- status: 201
- body:

```json
{
  "id": 1,
  "name": "Besi Beton",
  "image_url": "https://i0.wp.com/supplierkayuindonesia.com/wp-content/uploads/2019/03/Harga-Kayu-Ulin-per-kubik.jpg?resize=680%2C350&ssl=1",
  "category": "doing",
  "price": 100000,
  "stock": 100
}
```

Errors:
```json

{
"message": "Internal server error",
"code": 500,
"from": "Controller Material: create material"
}

```

### POST /banners

description: 
  create single banner

Request:

- headers: access_token (string)

- body:
``` json
{
  "title": "string",
  "image_url": "string",
  "status": "available"
}
```

Response:

- status: 200
- body:

```json
{
  "id": 2,
  "title": "Banner Toko",
  "image_url": "https://i0.wp.com/supplierkayuindonesia.com/wp-content/uploads/2019/03/Harga-Kayu-Ulin-per-kubik.jpg?resize=680%2C350&ssl=1",
  "status": "available"
}
```

Errors:
```json
{
"message": "Internal server error",
"code": 500,
"from": "Controller Banner: create banner"
}
```

### PUT /materials/:id

description: 
  update material requsted by its id

Request:

- params: id (integer)

- headers: access_token (string)

- body:
``` json
{
  "name": "string",
  "image_url": "string",
  "category": "string",
  "price": "integer",
  "stock": "integer"
}
```

Response:

- status: 200
- body:

```json
{
  "name": "Besi Beton",
  "image_url": "https://i0.wp.com/supplierkayuindonesia.com/wp-content/uploads/2019/03/Harga-Kayu-Ulin-per-kubik.jpg?resize=680%2C350&ssl=1",
  "category": "doing",
  "price": 100000,
  "stock": 100
}
```

Errors:
```json
{
  "message": "Item not found!",
  "code": 404,
  "from": "Controller Material: update material"
},
{
  "message": "Internal server error",
  "code": 500,
  "from": "Controller Material: update material"
}
```

### PUT /banners/:id

description: 
  update banner requsted by its id

Request:

- params: id (integer)

- headers: access_token (string)

- body:
``` json
{
  "title": "string",
  "image_url": "string",
  "status": "string"
}
```

Response:

- status: 200
- body:

```json
{
  "title": "Banner Toko",
  "image_url": "https://i0.wp.com/supplierkayuindonesia.com/wp-content/uploads/2019/03/Harga-Kayu-Ulin-per-kubik.jpg?resize=680%2C350&ssl=1",
  "status": "available"
}
```

Errors:
```json
{
  "message": "Item not found!",
  "code": 404,
  "from": "Controller Banner: update banner"
},
{
  "message": "Internal server error",
  "code": 500,
  "from": "Controller Banner: update banner"
}
```

### DELETE /materials/:id

description: 
  delete single material requested by its id

Request:

- params: id (integer)

- headers: access_token (string)

Response:

- status: 200
- body:

```json
{
  "message": "Item successfully deleted!"
}
```

Errors:
```json
{
  "message": "Item not found!",
  "code": 404,
  "from": "Controller Material: delete material"
},
{
  "message": "Internal server error",
  "code": 500,
  "from": "Controller Material: delete material"
}
```

### DELETE /banners/:id

description: 
  delete single banner requested by its id

Request:

- params: id (integer)

- headers: access_token (string)

Response:

- status: 200
- body:

```json
{
  "message": "Item successfully deleted!"
}
```

Errors:
```json
{
  "message": "Item not found!",
  "code": 404,
  "from": "Controller Banner: delete banner"
},
{
  "message": "Internal server error",
  "code": 500,
  "from": "Controller Banner: delete banner"
}
```



