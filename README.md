# Used Aircraft (cms ecommerce)
> ### **Feature**
- [x] Rest API PostgreSQL + Sequelize
- [x] API Documentation
- [x] Auth 
- [x] TDD

> ### _**Deploy ‌**_
[https://server-used-aircraft.com](https://cms-used-aircraft.herokuapp.com/)

> ### _**Rocket 🚀‌**_
- [x] Banner
- [x] Category
- [x] Cloud Storage
- [x] Slide Show
- [x] Checkout
- [x] Wishlist
- [x] Send Email when Register / Checkout
- [x] Daftar Transaksi

> ### .env
SECRET_KEY=root
GOOGLE_USER='email' -email asli
GOOGLE_PASS='pass'     password email asli
---------------------------------------------------------------
## API LIST
| ROUTES            | METHODS | DESCRIPTION                    |
|-------------------|---------|--------------------------------|
| `/login`          | POST    | In Need To login user          |
| `/register`          | POST    | In Need To register user          |
| `/user`          | GET    | In Need To see user data         |
| `/products`       | POST    | In Need To add products        |
| `/products`       | GET     | In Need To see products        |
| `/products/:id`   | PUT     | In Need To update products     |
| `/products/:id`   | PATCH   | In Need To change categoryId   |
| `/products/:id`   | DELETE  | In Need To delete tasks        |
| `/categories`     | POST    | In Need To add categories      |
| `/categories`     | GET     | In Need To see categories      |
| `/categories/:id` | PATCH   | In Need To change name         |
| `/categories/:id` | PUT     | In Need To update categories   |
| `/categories/:id` | DELETE  | In Need To delete categories   |
| `/banner`         | POST    | In Need To add banner          |
| `/banner`         | GET     | In Need To see banner          |
| `/banner/:id`     | PATCH   | In Need To change status       |
| `/banner/:id`     | PUT     | In Need To update banner       |
| `/banner/:id`     | DELETE  | In Need To delete banner       |
| `/products/wishlist`         | GET     | In Need To see wishlist          |
| `/products/wishlist`         | POST    | In Need To add wishlist          |
| `/products/wishlist/:id`     | DELETE  | In Need To delete wishlist       |
| `/products/cart`         | GET     | In Need To see cart          |
| `/products/cart`         | POST    | In Need To add cart          |
| `/products/cart/:id`     | PATCH   | In Need To change status       |
| `/checkout`     | PATCH   | In Need To change status       |
| `/products/cart/:id`     | DELETE  | In Need To delete cart       |
-------------------
## ERROR RESPONSE 
| STATUS |       ERROR DESC                 |
|--------|-------------------------         |
|   400  | SequelizeDatabaseError           |
|   401  | InvalidUser                      |
|   400  | SequelizeUniqueConstraintError   |
|   404  | ResourceNotFound                 |
|   400  | SequelizeValidationError         |
|   500  | "detailed err name"              |

---------------------
## GUIDE
1. Clone this Repository
2. Install package based on package.json
3. create `.env` file with value that i mention in description 
5. Sequelize migrate and seed
4. start node with `npm run dev`

-------
**POST /login**
----
 Login into app.

* **URL**

  /login

* **Method:**

  `POST`
  
* **Req Body**

  **Required:**
  ```
    {
        "email": "<input email>",
        "password": "<input password>",
    }
  ```
    

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ``` json
    {
        "access_token": "<given by system>",
    }
 
* **Error Response:**

  * **Code:** 400 VALIDATION ERROR <br />
    **Content:** `{ SequelizeValidationError message }`
  
  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error messages }`
-----
**POST /register**
----
 register into app.

* **URL**

  /register

* **Method:**

  `POST`
  
* **Req Body**

  **Required:**
  ```
    {
        "email": "<input email>",
        "password": "<input password>",
    }
  ```
    

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ``` json
    {
        "id": "<given by system>",
        "email": "<email on database>"
    }
 
* **Error Response:**

  * **Code:** 400 VALIDATION ERROR <br />
    **Content:** `{ SequelizeValidationError message }`
  
  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error messages }`
-----
**POST /products**
----
 Insert product into app.

* **URL**

  /products

* **Method:**

  `POST`
  
* **Req Body**

  **Required:**
  ``` json
    {
        "name": "req.body.name",
        "image_url": "req.body.image_url",
        "price": "req.body.price",
        "stock": "req.body.stock",
        "description": "req.body.description",
        "categoryId": "req.body.categoryId"
    }
  ```
    

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ``` json
    {
        "id": "<given id by system>",
        "name": "data name",
        "image_url": "data image_url",
        "price": "data price",
        "stock": "data stock",
        "description": "data description",
        "categoryId": "data categoryId",
        "createdAt": "<given by sytem>",
        "updatedAt": "<given by sytem>"
    }
 
* **Error Response:**

  * **Code:** 400 VALIDATION ERROR <br />
    **Content:** `{ SequelizeValidationError message }`
  
  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error messages }`
-------
**GET /products**
----
  Returns json data task.

* **URL**

  /products

* **Method:**

  `GET`
  
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ``` json
    {
        "id": "<given id by system>",
        "name": "data name",
        "image_url": "data image_url",
        "price": "data price",
        "stock": "data stock",
        "description": "data description",
        "categoryId": "data categoryId",
        "createdAt": "<given by sytem>",
        "updatedAt": "<given by sytem>"
    }
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error messages }`
------
**PUT /products/:id**
----
  In Need To update products.

* **URL**

  /products/:id

* **Method:**

  `PUT`

* **Req Params**
  ``` json
    {
      "id": "<product id>",
    }
  ```
  **Required:**
  ``` json
    {
      "name": "data name",
      "image_url": "data image_url",
      "price": "data price",
      "stock": "data stock",
      "description": "data description",
      "categoryId": "data categoryId"
    }
  ```
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
     ``` json
    {
        "id": "<given id by system>",
        "name": "data name",
        "image_url": "data image_url",
        "price": "data price",
        "stock": "data stock",
        "description": "data description",
        "categoryId": "data categoryId",
        "createdAt": "<given by sytem>",
        "updatedAt": "<given by sytem>"
    }
 
* **Error Response:**

  * **Code:** 404 RESOURCE NOT FOUND <br />
    **Content:** `{ ResourceNotFound }`
  
  OR

  * **Code:** 400 VALIDATION ERROR <br />
    **Content:** `{ SequelizeValidationError message }`
  
  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error messages }`
------
**PATCH /products/:id**
----
 In Need To change categoryId 

* **URL**

  /products/:id

* **Method:**

  `PATCH`

* **Req Params**
   ``` json
    {
      "id": "<product id>",
    }
  ```
  **Required:**
  ``` json
    {
      "categoryId": "<category id>",
    }
  ```
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ``` json
    {
        "id": "<given id by system>",
        "name": "data name",
        "image_url": "data image_url",
        "price": "data price",
        "stock": "data stock",
        "description": "data description",
        "categoryId": "data categoryId",
        "createdAt": "<given by sytem>",
        "updatedAt": "<given by sytem>"
    }
 
* **Error Response:**

  * **Code:** 404 RESOURCE NOT FOUND <br />
    **Content:** `{ ResourceNotFound }`
  
  OR

  * **Code:** 400 VALIDATION ERROR <br />
    **Content:** `{ SequelizeValidationError message }`
  
  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error messages }`
------
**DELETE /products/:id**
----
 In Need To delete products 

* **URL**

  /products/:id

* **Method:**

  `DELETE`

* **Req Params**

  **Required:**
  ``` json
    {
      "id": "<products id>",
    }
  ```
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ``` json
    {
        "Aircraft success to delete"
    }
 
* **Error Response:**

  * **Code:** 404 RESOURCE NOT FOUND <br />
    **Content:** `{ ResourceNotFound }`
  
  OR

  * **Code:** 400 VALIDATION ERROR <br />
    **Content:** `{ SequelizeValidationError message }`
  
  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error messages }`
------
**POST /categories**
----
 Insert categories into app.

* **URL**

  /categories

* **Method:**

  `POST`
  
* **Req Body**

  **Required:**
  ``` json
    {
        "name": "<name of category>"
        
    }
  ```
    

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ``` json
    {
        "id": "<given id by system>",
        "name": "<name of category>",
        "createdAt": "<given by sytem>",
        "updatedAt": "<given by sytem>"
    }
 
* **Error Response:**

  * **Code:** 400 VALIDATION ERROR <br />
    **Content:** `{ SequelizeValidationError message }`
  
  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error messages }`
-------
**GET /categories**
----
  Returns json data categories.

* **URL**

  /categories

* **Method:**

  `GET`
  
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ``` json
    {
        "id": "<given id by system>",
        "name": "<name of category>",
        "createdAt": "<given by sytem>",
        "updatedAt": "<given by sytem>"
    }
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error messages }`
------
**PATCH /categories/:id**
----
 In Need To change name of categories 

* **URL**

  /categories/:id

* **Method:**

  `PATCH`

* **Req Params**
   ``` json
    {
      "id": "<category id>",
    }
  ```
  **Required:**
  ``` json
    {
      "name": "<category name>",
    }
  ```
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
   ``` json
    {
        "id": "<given id by system>",
        "name": "<name of category>",
        "createdAt": "<given by sytem>",
        "updatedAt": "<given by sytem>"
    }
 
* **Error Response:**

  * **Code:** 404 RESOURCE NOT FOUND <br />
    **Content:** `{ ResourceNotFound }`
  
  OR

  * **Code:** 400 VALIDATION ERROR <br />
    **Content:** `{ SequelizeValidationError message }`
  
  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error messages }`
------
**PUT /categories/:id**
----
  In Need To update categories.

* **URL**

  /categories/:id

* **Method:**

  `PUT`

* **Req Params**

  **Required:**
  ``` json
    {
      "id": "<category id>",
    }
  ```
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ``` json
    {
        "id": "<given id by system>",
        "name": "<name of category>",
        "createdAt": "<given by sytem>",
        "updatedAt": "<given by sytem>"
    }
 
* **Error Response:**

  * **Code:** 404 RESOURCE NOT FOUND <br />
    **Content:** `{ ResourceNotFound }`
  
  OR

  * **Code:** 400 VALIDATION ERROR <br />
    **Content:** `{ SequelizeValidationError message }`
  
  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error messages }`
------
**DELETE /categories/:id**
----
 In Need To delete categories 

* **URL**

  /categories/:id

* **Method:**

  `DELETE`

* **Req Params**

  **Required:**
  ``` json
    {
      "id": "<category id>",
    }
  ```
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ``` json
    {
        "category success to delete"
    }
 
* **Error Response:**

  * **Code:** 404 RESOURCE NOT FOUND <br />
    **Content:** `{ ResourceNotFound }`
  
  OR

  * **Code:** 400 VALIDATION ERROR <br />
    **Content:** `{ SequelizeValidationError message }`
  
  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error messages }`
------
**POST /banner**
----
 Insert banner into app.

* **URL**

  /banner

* **Method:**

  `POST`
  
* **Req Body**

  **Required:**
  ``` json
    {
        "title": "<title of banner>",
        "image_url": "<image_url of banner>",
        "status": "<status of banner>",
    }
  ```
    

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ``` json
    {
        "id": "<given id by system>",
        "name": "<name of banner>",
        "image_url": "<image_url of banner>",
        "status": "<status of banner>",
        "createdAt": "<given by sytem>",
        "updatedAt": "<given by sytem>"
    }
 
* **Error Response:**

  * **Code:** 400 VALIDATION ERROR <br />
    **Content:** `{ SequelizeValidationError message }`
  
  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error messages }`
-------
**GET /banner**
----
  Returns json data banner.

* **URL**

  /banner

* **Method:**

  `GET`
  
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ``` json
    {
        "id": "<given id by system>",
        "name": "<name of banner>",
        "image_url": "<image_url of banner>",
        "status": "<status of banner>",
        "createdAt": "<given by sytem>",
        "updatedAt": "<given by sytem>"
    }
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error messages }`
------
**PUT /banner/:id**
----
  In Need To update banner.

* **URL**

  /banner/:id

* **Method:**

  `PUT`

* **Req Params**
 ``` json
    {
      "id": "<banner id>",
    }
  ```
  **Required:**
  ``` json
    {
        "title": "<title of banner>",
        "image_url": "<image_url of banner>",
        "status": "<status of banner>",
    }
  ```
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ``` json
    {
        "id": "<given id by system>",
        "name": "<name of banner>",
        "image_url": "<image_url of banner>",
        "status": "<status of banner>",
        "createdAt": "<given by sytem>",
        "updatedAt": "<given by sytem>"
    }
 
* **Error Response:**

  * **Code:** 404 RESOURCE NOT FOUND <br />
    **Content:** `{ ResourceNotFound }`
  
  OR

  * **Code:** 400 VALIDATION ERROR <br />
    **Content:** `{ SequelizeValidationError message }`
  
  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error messages }`
------
**PATCH /banner/:id**
----
 In Need To change name of banner 

* **URL**

  /banner/:id

* **Method:**

  `PATCH`

* **Req Params**
   ``` json
    {
      "id": "<product id>",
    }
  ```
  **Required:**
  ``` json
    {
      "status": "<banner status>",
    }
  ```
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
   ``` json
    {
        "id": "<given id by system>",
        "name": "<name of banner>",
        "image_url": "<image_url of banner>",
        "status": "<status of banner>",
        "createdAt": "<given by sytem>",
        "updatedAt": "<given by sytem>"
    }
 
* **Error Response:**

  * **Code:** 404 RESOURCE NOT FOUND <br />
    **Content:** `{ ResourceNotFound }`
  
  OR

  * **Code:** 400 VALIDATION ERROR <br />
    **Content:** `{ SequelizeValidationError message }`
  
  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error messages }`
------
**DELETE /banner/:id**
----
 In Need To delete banner 

* **URL**

  /banner/:id

* **Method:**

  `DELETE`

* **Req Params**

  **Required:**
  ``` json
    {
      "id": "<banner id>",
    }
  ```
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ``` json
    {
        "banner Deleted"
    }
 
* **Error Response:**

  * **Code:** 404 RESOURCE NOT FOUND <br />
    **Content:** `{ ResourceNotFound }`
  
  OR

  * **Code:** 400 VALIDATION ERROR <br />
    **Content:** `{ SequelizeValidationError message }`
  
  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error messages }`
------
**POST /products/wishlist**
----
 Insert wishlist into app.

* **URL**

  /products/wishlist

* **Method:**

  `POST`
  
* **Req Body**


  **Required:**
  ``` json
    {
        "productId": "<FK ID>",
    }
  ```
    

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ``` json
    {
        "id": "<given id by system>",
        "userId": "<FK ID>",
        "productId": "<FK ID>",
        "createdAt": "<given by sytem>",
        "updatedAt": "<given by sytem>"
    }
 
* **Error Response:**

  * **Code:** 400 VALIDATION ERROR <br />
    **Content:** `{ SequelizeValidationError message }`
  
  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error messages }`
-------
**GET /products/wishlist**
----
  Returns json data wishlist.

* **URL**

  /products/wishlist

* **Method:**

  `GET`
  
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ``` json
    {
        "id": "<given id by system>",
        "userId": "<FK ID>",
        "productId": "<FK ID>",
        "createdAt": "<given by sytem>",
        "updatedAt": "<given by sytem>"
    }
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error messages }`
------
**DELETE /products/wishlist/:id**
----
 In Need To delete banner 

* **URL**

  /products/wishlist/:id

* **Method:**

  `DELETE`

* **Req Params**

  **Required:**
  ``` json
    {
      "id": "<wishlist id>",
    }
  ```
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ``` json
    {
        "wishlist Deleted"
    }
 
* **Error Response:**

  * **Code:** 404 RESOURCE NOT FOUND <br />
    **Content:** `{ ResourceNotFound }`
  
  OR

  * **Code:** 400 VALIDATION ERROR <br />
    **Content:** `{ SequelizeValidationError message }`
  
  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error messages }`
------
**POST /products/cart**
----
 Insert cart into app.

* **URL**

  /products/cart

* **Method:**

  `POST`
  
* **Req Body**


  **Required:**
  ``` json
    {
        "productId": "<FK ID>",
        "quantity" : "<Integer of any>"
    }
  ```
    

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ``` json
    {
        "id": "<given id by system>",
        "userId": "<FK ID>",
        "productId": "<FK ID>",
        "quantity": "<DB quantity>",
        "isBought" : "<Boolean>",
        "createdAt": "<given by sytem>",
        "updatedAt": "<given by sytem>"
    }
 
* **Error Response:**

  * **Code:** 400 VALIDATION ERROR <br />
    **Content:** `{ SequelizeValidationError message }`
  
  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error messages }`
-------
**GET /products/cart**
----
  Returns json data cart.

* **URL**

  /products/cart

* **Method:**

  `GET`
  
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ``` json
    {
        "id": "<given id by system>",
        "userId": "<FK ID>",
        "productId": "<FK ID>",
        "quantity": "<DB quantity>",
        "isBought" : "<Boolean>",
        "createdAt": "<given by sytem>",
        "updatedAt": "<given by sytem>"
    }
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error messages }`
------
**DELETE /products/cart/:id**
----
 In Need To delete Cart 

* **URL**

  /products/cart/:id

* **Method:**

  `DELETE`

* **Req Params**

  **Required:**
  ``` json
    {
      "id": "<Cart id>",
    }
  ```
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ``` json
    {
        "Cart Deleted"
    }
 
* **Error Response:**

  * **Code:** 404 RESOURCE NOT FOUND <br />
    **Content:** `{ ResourceNotFound }`
  
  OR

  * **Code:** 400 VALIDATION ERROR <br />
    **Content:** `{ SequelizeValidationError message }`
  
  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error messages }`
------
**PATCH /products/cart:id**
----
 In Need To change cart 

* **URL**

  /products/cart/:id

* **Method:**

  `PATCH`

* **Req Params**
   ``` json
    {
      "id": "<cart id>",
    }
  ```
  **Required:**
  ``` json
    {
      "quantity": "<quantity>",
    }
  ```
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ``` json
     {
        "id": "<given id by system>",
        "userId": "<FK ID>",
        "productId": "<FK ID>",
        "quantity": "<DB quantity>",
        "isBought" : "<Boolean>",
        "createdAt": "<given by sytem>",
        "updatedAt": "<given by sytem>"
    }
 
* **Error Response:**

  * **Code:** 404 RESOURCE NOT FOUND <br />
    **Content:** `{ ResourceNotFound }`
  
  OR

  * **Code:** 400 VALIDATION ERROR <br />
    **Content:** `{ SequelizeValidationError message }`
  
  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error messages }`
------
**PATCH /checkout**
----
 In Need To change cart 

* **URL**

  /checkout

* **Method:**

  `PATCH`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ``` json
     {
        "message": "Checkout Success"
    }
 
* **Error Response:**

  * **Code:** 404 RESOURCE NOT FOUND <br />
    **Content:** `{ ResourceNotFound }`
  
  OR

  * **Code:** 400 VALIDATION ERROR <br />
    **Content:** `{ SequelizeValidationError message }`
  
  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error messages }`
------
**GET /user**
----
  Returns json data user.

* **URL**

  /user

* **Method:**

  `GET`
  
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ``` json
    {
        "email": "admin@mail.com",
        "itemonwishlist": "[array]",
        "itemoncart": "[array]",
    }
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error messages }`
------
