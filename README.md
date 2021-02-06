# E-COMMERCE API DOCUMENTATION

### URL : https://ecom-server-samm021.herokuapp.com
#

1. POST /products 
    * url:   
        - `https://ecom-server-samm021.herokuapp.com/products`

    * Request header
    > ```json
    > { 
    >    "Content-Type": "application/json",
    >    "access_token": "access_token"   
    > }
    >```

    * Request body
    > ```json
    > {
    >   "name": "Long Sleeve Shirts",
    >   "url": "https://hm-media-prod.s3.amazonaws.com/pub/media/catalog/product/medium/8bc82e3259b31dabb24cd24222e85541aab310b1_xxl-1.jpg",
    >   "price": 300000,
    >   "stock": 20,
    >   "CategoryId": 4
    > } 
    > ```

    * Success Response
    > ```json
    > {
    >   "id": 1,
    >   "name": "Long Sleeve Shirts",
    >   "url": "https://hm-media-prod.s3.amazonaws.com/pub/media/catalog/product/medium/8bc82e3259b31dabb24cd24222e85541aab310b1_xxl-1.jpg",
    >   "price": 300000,
    >   "stock": 20,
    >   "status": "in stock",
    >   "CategoryId": 4,
    >   "createdAt": "2021-01-23T13:12:17.825Z",
    >   "updatedAt": "2021-01-23T13:12:17.825Z",
    >
    > } 
    > ```

    * Error Response

        1. Server error (500)
        
        > ```json
        > { 
        >    "message": "Internal Server Error"  
        > }
        >```

        2.  Invalid access token (401)
        
        > ```json
        > { 
        >    "message": "Please log in first"  
        > }
        >```

        3. Sequelize validation error (400)
        > ```json
        > { 
        >    "message": "Please input product name" 
        > }
        >```
        4. Not Authorized (403)
        > ```json
        > { 
        >    "message": "You're not authorized to access this item" 
        > }
        >```

2. GET /products
    * url:     
        - `https://ecom-server-samm021.herokuapp.com/products`

    * Success Response
    > ```json
    >   [
    >    {
    >        "id": 1,
    >        "name": "Long Sleeve Shirts",
    >        "url": "https://hm-media-prod.s3.amazonaws.com/pub/media/catalog/product/medium/8bc82e3259b31dabb24cd24222e85541aab310b1_xxl-1.jpg",
    >        "price": 300000,,
    >        "stock": 20,
    >        "CategoryId": 4,
    >        "Category": {
    >           "name": "Shirts"
    >    },
    >    {
    >        "id": 2,
    >        "name": "White Shoes",
    >        "url": "https://hm-media-prod.s3.amazonaws.com/pub/media/catalog/product/medium/3568bb42980078415119d3bf0edb2a9c4fbb3d14_xxl-1.jpg",
    >        "price": 400000,,
    >        "stock": 10,
    >        "CategoryId": 5,
    >        "Category": {
    >           "name": "Shoes"     
    >         }
    >   ]
    > ```

    * Error Response

        1. Server error (500)
        > ```json
        > { 
        >    "message": "Internal Server Error" 
        > }
        >```

3.  GET /products/:id
    * url: 
        - `https://ecom-server-samm021.herokuapp.com/products/:id`

    * Request Params
    > ```json
    > {
    >   "id": 1
    > }

    * Success Response
    > ```json
    > {
    >   "id": 1,
    >   "name": "Long Sleeve Shirts",
    >   "url": "https://hm-media-prod.s3.amazonaws.com/pub/media/catalog/product/medium/8bc82e3259b31dabb24cd24222e85541aab310b1_xxl-1.jpg",
    >   "price": 300000,
    >   "stock": 20,
    >   "status": "in stock",
    >   "CategoryId": 4,
    >   "Category": {
    >         "name": "Shirts"
    >     }
    >
    > } 
    > ```

    * Error Response

        1. Not found (404)
        > ```json
        > { 
        >    "message": "Not Found" 
        > }
        >```

        3. Server error (500)
        > ```json
        > { 
        >    "message": "Internal Server Error" 
        > }
        >```

4. PUT /products/:id
    * url: 
        - `https://ecom-server-samm021.herokuapp.com/products/:id`

    * Request header
    > ```json
    > { 
    >    "Content-Type": "application/json",
    >    "access_token": "access_token"   
    > }
    >```

    * Request Params
    > ```json
    > {
    >   "id": 1
    > }

    * Request Body
    > ```json
    > {
    >   "name": "Long Sleeve Shirts",
    >   "url": "https://hm-media-prod.s3.amazonaws.com/pub/media/catalog/product/medium/8bc82e3259b31dabb24cd24222e85541aab310b1_xxl-1.jpg",
    >   "price": 200000,
    >   "stock": 0,
    >   "CategoryId": 4,
    > } 
    > ```


    * Success Response
    > ```json
    > {
    >   "id": 1,
    >   "name": "Long Sleeve Shirts",
    >   "url": "https://hm-media-prod.s3.amazonaws.com/pub/media/catalog/product/medium/8bc82e3259b31dabb24cd24222e85541aab310b1_xxl-1.jpg",
    >   "price": 200000,
    >   "stock": 0,
    >   "status": "out of stock",
    >   "CategoryId": 4,
    >   "createdAt": "2021-01-23T13:12:17.825Z",
    >   "updateddAt": "2021-01-23T13:12:17.825Z",
    >
    > } 
    > ```
    > ```

    * Error Response

        1. Not found (404)
        > ```json
        > { 
        >    "message": "Not Found" 
        > }
        >```

        2. Not Authorized (403)
        > ```json
        > { 
        >    "message": "You're not authorized to access this item" 
        > }
        >```

        3.  Invalid access token (401)
        
        > ```json
        > { 
        >    "message": "Please log in first"  
        > }
        >```

        4. Server error (500)
        > ```json
        > { 
        >    "message": "Internal Server Error" 
        > }
        >```
        5. Sequelize Validation error (400)
        > ```json
        > { 
        >    "message": "Please input product name" 
        > }
        >```
        
5. DELETE /products/:id
    * url: 
        - `https://ecom-server-samm021.herokuapp.com/products/:id`

    * Request header
    > ```json
    > { 
    >    "Content-Type": "application/json",
    >    "access_token": "access_token" 
    > }
    >```

    * Request Params
    > ```json
    > {
    >   "id": 1
    > }

    * Success Response
    > ```json
    > {
    >   "message": "Success, product deleted"
    > }
    > ```

    * Error Response

        1. Not found (404)
        > ```json
        > { 
        >    "message": "Not Found" 
        > }
        >```

        2. Not Authorized (403)
        > ```json
        > { 
        >    "message": "You're not authorized to access this item" 
        > }
        >```

        3.  Invalid access token (401)
        
        > ```json
        > { 
        >    "message": "Please log in first"  
        > }
        >```

        4. Server error (500)
        > ```json
        > { 
        >    "message": "Internal Server Error" 
        > }
        >```

6. POST /categories 
    * url:   
        - `https://ecom-server-samm021.herokuapp.com/categories`

    * Request header
    > ```json
    > { 
    >    "Content-Type": "application/json",
    >    "access_token": "access_token"   
    > }
    >```

    * Request body
    > ```json
    > {
    >   "name": "Underwear",
    > ```

    * Success Response
    > ```json
    > {
    >   "id": 5,
    >   "name": "Underwear",
    >   "createdAt": "2021-01-23T13:12:17.825Z",
    >   "updatedAt": "2021-01-23T13:12:17.825Z",
    >
    > } 
    > ```
    * Error Response

        1. Server error (500)
        
        > ```json
        > { 
        >    "message": "Internal Server Error"  
        > }
        >```

        2.  Invalid access token (401)
        
        > ```json
        > { 
        >    "message": "Please log in first"  
        > }
        >```

        3. Sequelize validation error (400)
        > ```json
        > { 
        >    "message": "Please input category name" 
        > }
        >```

        4. Not Authorized (403)
        > ```json
        > { 
        >    "message": "You're not authorized to access this item" 
        > }
        >```

7. GET /categories
    * url:     
        - `https://ecom-server-samm021.herokuapp.com/categories`

    * Success Response
    > ```json
    >   [
    >    {
    >        "id": 1,
    >        "name": "Basics",
    >    },
    >    {
    >        "id": 2,
    >        "name": "Shorts",  
    >         }
    >   ]
    > ```
    * Error Response

        1. Server error (500)
        > ```json
        > { 
        >    "message": "Internal Server Error" 
        > }
        >```

8. DELETE /categories/:id
    * url: 
        - `https://ecom-server-samm021.herokuapp.com/categories/:id`

    * Request header
    > ```json
    > { 
    >    "Content-Type": "application/json",
    >    "access_token": "access_token" 
    > }
    >```

    * Request Params
    > ```json
    > {
    >   "id": 1
    > }

    * Success Response
    > ```json
    > {
    >   "message": "Success, category deleted"
    > }
    > ```

    * Error Response

        1. Not found (404)
        > ```json
        > { 
        >    "message": "Not Found" 
        > }
        >```

        2. Not Authorized (403)
        > ```json
        > { 
        >    "message": "You're not authorized to access this item" 
        > }
        >```

        3.  Invalid access token (401)
        
        > ```json
        > { 
        >    "message": "Please log in first"  
        > }
        >```

        4. Server error (500)
        > ```json
        > { 
        >    "message": "Internal Server Error" 
        > }
        >```

9. POST /banners 
    * url:   
        - `https://ecom-server-samm021.herokuapp.com/banners`

    * Request header
    > ```json
    > { 
    >    "Content-Type": "application/json",
    >    "access_token": "access_token"   
    > }
    >```

    * Request body
    > ```json
    > {
    >   "name": "Chinese New Year Banner",
    >   "url": "https://d29c1z66frfv6c.cloudfront.net/pub/media/banner/W02_HOMEPAGE_LADIES_MEN_START_NEW.jpg"
    > ```

    * Success Response
    > ```json
    > {
    >   "id": 5,
    >   "name": "Chinese New Year Banner",
    >   "url": "https://d29c1z66frfv6c.cloudfront.net/pub/media/banner/W02_HOMEPAGE_LADIES_MEN_START_NEW.jpg",
    >   "createdAt": "2021-01-23T13:12:17.825Z",
    >   "updatedAt": "2021-01-23T13:12:17.825Z",
    >
    > } 
    > ```
    * Error Response

        1. Server error (500)
        
        > ```json
        > { 
        >    "message": "Internal Server Error"  
        > }
        >```

        2.  Invalid access token (401)
        
        > ```json
        > { 
        >    "message": "Please log in first"  
        > }
        >```

        3. Sequelize validation error (400)
        > ```json
        > { 
        >    "message": "Please input banner name" 
        > }
        >```

        4. Not Authorized (403)
        > ```json
        > { 
        >    "message": "You're not authorized to access this item" 
        > }
        >```

10. GET /banners
    * url:     
        - `https://ecom-server-samm021.herokuapp.com/banners`

    * Success Response
    > ```json
    >   [
    >    {
    >        "id": 1,
    >        "name": "Chinese New Year Banner",
    >        "url": "https://d29c1z66frfv6c.cloudfront.net/pub/media/banner/W02_HOMEPAGE_LADIES_MEN_START_NEW.jpg",
    >    },
    >    {
    >        "id": 2,
    >        "name": "Chinese New Year Banner 2",
    >         "url": "https://d29c1z66frfv6c.cloudfront.net/pub/media/banner/W03_HOMEPAGE_KIDS_CNY_ITS_THE_YEAR.jpg"
    >         }
    >   ]
    > ```
    * Error Response

        1. Server error (500)
        > ```json
        > { 
        >    "message": "Internal Server Error" 
        > }
        >```


11. DELETE /banners/:id
    * url: 
        - `https://ecom-server-samm021.herokuapp.com/banners/:id`

    * Request header
    > ```json
    > { 
    >    "Content-Type": "application/json",
    >    "access_token": "access_token" 
    > }
    >```

    * Request Params
    > ```json
    > {
    >   "id": 1
    > }

    * Success Response
    > ```json
    > {
    >   "message": "Success, banner deleted"
    > }
    > ```

    * Error Response

        1. Not found (404)
        > ```json
        > { 
        >    "message": "Not Found" 
        > }
        >```

        2. Not Authorized (403)
        > ```json
        > { 
        >    "message": "You're not authorized to access this item" 
        > }
        >```

        3.  Invalid access token (401)
        
        > ```json
        > { 
        >    "message": "Please log in first"  
        > }
        >```

        4. Server error (500)
        > ```json
        > { 
        >    "message": "Internal Server Error" 
        > }
        >```

12. POST /carts 
    * url:   
        - `https://ecom-server-samm021.herokuapp.com/carts`

    * Request header
    > ```json
    > { 
    >    "Content-Type": "application/json",
    >    "access_token": "access_token"   
    > }
    >```

    * Request body
    > ```json
    > {
    >   "ProductId": 1,
    >   "amount": 2,
    >   "totalPrice": 400000
    > ```

    * Success Response
    > ```json
    > {
    >    "id": 1,
    >    "UserId": 1,
    >    "ProductId": 1,
    >    "amount": 2,
    >    "totalPrice": 400000,
    >    "status": false,
    >    "createdAt": "2021-01-28T04:44:58.886Z",
    >    "updatedAt": "2021-01-28T04:45:53.997Z"
    > }
    > ```
    * Error Response

        1. Server error (500)
        
        > ```json
        > { 
        >    "message": "Internal Server Error"  
        > }
        >```

        2.  Invalid access token (401)
        
        > ```json
        > { 
        >    "message": "Please log in first"  
        > }
        >```

        3. Sequelize Validation error (400)
        > ```json
        > { 
        >    "message": "Please input cart amount" 
        > }
        >```

13. GET /carts
    * url:     
        - `https://ecom-server-samm021.herokuapp.com/carts`

    * Success Response
    > ```json
    >  [
    >    {
    >        "id": 1,
    >        "UserId": 1,
    >        "ProductId": 1,
    >        "amount": 2,
    >        "totalPrice": 400000,
    >        "status": true,
    >        "Product": {
    >           "id": 1,
    >           "name": "Shirt One",
    >           "url": "https://hm-media-prod.s3.amazonaws.com/pub/media/catalog/product/medium/062d452ee3dfb4d34a515effd887b4dda2429b67_xxl-1.jpg",
    >           "price": 200000,
    >           "stock": 20,
    >           "CategoryId": 1,
    >           "status": "in stock",
    >           "createdAt": "2021-01-27T15:05:30.053Z",
    >           "updatedAt": "2021-01-28T02:29:32.294Z"
    >        }
    >    }
    >  ]
    > ```

    * Error Response

        1. Server error (500)
        > ```json
        > { 
        >    "message": "Internal Server Error" 
        > }
        >```

14. PUT /carts/:id
    * url: 
        - `https://ecom-server-samm021.herokuapp.com/carts/:id`

    * Request header
    > ```json
    > { 
    >    "Content-Type": "application/json",
    >    "access_token": "access_token"   
    > }
    >```

    * Request Params
    > ```json
    > {
    >   "id": 1
    > }

    * Request Body
    > ```json
    > {
    >   "amount": 3,
    >   "totalPrice": 600000
    > ```


    * Success Response
    > ```json
    > {
    >    "id": 1,
    >    "UserId": 1,
    >    "ProductId": 1,
    >    "amount": 3,
    >    "totalPrice": 600000,
    >    "status": false,
    >    "createdAt": "2021-01-26T08:49:37.200Z",
    >    "updatedAt": "2021-01-26T10:53:46.450Z"
    > }
    > ```

    * Error Response

        1. Not found (404)
        > ```json
        > { 
        >    "message": "Not Found" 
        > }
        >```

        2.  Invalid access token (401)
        
        > ```json
        > { 
        >    "message": "Please log in first"  
        > }
        >```

        4. Server error (500)
        > ```json
        > { 
        >    "message": "Internal Server Error" 
        > }
        >```

        5. Sequelize Validation error (400)
        > ```json
        > { 
        >    "message": "Please input cart amount" 
        > }
        >```

15. PATCH /carts
    * url: 
        - `https://ecom-server-samm021.herokuapp.com/carts`

    * Request header
    > ```json
    > { 
    >    "Content-Type": "application/json",
    >    "access_token": "access_token"   
    > }
    >```

    * Success Response
    > ```json
    > [
    >    {
    >        "id": 1,
    >        "UserId": 1,
    >        "ProductId": 1,
    >        "amount": 3,
    >        "totalPrice": 600000,
    >        "status": true,
    >        "createdAt": "2021-01-28T03:28:13.929Z",
    >        "updatedAt": "2021-01-28T03:28:33.787Z"
    >    }
    >  ]
    > ```

    * Error Response

        1. Not found (404)
        > ```json
        > { 
        >    "message": "Not Found" 
        > }
        >```

        2.  Invalid access token (401)
        
        > ```json
        > { 
        >    "message": "Please log in first"  
        > }
        >```

        4. Server error (500)
        > ```json
        > { 
        >    "message": "Internal Server Error" 
        > }
        >```

16. DELETE /carts/:id
    * url: 
        - `https://ecom-server-samm021.herokuapp.com/carts/:id`

    * Request header
    > ```json
    > { 
    >    "Content-Type": "application/json",
    >    "access_token": "access_token" 
    > }
    >```

    * Request Params
    > ```json
    > {
    >   "id": 1
    > }

    * Success Response
    > ```json
    > {
    >   "message": "Success, cart deleted"
    > }
    > ```

    * Error Response

        1. Not found (404)
        > ```json
        > { 
        >    "message": "Not Found" 
        > }
        >```

        2.  Invalid access token (401)
        
        > ```json
        > { 
        >    "message": "Please log in first"  
        > }
        >```

        4. Server error (500)
        > ```json
        > { 
        >    "message": "Internal Server Error" 
        > }
        >```
