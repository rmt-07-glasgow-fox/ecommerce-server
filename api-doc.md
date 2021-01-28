## **E-Commerce CMS**

### Post login

- **URL**
  `/login`

- **Method:**
  `POST`
- **Data Params**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```json
    {
      "access_token": "string",
      "email": "string"
    }
    ```

- **Error Response:**

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:**
    `json { "message": "Internal server error", } `
    OR

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:**
    ```json
    {
      "message": "Unauthorized. Something's went wrong check your email or password."
    }
    ```

- **Sample Call:**

  `localhost:3000/login`

### Post register

- **URL**
  `/register`

- **Method:**
  `POST`
- **Data Params**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```json
    {
      "id": "<user's id>",
      "email": "string"
    }
    ```

- **Error Response:**

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:**
    ```json
    {
      "message": "Internal server error"
    }
    ```

- **Sample Call:**

  `localhost:3000/register`

## Get All Products

- **URL**
  `/products`

- **Method:**
  `GET`
- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```json
    [
      {
        "id": "<id>",
        "name": "<product's name>",
        "image_url": "<product's image url>",
        "price": "<price>",
        "stock": "<stock>",
        "createdAt": "<created date>",
        "updatedAt": "<updated date>",
        "CategoryId": "<id>",
        "UserId": "<id>",
        "Category": {
          "id": "<id>",
          "name": "<category's name>",
          "createdAt": "<created date>",
          "updatedAt": "<updated date>",
          "UserId": "<id>"
        }
      },
      {
        "id": "<id>",
        "name": "<product's name>",
        "image_url": "<product's image url>",
        "price": "<price>",
        "stock": "<stock>",
        "createdAt": "<created date>",
        "updatedAt": "<updated date>",
        "CategoryId": "<id>",
        "UserId": "<id>",
        "Category": {
          "id": "<id>",
          "name": "<category's name>",
          "createdAt": "<created date>",
          "updatedAt": "<updated date>",
          "UserId": "<id>"
        }
      }
    ]
    ```

- **Error Response:**

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:**

    ```json
    {
      "message": "Internal server error"
    }
    ```

    OR

  - **Code:** 403 FORBIDDEN <br />
    **Content:**

    ```json
    {
      "message": "You don't have permission to access this site."
    }
    ```

    OR

  - **Code:** 403 FORBIDDEN <br />
    **Content:**
    ```json
    {
      "message": "You're not authorized to use this service."
    }
    ```

- **Sample Call:**

  `localhost:3000/products`

## Get Product By Id

- **URL**
  `/products/<product_id>`

- **Method:**
  `GET`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```json
    {
      "id": "<id>",
      "name": "<product's name>",
      "image_url": "<product's image url>",
      "price": "<price>",
      "stock": "<stock>",
      "createdAt": "<created date>",
      "updatedAt": "<updated date>",
      "CategoryId": "<id>",
      "UserId": "<id>",
      "Category": {
        "id": "<id>",
        "name": "<category's name>",
        "createdAt": "<created date>",
        "updatedAt": "<updated date>",
        "UserId": "<id>"
      }
    }
    ```

- **Error Response:**

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:**

    ```json
    {
      "message": "Internal server error"
    }
    ```

    OR

  - **Code:** 404 NOT FOUND <br />
    **Content:**

    ```json
    {
      "message": "Data not found."
    }
    ```

    OR

  - **Code:** 403 FORBIDDEN <br />
    **Content:**

    ```json
    {
      "message": "You don't have permission to access this site."
    }
    ```

    OR

  - **Code:** 403 FORBIDDEN <br />
    **Content:**
    ```json
    {
      "message": "You're not authorized to use this service."
    }
    ```

- **Sample Call:**

  `localhost:3000/products/<product_id>`

## Create a Product

- **URL**
  `/products`

- **Method:**
  `POST`
- **Data Params**

  **Content:**

  ```json
  {
    "name": "<product's name>",
    "image_url": "<product's image url>",
    "price": "<product's price>",
    "stock": "<product's stock>",
    "CategoryId": "<product's category id>"
  }
  ```

- **Headers**

  **Content**

  ```json
  {
    "access_token": "<access_token>"
  }
  ```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**

    ```json
    {
      "id": "<id>",
      "name": "<product's name>",
      "image_url": "<product's image url>",
      "price": "<price>",
      "stock": "<stock>",
      "createdAt": "<created date>",
      "updatedAt": "<updated date>",
      "CategoryId": "<id>",
      "UserId": "<id>"
    }
    ```

- **Error Response:**

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:**

    ```json
    {
      "message": "Internal server error"
    }
    ```

    OR

  - **Code:** 403 FORBIDDEN <br />
    **Content:**

    ```json
    {
      "message": "You don't have permission to access this site."
    }
    ```

    OR

  - **Code:** 403 FORBIDDEN <br />
    **Content:**
    ```json
    {
      "message": "You're not authorized to use this service."
    }
    ```

  OR

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:**
    ```json
    {
      "errors": ["<Fields is required>"]
    }
    ```

- **Sample Call:**

  `localhost:3000/products`

## Edit a Product By Id

- **URL**
  `/products/<product's id>`

- **Method:**
  `PUT`
- **Data Params**

  **Content:**

  ```json
  {
    "name": "<product's name>",
    "image_url": "<product's image url>",
    "price": "<product's price>",
    "stock": "<product's stock>",
    "CategoryId": "<product's category id>"
  }
  ```

- **Headers**

  **Content**

  ```json
  {
    "access_token": "<access_token>"
  }
  ```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**

    ```json
    {
      "message": "Success your product has been saved."
    }
    ```

- **Error Response:**

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:**

    ```json
    {
      "message": "Internal server error"
    }
    ```

    OR

  - **Code:** 403 FORBIDDEN <br />
    **Content:**

    ```json
    {
      "message": "You don't have permission to access this site."
    }
    ```

    OR

  - **Code:** 403 FORBIDDEN <br />
    **Content:**

    ```json
    {
      "message": "You're not authorized to use this service."
    }
    ```

    OR

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:**

    ````json
    {
      "errors": [ "<Fields is required>" ]
    } ```
    OR

    ````

  - **Code:** 404 NOT FOUND <br />
    **Content:**
    ```json
    {
      "message": "Data not found."
    }
    ```

- **Sample Call:**

  `localhost:3000/products/<product's id>`

## Delete a Product By Id

- **URL**
  `/products/<product's id>`

- **Method:**
  `DELETE`
- **Data Params**

  **Content:**

- **Headers**

  **Content**

  ```json
  {
    "access_token": "<access_token>"
  }
  ```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**

    ```json
    {
      "message": "Success your product has been saved."
    }
    ```

- **Error Response:**

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:**

    ```json
    {
      "message": "Internal server error"
    }
    ```

    OR

  - **Code:** 403 FORBIDDEN <br />
    **Content:**

    ```json
    {
      "message": "You don't have permission to access this site."
    }
    ```

    OR

  - **Code:** 403 FORBIDDEN <br />
    **Content:**
    ```json
    {
      "message": "You're not authorized to use this service."
    }
    ```

  OR

  - **Code:** 404 NOT FOUND <br />
    **Content:**
    ```json
    {
      "message": "Data not found."
    }
    ```

- **Sample Call:**

  `localhost:3000/products/<product's id>`

## Get All Banners

- **URL**
  `/banners`

- **Method:**
  `GET`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```json
    [
      {
        "id": "<banner's id>",
        "title": "<banner's title>",
        "status": "<banner's status>",
        "image_url": "<banner's image url>",
        "createdAt": "<banner's created at>",
        "updatedAt": "<banner's updated at>",
        "UserId": "<banner's user id>"
      }
    ]
    ```

- **Error Response:**

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:**

    ```json
    {
      "message": "Internal server error"
    }
    ```

    OR

  - **Code:** 403 FORBIDDEN <br />
    **Content:**

    ```json
    {
      "message": "You don't have permission to access this site."
    }
    ```

    OR

  - **Code:** 403 FORBIDDEN <br />
    **Content:**
    ```json
    {
      "message": "You're not authorized to use this service."
    }
    ```

- **Sample Call:**

  `localhost:3000/banners`

## Get Banner By Id

- **URL**
  `/banners/<banner's id>`

- **Method:**
  `GET`
- **Data Params**

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```json
    {
      "id": "<banner's id>",
      "title": "<banner's title>",
      "status": "<banner's status>",
      "image_url": "<banner's image url>",
      "createdAt": "<banner's created at>",
      "updatedAt": "<banner's updated at>",
      "UserId": "<banner's user id>"
    }
    ```

- **Error Response:**

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:**

    ```json
    {
      "message": "Internal server error"
    }
    ```

    OR

  - **Code:** 403 FORBIDDEN <br />
    **Content:**

    ```json
    {
      "message": "You don't have permission to access this site."
    }
    ```

    OR

  - **Code:** 403 FORBIDDEN <br />
    **Content:**
    ```json
    {
      "message": "You're not authorized to use this service."
    }
    ```

- **Sample Call:**

  `localhost:3000/banners/<banner's id>`

## Create a Banner

- **URL**
  `/banners`

- **Method:**
  `POST`
- **Data Params**

  **Content:**

  ```json
  {
    "title": "<banner's title>",
    "status": "<banner's status>",
    "image_url": "<banner's image url>"
  }
  ```

- **Headers**

  **Content**

  ```json
  {
    "access_token": "<access_token>"
  }
  ```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**

    ```json
    {
      "id": "<id>",
      "title": "<banner's title>",
      "status": "<banner's status>",
      "image_url": "<banner's image url>",
      "UserId": "<banner's user id>",
      "updatedAt": "<banner's updated at>",
      "createdAt": "<banner's created at>"
    }
    ```

- **Error Response:**

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:**

    ```json
    {
      "message": "Internal server error"
    }
    ```

    OR

  - **Code:** 403 FORBIDDEN <br />
    **Content:**

    ```json
    {
      "message": "You don't have permission to access this site."
    }
    ```

    OR

  - **Code:** 403 FORBIDDEN <br />
    **Content:**
    ```json
    {
      "message": "You're not authorized to use this service."
    }
    ```

  OR

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:**
    ```json
    {
      "errors": ["<Fields is required>"]
    }
    ```

- **Sample Call:**

  `localhost:3000/banners`

## Edit a Banner By Id

- **URL**
  `/banners`

- **Method:**
  `PUT`
- **Data Params**

  **Content:**

  ```json
  {
    "title": "<banner's title>",
    "status": "<banner's status>",
    "image_url": "<banner's image url>"
  }
  ```

- **Headers**

  **Content**

  ```json
  {
    "access_token": "<access_token>"
  }
  ```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**

    ```json
    {
      "message": "Success your banner has been saved."
    }
    ```

- **Error Response:**

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:**

    ```json
    {
      "message": "Internal server error"
    }
    ```

    OR

  - **Code:** 403 FORBIDDEN <br />
    **Content:**

    ```json
    {
      "message": "You don't have permission to access this site."
    }
    ```

    OR

  - **Code:** 403 FORBIDDEN <br />
    **Content:**
    ```json
    {
      "message": "You're not authorized to use this service."
    }
    ```

  OR

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:**

    ```json
    {
      "errors": ["<Fields is required>"]
    }
    ```

    OR

  - **Code:** 404 NOT FOUND <br />
    **Content:**
    ```json
    {
      "message": "Data not found."
    }
    ```

- **Sample Call:**

  `localhost:3000/banners/<banner's id>`

## Delete a Banner By Id

- **URL**
  `/banners`

- **Method:**
  `DELETE`
- **Data Params**

  **Content:**

- **Headers**

  **Content**

  ```json
  {
    "access_token": "<access_token>"
  }
  ```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**

    ```json
    {
      "message": "Success your banner has been deleted."
    }
    ```

- **Error Response:**

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:**

    ```json
    {
      "message": "Internal server error"
    }
    ```

    OR

  - **Code:** 403 FORBIDDEN <br />
    **Content:**

    ```json
    {
      "message": "You don't have permission to access this site."
    }
    ```

    OR

  - **Code:** 403 FORBIDDEN <br />
    **Content:**
    ```json
    {
      "message": "You're not authorized to use this service."
    }
    ```

  OR

  - **Code:** 404 NOT FOUND <br />
    **Content:**
    ```json
    {
      "message": "Data not found."
    }
    ```

- **Sample Call:**

  `localhost:3000/banners/<banner's id>`

## Get All Categories

- **URL**
  `/categories`

- **Method:**
  `GET`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```json
    [
      {
        "id": "<id>",
        "name": "<category's name>",
        "createdAt": "<created at>",
        "updatedAt": "<updated at>",
        "UserId": "<category's user id>"
      }
    ]
    ```

- **Error Response:**

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:**

    ```json
    {
      "message": "Internal server error"
    }
    ```

    OR

  - **Code:** 403 FORBIDDEN <br />
    **Content:**

    ```json
    {
      "message": "You don't have permission to access this site."
    }
    ```

    OR

  - **Code:** 403 FORBIDDEN <br />
    **Content:**
    ```json
    {
      "message": "You're not authorized to use this service."
    }
    ```

- **Sample Call:**

  `localhost:3000/categories`

## Get a Category By Id

- **URL**
  `/categories/<category's id>`

- **Method:**
  `GET`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```json
    {
      "id": "<id>",
      "name": "<category's name>",
      "createdAt": "<created at>",
      "updatedAt": "<updated at>",
      "UserId": "<category's user id>"
    }
    ```

- **Error Response:**

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:**

    ```json
    {
      "message": "Internal server error"
    }
    ```

    OR

  - **Code:** 403 FORBIDDEN <br />
    **Content:**

    ```json
    {
      "message": "You don't have permission to access this site."
    }
    ```

    OR

  - **Code:** 403 FORBIDDEN <br />
    **Content:**
    ```json
    {
      "message": "You're not authorized to use this service."
    }
    ```

- **Sample Call:**

  `localhost:3000/categories/<category's id>`

## Create a Category

- **URL**
  `/categories`

- **Method:**
  `POST`
- **Data Params**

  **Content:**

  ```json
  {
    "name": "<category's title>"
  }
  ```

- **Headers**

  **Content**

  ```json
  {
    "access_token": "<access_token>"
  }
  ```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**

    ```json
    {
      "id": "<id>",
      "name": "<category's name>",
      "createdAt": "<created at>",
      "updatedAt": "<updated at>",
      "UserId": "<category's user id>"
    }
    ```

- **Error Response:**

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:**
    ````json
    {
      "message": "Internal server error",
    } ```
    ````

  OR

  - **Code:** 403 FORBIDDEN <br />
    **Content:**

    ```json
    {
      "message": "You don't have permission to access this site."
    }
    ```

    OR

  - **Code:** 403 FORBIDDEN <br />
    **Content:**
    ```json
    {
      "message": "You're not authorized to use this service."
    }
    ```

  OR

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:**
    ```json
    {
      "errors": ["<Fields is required>"]
    }
    ```

- **Sample Call:**

  `localhost:3000/categories`

## Edit a Category By Id

- **URL**
  `/categories`

- **Method:**
  `PUT`
- **Data Params**

  **Content:**

  ```json
  {
    "name": "<category's name>"
  }
  ```

- **Headers**

  **Content**

  ```json
  {
    "access_token": "<access_token>"
  }
  ```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**

    ```json
    {
      "message": "Success your category has been saved."
    }
    ```

- **Error Response:**

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:**

    ```json
    {
      "message": "Internal server error"
    }
    ```

    OR

  - **Code:** 403 FORBIDDEN <br />
    **Content:**

    ```json
    {
      "message": "You don't have permission to access this site."
    }
    ```

    OR

  - **Code:** 403 FORBIDDEN <br />
    **Content:**
    ```json
    {
      "message": "You're not authorized to use this service."
    }
    ```

  OR

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:**

    ```json
    {
      "errors": ["<Fields is required>"]
    }
    ```

    OR

  - **Code:** 404 NOT FOUND <br />
    **Content:**
    ```json
    {
      "message": "Data not found."
    }
    ```

- **Sample Call:**

  `localhost:3000/categories/<category's id>`

## Delete a Category By Id

- **URL**
  `/categories`

- **Method:**
  `DELETE`
- **Data Params**

  **Content:**

- **Headers**

  **Content**

  ```json
  {
    "access_token": "<access_token>"
  }
  ```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**

    ```json
    {
      "message": "Success your category has been deleted."
    }
    ```

- **Error Response:**

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:**

    ```json
    {
      "message": "Internal server error"
    }
    ```

    OR

  - **Code:** 403 FORBIDDEN <br />
    **Content:**

    ```json
    {
      "message": "You don't have permission to access this site."
    }
    ```

    OR

  - **Code:** 403 FORBIDDEN <br />
    **Content:**
    ```json
    {
      "message": "You're not authorized to use this service."
    }
    ```

  OR

  - **Code:** 404 NOT FOUND <br />
    **Content:**
    ```json
    {
      "message": "Data not found."
    }
    ```

- **Sample Call:**

  `localhost:3000/categories/<category's id>`

## Get User's Shopping Cart

- **URL**
  `/carts`

- **Method:**
  `GET`

- **Headers**

  **Content**

  ```json
  {
    "access_token": "<access_token>"
  }
  ```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```json
    [
      {
        "id": "<cart's id>",
        "UserId": "<user's id>",
        "ProductId": "<product's id>",
        "amount": "<integer>",
        "status": "<boolean>",
        "createdAt": "<timestamp>",
        "updatedAt": "<timestamp>",
        "Product": {
          "id": "<product's id>",
          "name": "<product's name>",
          "image_url": "<product's image>",
          "price": "<product's price>",
          "stock": "<product's stock>",
          "createdAt": "<timestamp>",
          "updatedAt": "<timestamp>",
          "CategoryId": "<category's id>",
          "UserId": "<user's id>"
        }
      }
    ]
    ```

- **Error Response:**

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:**

    ```json
    {
      "message": "Internal server error"
    }
    ```

    OR

  - **Code:** 403 FORBIDDEN <br />
    **Content:**

    ```json
    {
      "message": "You don't have permission to access this site."
    }
    ```

    OR

  - **Code:** 403 FORBIDDEN <br />
    **Content:**
    ```json
    {
      "message": "You're not authorized to use this service."
    }
    ```

- **Sample Call:**

  `localhost:3000/carts`

## Get User's Order History

- **URL**
  `/carts/order/histories`

- **Method:**
  `GET`

- **Headers**

  **Content**

  ```json
  {
    "access_token": "<access_token>"
  }
  ```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```json
    [
      {
        "id": "<cart's id>",
        "UserId": "<user's id>",
        "ProductId": "<product's id>",
        "amount": "<integer>",
        "status": "<boolean>",
        "createdAt": "<timestamp>",
        "updatedAt": "<timestamp>",
        "Product": {
          "id": "<product's id>",
          "name": "<product's name>",
          "image_url": "<product's image>",
          "price": "<product's price>",
          "stock": "<product's stock>",
          "createdAt": "<timestamp>",
          "updatedAt": "<timestamp>",
          "CategoryId": "<category's id>",
          "UserId": "<user's id>"
        }
      }
    ]
    ```

- **Error Response:**

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:**

    ```json
    {
      "message": "Internal server error"
    }
    ```

    OR

  - **Code:** 403 FORBIDDEN <br />
    **Content:**

    ```json
    {
      "message": "You don't have permission to access this site."
    }
    ```

    OR

  - **Code:** 403 FORBIDDEN <br />
    **Content:**
    ```json
    {
      "message": "You're not authorized to use this service."
    }
    ```

- **Sample Call:**

  `localhost:3000/carts/order/histories`

## Add product to cart

- **URL**
  `/carts/:productId`

- **Method:**
  `POST`
- **Data Params**

  **Content:**

  ```json
  {
    "amount": "<integer>"
  }
  ```

- **Headers**

  **Content**

  ```json
  {
    "access_token": "<access_token>"
  }
  ```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**

    ```json
    {
      "id": "<cart's id>",
      "UserId": "<user's id>",
      "ProductId": "<product's id>",
      "amount": "<integer>",
      "updatedAt": "<timstamp>",
      "createdAt": "<timestamp>.",
      "status": "<boolean>"
    }
    ```

- **Error Response:**

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:**

    ```json
    {
      "message": "Internal server error"
    }
    ```

    OR

  - **Code:** 404 DATA NOT FOUND <br />
    **Content:**

    ```json
    {
      "message": "Data not found."
    }
    ```

    OR

  - **Code:** 403 FORBIDDEN <br />
    **Content:**
    ```json
    {
      "message": "You dont have permission to access this site."
    }
    ```

  OR

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:**
    ```json
    {
      "errors": ["<Fields is required>"]
    }
    ```

- **Sample Call:**

  `localhost:3000/carts/:productId`

## Delete product from cart

- **URL**
  `/carts/:productId`

- **Method:**
  `DELETE`

- **Headers**

  **Content**

  ```json
  {
    "access_token": "<access_token>"
  }
  ```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**

    ```json
    {
      "message": "Success your product has been removed."
    }
    ```

- **Error Response:**

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:**

    ```json
    {
      "message": "Internal server error"
    }
    ```

    OR

  - **Code:** 404 DATA NOT FOUND <br />
    **Content:**

    ```json
    {
      "message": "Data not found."
    }
    ```

    OR

  - **Code:** 403 FORBIDDEN <br />
    **Content:**
    ```json
    {
      "message": "You dont have permission to access this site."
    }
    ```

  OR

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:**
    ```json
    {
      "errors": ["<Fields is required>"]
    }
    ```

- **Sample Call:**

  `localhost:3000/carts/:productId`

## Checkout cart

- **URL**
  `/carts`

- **Method:**
  `PATCH`
- **Headers**

  **Content**

  ```json
  {
    "access_token": "<access_token>"
  }
  ```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**

    ```json
    {
      "message": "Your order has been processed."
    }
    ```

- **Error Response:**

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:**

    ```json
    {
      "message": "Internal server error"
    }
    ```

    OR

  - **Code:** 404 DATA NOT FOUND <br />
    **Content:**

    ```json
    {
      "message": "Data not found."
    }
    ```

    OR

  - **Code:** 403 FORBIDDEN <br />
    **Content:**
    ```json
    {
      "message": "You dont have permission to access this site."
    }
    ```

- **Sample Call:**

  `localhost:3000/carts`
