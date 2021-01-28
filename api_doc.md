# Ecommerce Customer

## POST /register
- Request body: 
    ```json
    {
        "email": "string",
        "password": "string",
    }.
    ```
- Response (accepted) :
    status code => 201,
    ```json
    {
        "id": "integer",
        "email": "string",
    }.
    ```
- Response (fail) : 
    status code => 500.

## POST /login
- Request body: 
    ```json
    {
        "email": "string",
        "password": "string",
    }.
    ```

- Response (accepted) : 
    status code => 200,
    ```json
    {
        "access_token": "string"
    }
    ```
- Response (fail) : 
    status code => 500.

## GET /products
- Response (accepted) : 
    status code => 200,
    ```json
    {
        "all data products"
    }
    ```
    
- Response (fail) : 
    status code => 500.

## GET /cart
- Response (accepted) : 
    status code => 200,
    ```json
    {
        "all data products"
    }
    ```
    
- Response (fail) : 
    status code => 500.

## POST /cart
- Request body :
    ```json
    {
        "UserId": "integer",
        "ProductId": "integer",
        "amount": "integer",
    }.
    ```
- Response (accepted) : 
    status code => 201,
    ```json
    {
        "msg": "added!"
    }
    ```
- Response (fail) : 
    status code => 400,
    ```json
    {
        "msg": "not foud"
    }
    ```

- Response (fail server) :
    status code => 500.

## PUT /cart/:id
- Request body :
    ```json
    {
        "UserId": "integer",
        "amount": "integer"
    }.
    ```
- Response (accepted) :
    status code => 200,
    ```json
    {
        "msg": "data updated"
    }
    ```
- Response (fail) : 
    status code => 400,
    ```json
    {
        "msg": "data not found"
    }
    ```

- Response (fail server) :
    status code => 500.

## DELETE /cart/:id
- Response (accepted) :
    status code => 200,
    ```json
    {
        "message": "todo success to delete"
    }
    ```
- Response (fail) :
    status code => 404,
    ```json
    {
        "msg": "data not found"
    }
    ```
- Response (fail server) :
    status code => 500.