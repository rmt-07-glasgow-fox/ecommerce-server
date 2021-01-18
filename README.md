# ecommerce-server

This server is built with test suites with TDD.

### Products

**Create Product**
----

* **URL**
  /products

* **Method:** 
  `POST`

*  **URL Params**

    None

* **Data Params**
    
    **Content:** `{ 
    name: "nice headset",
    image_url: "https://media.wired.com/photos/5e7164aeb9399f00096a2ae6/1:1/w_1800,h_1800,c_limit/Gear-Mont-Blanc-Smart-Headphones-Gold-Front-SOURCE-Mont-Blanc.jpg",
    price: 120000,
    stock: 5
    }
    `

* **Success Response:**
  
    * **Code:** 201 OK <br />
    **Content:** `{ 
    id: 1,
    name: "nice headset",
    image_url: "https://media.wired.com/photos/5e7164aeb9399f00096a2ae6/1:1/w_1800,h_1800,c_limit/Gear-Mont-Blanc-Smart-Headphones-Gold-Front-SOURCE-Mont-Blanc.jpg",
    price: 120000,
    stock: 5,
    updatedAt: "2021-01-18T10:38:05.747Z",
    createdAt: "2021-01-18T10:38:05.747Z"
    }
    `

* **Error Response:**

  * **Code:** 400 Bad Request <br />
      **Content:** `{
      "errors": [
        "Name required",
        "Image_url required",
        "Price required",
        "Stock required"
      ]
      }
      `

    OR

  * **Code:** 400 Bad Request <br />
      **Content:** `{
      "errors": [
        "Price should be greater than zero",
        "Stock should be greater than zero"
      ]
      }
      `
    OR

  * **Code:** 400 Bad Request <br />
      **Content:** `{
      "errors": [
        "Price must be a valid number",
        "Stock must be a valid number"
      ]
      }
      `
    OR

  * **Code:** 500 Internal Server Error <br />
    **Content:** `{
      "errors": [
        "Internal server error"
      ]
      }
      `

* **Sample Call:**

    `localhost:3000/products`



