# API Documentations

# Table of contents

- [Product](#product)
  - [Create Product](#create-product)
  - [List Products](#list-products)
  - [Update Product](#update-product)
  - [Delete Product](#delete-product)
- [Category](#category)
  - [Create Category](#create-category)
  - [List Categories](#list-categories)
  - [Update Category](#update-category)
  - [Delete Category](#delete-category)
- [Banner](#Banner)
  - [Create Banner](#create-banner)
  - [List Banners](#list-banners)
  - [Update Banner](#update-banner)
  - [Delete Banner](#delete-banner)
- [User](#user)
  - [Login](#login)

# Product

## **Create Product**

Create a product.

- **URL**

  `/products`

- **Method:**

  `POST`

- **Request Header**

  **Required:**

  - Authorization (string)

  **Example:**

  - application/json
    ```json
    {
      "Authorization": "Bearer <JWT_TOKEN>"
    }
    ```

- **Request Body**

  **Required:**

  - name (string)
  - image_url (string)
  - price (integer)
  - stock (integer)
  - CategoryId (integer)

  **Example:**

  - application/json
    ```json
    {
      "name": "Product 1",
      "image_url": "https://blog.picniq.co.uk/wp-content/uploads/2020/02/birthday-cakes-for-kids-1024x567.jpg",
      "price": 100000,
      "stock": 10,
      "CategoryId": 1
    }
    ```

- **Success Response:**

  - **Code:** 201 <br />
    **Content:**
    ```json
    {
      "id": 1,
      "name": "Product 1",
      "image_url": "https://blog.picniq.co.uk/wp-content/uploads/2020/02/birthday-cakes-for-kids-1024x567.jpg",
      "price": 100000,
      "stock": 10,
      "CategoryId": 1,
      "updatedAt": "2021-01-12T19:55:01.964Z",
      "createdAt": "2021-01-12T19:55:01.964Z"
    }
    ```

- **Error Response:**

  - **Code:** 400 Bad Request <br />
    **Content:**

    ```json
    [
      {
        "message": "Name is required"
      }
    ]
    ```

    Or

    ```json
    [
      {
        "message": "Image url is required"
      }
    ]
    ```

    Or

    ```json
    [
      {
        "message": "Price is required"
      }
    ]
    ```

    Or

    ```json
    [
      {
        "message": "Price must greater than 0"
      }
    ]
    ```

    Or

    ```json
    [
      {
        "message": "Stock is required"
      }
    ]
    ```

    Or

    ```json
    [
      {
        "message": "Stock must greater than 0"
      }
    ]
    ```

    Or

    ```json
    [
      {
        "message": "Categery Id is required"
      }
    ]
    ```

  - **Code:** 404 Not Found <br />
    **Content:**

    ```json
    [
      {
        "message": "Category not found"
      }
    ]
    ```

  - **Code:** 403 Forbidden <br />
    **Content:**

    ```json
    [
      {
        "message": "You are not Admin"
      }
    ]
    ```

  - **Code:** 500 Internal Server Error <br />
    **Content:**
    ```json
    [
      {
        "message": "internal server error"
      }
    ]
    ```

- **Sample Call:**
  - **curl**:
    ```js
    curl --location --request POST 'http://localhost:3000/products/' --header 'Authorization: Bearer <TOKEN_JWT>' --data-urlencode 'name=Product 1' --data-urlencode 'image_url=https://blog.picniq.co.uk/wp-content/uploads/2020/02/birthday-cakes-for-kids-1024x567.jpg' --data-urlencode 'price=100000' --data-urlencode 'stock=10' --data-urlencode 'CategoryId=1'
    ```

## **List Products**

Show list products.

- **URL**

  `/products`

- **Method:**

  `GET`

- **Request Header**

  **Required:**

  - Authorization (string)

  **Example:**

  - application/json
    ```json
    {
      "Authorization": "Bearer <JWT_TOKEN>"
    }
    ```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```json
    [
      {
        "id": 1,
        "name": "Product 1",
        "image_url": "https://blog.picniq.co.uk/wp-content/uploads/2020/02/birthday-cakes-for-kids-1024x567.jpg",
        "price": 100000,
        "stock": 10,
        "CategoryId": 1,
        "createdAt": "2021-01-12T19:55:01.964Z",
        "updatedAt": "2021-01-12T19:55:01.964Z"
      }
    ]
    ```

- **Error Response:**

  - **Code:** 500 Internal Server Error <br />
    **Content:**
    ```json
    [
      {
        "message": "internal server error"
      }
    ]
    ```

- **Sample Call:**
  - **curl**:
    ```js
    curl --location --request GET 'http://localhost:3000/products' --header 'Authorization: Bearer <JWT_TOKE>'
    ```

## **Update Product**

Update Product.

- **URL**

  `/products/:id`

- **Method:**

  `PUT`

- **Request Header**

  **Required:**

  - Authorization (string)

  **Example:**

  - application/json
    ```json
    {
      "Authorization": "Bearer <JWT_TOKEN>"
    }
    ```

- **Request Params**

  - id (integer)

- **Request Body**

  **Required:**

  - name (string)
  - image_url (string)
  - price (integer)
  - stock (integer)
  - CategoryId (integer)

  **Example:**

  - application/json
    ```json
    {
      "name": "Product 1",
      "image_url": "https://blog.picniq.co.uk/wp-content/uploads/2020/02/birthday-cakes-for-kids-1024x567.jpg",
      "price": 100000,
      "stock": 10,
      "CategoryId": 1
    }
    ```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```json
    [1]
    ```

- **Error Response:**

  - **Code:** 400 Bad Request <br />
    **Content:**

    ```json
    [
      {
        "message": "Name is required"
      }
    ]
    ```

    Or

    ```json
    [
      {
        "message": "Image url is required"
      }
    ]
    ```

    Or

    ```json
    [
      {
        "message": "Price is required"
      }
    ]
    ```

    Or

    ```json
    [
      {
        "message": "Price must greater than 0"
      }
    ]
    ```

    Or

    ```json
    [
      {
        "message": "Stock is required"
      }
    ]
    ```

    Or

    ```json
    [
      {
        "message": "Stock must greater than 0"
      }
    ]
    ```

    Or

    ```json
    [
      {
        "message": "Categery Id is required"
      }
    ]
    ```

  - **Code:** 404 Not Found <br />
    **Content:**

    ```json
    [
      {
        "message": "Category not found"
      }
    ]
    ```

  - **Code:** 403 Forbidden <br />
    **Content:**

    ```json
    [
      {
        "message": "You are not Admin"
      }
    ]
    ```

  - **Code:** 500 Internal Server Error <br />
    **Content:**
    ```json
    [
      {
        "message": "internal server error"
      }
    ]
    ```

- **Sample Call:**
  - **curl**:
    ```js
    curl --location --request PUT 'http://localhost:3000/products/1' --header 'Authorization: Bearer <JWT_TOKEN>' --data-urlencode 'name=Product 1' --data-urlencode 'image_url=https://blog.picniq.co.uk/wp-content/uploads/2020/02/birthday-cakes-for-kids-1024x567.jpg' --data-urlencode 'price=100000' --data-urlencode 'stock=10' --data-urlencode 'CategoryId=1'
    ```

## **Delete Product**

Delete Product.

- **URL**

  `/products/:id`

- **Method:**

  `DELETE`

- **Request Header**

  **Required:**

  - Authorization (string)

  **Example:**

  - application/json
    ```json
    {
      "Authorization": "Bearer <JWT_TOKEN>"
    }
    ```

- **Request Params**

  - id (integer)

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**

    ```json
    {
      "message": "Product has been deleted"
    }
    ```

- **Error Response:**

  - **Code:** 404 Not Found <br />
    **Content:**

    ```json
    [
      {
        "message": "Product not found"
      }
    ]
    ```

  - **Code:** 403 Forbidden <br />
    **Content:**

    ```json
    [
      {
        "message": "You are not Admin"
      }
    ]
    ```

  - **Code:** 500 Internal Server Error <br />
    **Content:**
    ```json
    [
      {
        "message": "internal server error"
      }
    ]
    ```

- **Sample Call:**
  - **curl**:
    ```js
    curl --location --request DELETE 'http://localhost:3000/products/1' --header 'Authorization: Bearer <JWT_TOKEN>'
    ```

# Category

## **Create Category**

Create a Category.

- **URL**

  `/categories`

- **Method:**

  `POST`

- **Request Header**

  **Required:**

  - Authorization (string)

  **Example:**

  - application/json
    ```json
    {
      "Authorization": "Bearer <JWT_TOKEN>"
    }
    ```

- **Request Body**

  **Required:**

  - name (string)

  **Example:**

  - application/json
    ```json
    {
      "name": "Cake"
    }
    ```

- **Success Response:**

  - **Code:** 201 <br />
    **Content:**
    ```json
    {
      "id": 1,
      "name": "Cake",
      "updatedAt": "2021-01-13T05:49:42.087Z",
      "createdAt": "2021-01-13T05:49:42.087Z"
    }
    ```

- **Error Response:**

  - **Code:** 400 Bad Request <br />
    **Content:**

    ```json
    [
      {
        "message": "Name is required"
      }
    ]
    ```

  - **Code:** 403 Forbidden <br />
    **Content:**

    ```json
    [
      {
        "message": "You are not Admin"
      }
    ]
    ```

  - **Code:** 500 Internal Server Error <br />
    **Content:**
    ```json
    [
      {
        "message": "internal server error"
      }
    ]
    ```

- **Sample Call:**
  - **curl**:
    ```js
    curl --location --request POST 'http://localhost:3000/categories/' --header 'Authorization: Bearer <JWT_TOKEN>' --data-urlencode 'name=Cake'
    ```

## **List Categories**

Show list categories by Board.

- **URL**

  `/categories`

- **Method:**

  `GET`

- **Request Header**

  **Required:**

  - Authorization (string)

  **Example:**

  - application/json
    ```json
    {
      "Authorization": "Bearer <JWT_TOKEN>"
    }
    ```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```json
    [
      {
        "id": 1,
        "name": "Cake",
        "createdAt": "2021-01-13T05:49:42.087Z",
        "updatedAt": "2021-01-13T05:49:42.087Z"
      }
    ]
    ```

- **Error Response:**

  - **Code:** 500 Internal Server Error <br />
    **Content:**
    ```json
    [
      {
        "message": "internal server error"
      }
    ]
    ```

- **Sample Call:**
  - **curl**:
    ```js
    curl --location --request GET 'http://localhost:3000/categories' --header 'Authorization: Bearer <JWT_TOKEN>'
    ```

## **Update Category**

Update Category.

- **URL**

  `/categories/:id`

- **Method:**

  `PUT`

- **Request Header**

  **Required:**

  - Authorization (string)

  **Example:**

  - application/json
    ```json
    {
      "Authorization": "Bearer <JWT_TOKEN>"
    }
    ```

- **Request Params**

  - id (integer)

- **Request Body**

  **Required:**

  - name (string)

  **Example:**

  - application/json
    ```json
    {
      "name": "Cake"
    }
    ```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```json
    [1]
    ```

- **Error Response:**

  - **Code:** 400 Bad Request <br />
    **Content:**

    ```json
    [
      {
        "message": "Name is required"
      }
    ]
    ```

  - **Code:** 404 Not Found <br />
    **Content:**

    ```json
    [
      {
        "message": "Category not found"
      }
    ]
    ```

  - **Code:** 403 Forbidden <br />
    **Content:**

    ```json
    [
      {
        "message": "You are not Admin"
      }
    ]
    ```

  - **Code:** 500 Internal Server Error <br />
    **Content:**
    ```json
    [
      {
        "message": "internal server error"
      }
    ]
    ```

- **Sample Call:**
  - **curl**:
    ```js
    curl --location --request PUT 'http://localhost:3000/categories/1' --header 'Authorization: Bearer <JWT_TOKEN>' --data-urlencode 'name=Cake'
    ```

## **Delete Category**

Delete Category.

- **URL**

  `/categories/:id`

- **Method:**

  `DELETE`

- **Request Header**

  **Required:**

  - Authorization (string)

  **Example:**

  - application/json
    ```json
    {
      "Authorization": "Bearer <JWT_TOKEN>"
    }
    ```

- **Request Params**

  - id (integer)

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**

    ```json
    {
      "message": "Category has been deleted"
    }
    ```

- **Error Response:**

  - **Code:** 404 Not Found <br />
    **Content:**

    ```json
    [
      {
        "message": "Category not found"
      }
    ]
    ```

  - **Code:** 403 Forbidden <br />
    **Content:**

    ```json
    [
      {
        "message": "You are not Admin"
      }
    ]
    ```

  - **Code:** 500 Internal Server Error <br />
    **Content:**
    ```json
    [
      {
        "message": "internal server error"
      }
    ]
    ```

- **Sample Call:**
  - **curl**:
    ```js
    curl --location --request DELETE 'http://localhost:3000/categories/1' --header 'Authorization: Bearer <JWT_TOKEN>'
    ```

# Banner

## **Create Banner**

Create a Banner.

- **URL**

  `/banners`

- **Method:**

  `POST`

- **Request Header**

  **Required:**

  - Authorization (string)

  **Example:**

  - application/json
    ```json
    {
      "Authorization": "Bearer <JWT_TOKEN>"
    }
    ```

- **Request Body**

  **Required:**

  - title (string)
  - status (boolean)
  - image_url (string)

  **Example:**

  - application/json
    ```json
    {
      "title": "Cake",
      "status": true,
      "image_url": "https://blog.picniq.co.uk/wp-content/uploads/2020/02/birthday-cakes-for-kids-1024x567.jpg"
    }
    ```

- **Success Response:**

  - **Code:** 201 <br />
    **Content:**
    ```json
    {
      "id": 1,
      "title": "Cake",
      "status": true,
      "image_url": "https://blog.picniq.co.uk/wp-content/uploads/2020/02/birthday-cakes-for-kids-1024x567.jpg",
      "updatedAt": "2021-01-13T06:04:11.210Z",
      "createdAt": "2021-01-13T06:04:11.210Z"
    }
    ```

- **Error Response:**

  - **Code:** 400 Bad Request <br />
    **Content:**

    ```json
    [
      {
        "message": "Title is required"
      }
    ]
    ```

    Or

    ```json
    [
      {
        "message": "Status is required"
      }
    ]
    ```

    Or

    ```json
    [
      {
        "message": "Image url is required"
      }
    ]
    ```

  - **Code:** 403 Forbidden <br />
    **Content:**

    ```json
    [
      {
        "message": "You are not Admin"
      }
    ]
    ```

  - **Code:** 500 Internal Server Error <br />
    **Content:**
    ```json
    [
      {
        "message": "internal server error"
      }
    ]
    ```

- **Sample Call:**
  - **curl**:
    ```js
    curl --location --request POST 'http://localhost:3000/boards' --header 'Authorization: Bearer <JWT_TOKEN>' --data-urlencode 'title=Cake' --data-urlencode 'status=true' --data-urlencode 'image_url=https://blog.picniq.co.uk/wp-content/uploads/2020/02/birthday-cakes-for-kids-1024x567.jpg'
    ```

## **List Banners**

Show list Banners.

- **URL**

  `/banners`

- **Method:**

  `GET`

- **Request Header**

  **Required:**

  - Authorization (string)

  **Example:**

  - application/json
    ```json
    {
      "Authorization": "Bearer <JWT_TOKEN>"
    }
    ```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```json
    [
      {
        "id": 1,
        "title": "Cake",
        "status": true,
        "image_url": "https://blog.picniq.co.uk/wp-content/uploads/2020/02/birthday-cakes-for-kids-1024x567.jpg",
        "createdAt": "2021-01-13T06:04:11.210Z",
        "updatedAt": "2021-01-13T06:04:11.210Z"
      }
    ]
    ```

- **Error Response:**

  - **Code:** 500 Internal Server Error <br />
    **Content:**
    ```json
    [
      {
        "message": "internal server error"
      }
    ]
    ```

- **Sample Call:**
  - **curl**:
    ```js
    curl --location --request GET 'http://localhost:3000/banners' --header 'Authorization: Bearer <JWT_TOKEN>'
    ```

## **Update Banner**

Update Banner.

- **URL**

  `/banners/:id`

- **Method:**

  `PUT`

- **Request Header**

  **Required:**

  - Authorization (string)

  **Example:**

  - application/json
    ```json
    {
      "Authorization": "Bearer <JWT_TOKEN>"
    }
    ```

- **Request Params**

  - id (integer)

- **Request Body**

  **Required:**

  - title (string)
  - status (boolean)
  - image_url (string)

  **Example:**

  - application/json
    ```json
    {
      "title": "Cake",
      "status": true,
      "image_url": "https://blog.picniq.co.uk/wp-content/uploads/2020/02/birthday-cakes-for-kids-1024x567.jpg"
    }
    ```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```json
    [1]
    ```

- **Error Response:**

  - **Code:** 400 Bad Request <br />
    **Content:**

    ```json
    [
      {
        "message": "Title is required"
      }
    ]
    ```

    Or

    ```json
    [
      {
        "message": "Status is required"
      }
    ]
    ```

    Or

    ```json
    [
      {
        "message": "Image Url is required"
      }
    ]
    ```

  - **Code:** 404 Not Found <br />
    **Content:**

    ```json
    [
      {
        "message": "Banner not found"
      }
    ]
    ```

  - **Code:** 403 Forbidden <br />
    **Content:**

    ```json
    [
      {
        "message": "You are not Admin"
      }
    ]
    ```

  - **Code:** 500 Internal Server Error <br />
    **Content:**
    ```json
    [
      {
        "message": "internal server error"
      }
    ]
    ```

- **Sample Call:**
  - **curl**:
    ```js
    curl --location --request PUT 'http://localhost:3000/banners/1' --header 'Authorization: Bearer <JWT_TOKEN>' --data-urlencode 'title=Cake' --data-urlencode 'status=true' --data-urlencode 'image_url=https://blog.picniq.co.uk/wp-content/uploads/2020/02/birthday-cakes-for-kids-1024x567.jpg'
    ```

## **Delete Banner**

Delete Banner.

- **URL**

  `/banners/:id`

- **Method:**

  `DELETE`

- **Request Header**

  **Required:**

  - Authorization (string)

  **Example:**

  - application/json
    ```json
    {
      "Authorization": "Bearer <JWT_TOKEN>"
    }
    ```

- **Request Params**

  - id (integer)

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**

    ```json
    {
      "message": "Banner has been deleted"
    }
    ```

- **Error Response:**

  - **Code:** 404 Not Found <br />
    **Content:**

    ```json
    [
      {
        "message": "Banner not found"
      }
    ]
    ```

  - **Code:** 403 Forbidden <br />
    **Content:**

    ```json
    [
      {
        "message": "You are not Admin"
      }
    ]
    ```

  - **Code:** 500 Internal Server Error <br />
    **Content:**
    ```json
    [
      {
        "message": "internal server error"
      }
    ]
    ```

- **Sample Call:**
  - **curl**:
    ```js
    curl --location --request DELETE 'http://localhost:3000/banners/1' --header 'Authorization: Bearer <JWT_TOKEN>'
    ```

# User

## **Register**

Register user.

- **URL**

  `/users/register`

- **Method:**

  `POST`

- **Request Body**

  **Required:**

  - firstname (string)
  - lastname (string)
  - email (string)
  - password (string)

  **Example:**

  - application/json
    ```json
    {
      "firstname": "Ari",
      "lastname": "Bambang",
      "email": "ari@mail.com",
      "password": "1234567890"
    }
    ```

- **Success Response:**

  - **Code:** 201 <br />
    **Content:**
    ```json
    {
      "id": 1,
      "email": "ari@mail.com"
    }
    ```

- **Error Response:**

  - **Code:** 400 Bad Request <br />
    **Content:**

    ```json
    [
      {
        "message": "Firstname is required"
      }
    ]
    ```

    Or

    ```json
    [
      {
        "message": "Lastname is required"
      }
    ]
    ```

    Or

    ```json
    [
      {
        "message": "Email is required"
      }
    ]
    ```

    Or

    ```json
    [
      {
        "message": "Password is required"
      }
    ]
    ```

    Or

    ```json
    [
      {
        "message": "Password at least 6 characters"
      }
    ]
    ```

  - **Code:** 500 Internal Server Error <br />
    **Content:**
    ```json
    [
      {
        "message": "internal server error"
      }
    ]
    ```

- **Sample Call:**
  - **curl**:
    ```js
    curl --location --request POST 'http://localhost:3000/users/register' --data-urlencode 'firstname=ari' --data-urlencode 'lastname=bambang' --data-urlencode 'email=ari@mail.com' --data-urlencode 'password=1234567890'
    ```

## **Login**

Login user.

- **URL**

  `/users/login`

- **Method:**

  `POST`

- **Request Body**

  **Required:**

  - email (string)
  - password (string)

  **Example:**

  - application/json
    ```json
    {
      "email": "ari@mail.com",
      "password": "1234567890"
    }
    ```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```json
    {
      "access_token": "<JWT_TOKEN>"
    }
    ```

- **Error Response:**

  - **Code:** 400 Bad Request <br />
    **Content:**

    ```json
    [
      {
        "message": "Invalid email or password"
      }
    ]
    ```

  - **Code:** 500 Internal Server Error <br />
    **Content:**
    ```json
    [
      {
        "message": "internal server error"
      }
    ]
    ```

- **Sample Call:**
  - **curl**:
    ```js
    curl --location --request POST 'http://localhost:3000/users/login' --data-urlencode 'email=bambang@mail.com' --data-urlencode 'password=1234567890''
    ```
