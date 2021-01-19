# Kingame server
Kingame server is used for Kingame e-commerce web application. Kingame is a website for you to buy digital or physical copy PC games, console games, hand-held console games, you named it.

> P.S.: This app is still experimental and for educational purpose.

## Feature
 - Create, Read, Update, and Delete your task 

## Endpoints
This table is list of this app's API endpoint. You can see the detail in [API Documentation](https://github.com/Ralfarios/ecommerce-server/blob/main/api_doc.md). 

| Route              | Method      | Description                   | Authorization   |
| ------------------ | ----------- | ----------------------------- | --------------- |
| `/register`        | POST        | For register user             | Everyone        |
| `/login`           | POST        | For login user                | Everyone        |
| `/getuser`         | GET         | For get user information      | Everyone        |
|                                                                                    |
| `/product`         | POST        | For add product to list       | Admin           |
| `/product`         | GET         | For see product list          | Everyone        |
| `/product/:id`     | GET         | For see detailed              | Admin, Customer |
| `/product/:id`     | PUT         | For update product            | Admin           |
| `/product/:id`     | DELETE      | For delete product            | Admin           |
|                                                                                    |
| `/category`        | POST        | For add category to list      | Admin           |
| `/category`        | GET         | For see category list         | Everyone        |
| `/category/:id`    | GET         | For see detailed              | Everyone        |
| `/category/:id`    | PUT         | For update category           | Admin           |
| `/category/:id`    | DELETE      | For delete category           | Admin           |
|                                                                                    |
| `/banner`          | POST        | For add banner to list        | Admin           |
| `/banner`          | GET         | For see banner list           | Everyone        |
| `/banner/:id`      | GET         | For see detailed              | Everyone        |
| `/banner/:id`      | PUT         | For update banner             | Admin           |
| `/banner/:id`      | DELETE      | For delete banner             | Admin           |
<br>

## Getting Started
Before you start, make sure to make `.env` file on root project directory, and then fill it with your credential.
I already give you the example on `.env.example` file.

## Executing
You can test it by execute it with `$ npm run dev`.

## Any question?
Feel free to contact me!

## Credit
- [UI-Avatars](https://ui-avatars.com/)
