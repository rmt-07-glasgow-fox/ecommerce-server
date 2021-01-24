const request = require("supertest");
const app = require("../app.js");
const models = require("../models");
const clearProduct = require("./helpers/clear-product.js");
const { User, Product } = require("../models");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;
const { generateJwt } = require("../helpers/jwt.js");

// Setup
let access_token;
let access_token_notAdmin;
let idProduct;
let UserId;
beforeAll((done) => {
  User.findOne({ where: { email: "admin@mail.com" } })
    .then((dataUser) => {
      const payload = {
        id: dataUser.id,
        email: dataUser.email,
        role: dataUser.role,
      };
      UserId = dataUser.id;
      access_token = generateJwt(payload);
      return User.findOne({ where: { email: "notadmin@mail.com" } });
    })
    .then((dataUser) => {
      const payload = {
        id: dataUser.id,
        email: dataUser.email,
        role: dataUser.role,
      };
      access_token_notAdmin = generateJwt(payload);
      done();
    })
    .catch((err) => {
      done();
    });
});

afterAll(function (done) {
  clearProduct()
    .then(function () {
      models.sequelize.close();
      done();
    })
    .catch(console.log);
});

describe("POST /products", function () {
  it("Should send response 201 status code", function (done) {
    // Setup
    const body = {
      name: "Blue Shirts",
      image_url: "https://unsplash.com/photos/6UWqw25wfLI",
      price: 200000,
      stock: 5,
      UserId: UserId,
    };
    // Execute
    request(app)
      .post("/products")
      .set("access_token", access_token)
      .send(body)
      .end(function (err, res) {
        // Handle error from supertest
        if (err) done(err);
        idProduct = res.body.id; // send product id to global variable

        // Assert
        expect(res.statusCode).toEqual(201);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty("id");
        expect(typeof res.body.id).toEqual("number");
        expect(res.body).toHaveProperty("name");
        expect(res.body.name).toEqual(body.name);
        expect(res.body).toHaveProperty("image_url");
        expect(res.body.image_url).toEqual(body.image_url);
        expect(res.body).toHaveProperty("price");
        expect(res.body.price).toEqual(body.price);
        expect(res.body).toHaveProperty("stock");
        expect(res.body.stock).toEqual(body.stock);

        done();
      });
  });

  it("Should send response 201 status code", function (done) {
    // Setup
    const body = {
      name: "Blue Shirts without image",
      image_url: "",
      price: 2000,
      stock: 1,
      UserId,
    };
    // Execute
    request(app)
      .post("/products")
      .set("access_token", access_token)
      .send(body)
      .end(function (err, res) {
        // Handle error from supertest
        if (err) done(err);

        // Assert
        expect(res.statusCode).toEqual(201);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty("id");
        expect(typeof res.body.id).toEqual("number");
        expect(res.body).toHaveProperty("name");
        expect(res.body.name).toEqual(body.name);
        expect(res.body).toHaveProperty("image_url");
        expect(res.body.image_url).toEqual(body.image_url);
        expect(res.body).toHaveProperty("price");
        expect(res.body.price).toEqual(body.price);
        expect(res.body).toHaveProperty("stock");
        expect(res.body.stock).toEqual(body.stock);

        done();
      });
  });

  it("Should send response with 400 status code for empty name", function (done) {
    // Setup
    const body = {
      name: "",
      image_url: "",
      price: 2000001,
      stock: 7,
      UserId,
    };
    // Execute
    request(app)
      .post("/products")
      .set("access_token", access_token)
      .send(body)
      .end(function (err, res) {
        if (err) done(err);

        // Assert
        expect(res.statusCode).toEqual(400);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty("message");
        expect(Array.isArray(res.body.message)).toEqual(true);
        expect(res.body.message).toEqual(
          expect.arrayContaining(["Name is required"])
        );

        done();
      });
  });

  it("Should send response with 400 status code for empty price", function (done) {
    // Setup
    const body = {
      name: "Blue Shirts without image",
      image_url: "",
      price: "",
      stock: 7,
      UserId,
    };
    // Execute
    request(app)
      .post("/products")
      .set("access_token", access_token)
      .send(body)
      .end(function (err, res) {
        if (err) done(err);

        // Assert
        expect(res.statusCode).toEqual(400);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty("message");
        expect(Array.isArray(res.body.message)).toEqual(true);
        expect(res.body.message).toEqual(
          expect.arrayContaining(["Price is required"])
        );

        done();
      });
  });

  it("Should send response with 400 status code for empty stock", function (done) {
    // Setup
    const body = {
      name: "Blue Shirts without image",
      image_url: "",
      price: 2000,
      stock: "",
      UserId,
    };
    // Execute
    request(app)
      .post("/products")
      .set("access_token", access_token)
      .send(body)
      .end(function (err, res) {
        if (err) done(err);

        // Assert
        expect(res.statusCode).toEqual(400);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty("message");
        expect(Array.isArray(res.body.message)).toEqual(true);
        expect(res.body.message).toEqual(
          expect.arrayContaining(["Stock is required"])
        );

        done();
      });
  });

  it("Should send response with 400 status code for null name", function (done) {
    // Setup
    const body = {
      name: null,
      image_url: "https://unsplash.com/photos/6UWqw25wfLI",
      price: 2000,
      stock: 5,
      UserId,
    };
    // Execute
    request(app)
      .post("/products")
      .set("access_token", access_token)
      .send(body)
      .end(function (err, res) {
        if (err) done(err);

        // Assert
        expect(res.statusCode).toEqual(400);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty("message");
        expect(Array.isArray(res.body.message)).toEqual(true);
        expect(res.body.message).toEqual(
          expect.arrayContaining(["Name is required"])
        );

        done();
      });
  });

  it("Should send response with 400 status code for null price", function (done) {
    // Setup
    const body = {
      name: "Blue Shirts",
      image_url: "https://unsplash.com/photos/6UWqw25wfLI",
      price: null,
      stock: 5,
      UserId,
    };
    // Execute
    request(app)
      .post("/products")
      .set("access_token", access_token)
      .send(body)
      .end(function (err, res) {
        if (err) done(err);

        // Assert
        expect(res.statusCode).toEqual(400);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty("message");
        expect(Array.isArray(res.body.message)).toEqual(true);
        expect(res.body.message).toEqual(
          expect.arrayContaining(["Price is required"])
        );

        done();
      });
  });

  it("Should send response with 400 status code for null stock", function (done) {
    // Setup
    const body = {
      name: "Blue Shirts",
      image_url: "https://unsplash.com/photos/6UWqw25wfLI",
      price: 50000,
      stock: null,
      UserId,
    };
    // Execute
    request(app)
      .post("/products")
      .set("access_token", access_token)
      .send(body)
      .end(function (err, res) {
        if (err) done(err);

        // Assert
        expect(res.statusCode).toEqual(400);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty("message");
        expect(Array.isArray(res.body.message)).toEqual(true);
        expect(res.body.message).toEqual(
          expect.arrayContaining(["Stock is required"])
        );

        done();
      });
  });

  it("Should send response with 400 status code for number price", function (done) {
    // Setup
    const body = {
      name: "Blue Shirts",
      image_url: "https://unsplash.com/photos/6UWqw25wfLI",
      price: "Price",
      stock: 5,
      UserId,
    };
    // Execute
    request(app)
      .post("/products")
      .set("access_token", access_token)
      .send(body)
      .end(function (err, res) {
        if (err) done(err);

        // Assert
        expect(res.statusCode).toEqual(400);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty("message");
        expect(Array.isArray(res.body.message)).toEqual(true);
        expect(res.body.message).toEqual(
          expect.arrayContaining(["Price must be a number"])
        );

        done();
      });
  });

  it("Should send response with 400 status code for number stock", function (done) {
    // Setup
    const body = {
      name: "Blue Shirts",
      image_url: "https://unsplash.com/photos/6UWqw25wfLI",
      price: 20000,
      stock: "Stock",
      UserId,
    };
    // Execute
    request(app)
      .post("/products")
      .set("access_token", access_token)
      .send(body)
      .end(function (err, res) {
        if (err) done(err);

        // Assert
        expect(res.statusCode).toEqual(400);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty("message");
        expect(Array.isArray(res.body.message)).toEqual(true);
        expect(res.body.message).toEqual(
          expect.arrayContaining(["Stock must be a number"])
        );

        done();
      });
  });

  it("Should send response with 400 status code for negative value of price", function (done) {
    // Setup
    const body = {
      name: "Blue Shirts",
      image_url: "https://unsplash.com/photos/6UWqw25wfLI",
      price: -100000,
      stock: 5,
      UserId,
    };
    // Execute
    request(app)
      .post("/products")
      .set("access_token", access_token)
      .send(body)
      .end(function (err, res) {
        if (err) done(err);

        // Assert
        expect(res.statusCode).toEqual(400);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty("message");
        expect(Array.isArray(res.body.message)).toEqual(true);
        expect(res.body.message).toEqual(
          expect.arrayContaining(["Price cannot negative value"])
        );

        done();
      });
  });

  it("Should send response with 400 status code for negative value of stock", function (done) {
    // Setup
    const body = {
      name: "Blue Shirts",
      image_url: "https://unsplash.com/photos/6UWqw25wfLI",
      price: 100000,
      stock: -5,
      UserId,
    };
    // Execute
    request(app)
      .post("/products")
      .set("access_token", access_token)
      .send(body)
      .end(function (err, res) {
        if (err) done(err);

        // Assert
        expect(res.statusCode).toEqual(400);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty("message");
        expect(Array.isArray(res.body.message)).toEqual(true);
        expect(res.body.message).toEqual(
          expect.arrayContaining(["Stock cannot negative value"])
        );

        done();
      });
  });

  it("Should send response with 401 status code for access without access_token (Unauthorized)", function (done) {
    // Setup
    const body = {
      name: "Blue Shirts",
      image_url: "https://unsplash.com/photos/6UWqw25wfLI",
      price: 100000,
      stock: 15,
    };
    // Execute
    request(app)
      .post("/products")
      .send(body)
      .end(function (err, res) {
        if (err) done(err);

        // Assert
        expect(res.statusCode).toEqual(401);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty("Error");
        expect(res.body).toHaveProperty("message");
        expect(res.body).toEqual(
          expect.objectContaining({
            Error: "Unauthorized",
            message: "The requested page needs a valid username and a password",
          })
        );
        done();
      });
  });

  it("Should send response with 403 status code for access without admin access_token (Forbidden)", function (done) {
    // Setup
    const body = {
      name: "Blue Shirts",
      image_url: "https://unsplash.com/photos/6UWqw25wfLI",
      price: 100000,
      stock: 15,
    };
    // Execute
    request(app)
      .post("/products")
      .set("access_token", access_token_notAdmin)
      .send(body)
      .end(function (err, res) {
        if (err) done(err);

        // Assert
        expect(res.statusCode).toEqual(403);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty("Error");
        expect(res.body).toHaveProperty("message");
        expect(res.body).toEqual(
          expect.objectContaining({
            Error: "Forbidden access",
            message: "You are not authorized to access the file",
          })
        );
        done();
      });
  });
});


describe("GET /products", function () {
  it("Should send response 200 status code", function (done) {
    // Execute
    request(app)
      .get("/products")
      .set("access_token", access_token)
      .end(function (err, res) {
        // Handle error from supertest
        if (err) done(err);

        // Assert
        expect(res.statusCode).toEqual(200);
        expect(typeof res.body).toEqual("object");
        expect(Array.isArray(res.body)).toEqual(true);
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            image_url: expect.any(String),
            price: expect.any(Number),
            stock: expect.any(Number),
            UserId: expect.any(Number),
          }),
        ]);
        done();
      });
  });

  it("Should send response with 200 status code", function (done) {
    // Execute
    request(app)
      .get("/products")
      .set("access_token", access_token_notAdmin)
      .end(function (err, res) {
        if (err) done(err);

        // Assert
        expect(res.statusCode).toEqual(200);
        expect(typeof res.body).toEqual("object");
        expect(Array.isArray(res.body)).toEqual(true);
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            image_url: expect.any(String),
            price: expect.any(Number),
            stock: expect.any(Number),
            UserId: expect.any(Number),
          }),
        ]);
        done();
      });
  });

  it("Should send response with 401 status code for access without access_token (Unauthorized)", function (done) {
    // Execute
    request(app)
      .get("/products")
      .end(function (err, res) {
        if (err) done(err);

        // Assert
        expect(res.statusCode).toEqual(401);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty("Error");
        expect(res.body).toHaveProperty("message");
        expect(res.body).toEqual(
          expect.objectContaining({
            Error: "Unauthorized",
            message: "The requested page needs a valid username and a password",
          })
        );
        done();
      });
  });
});

describe("GET /products/:id", function () {
  it("Should send response 200 status code", function (done) {
    // Execute
    request(app)
      .get(`/products/${idProduct}`)
      .set("access_token", access_token)
      .end(function (err, res) {
        // Handle error from supertest
        if (err) done(err);
        // idProduct = res.body.id;
        // Assert
        expect(res.statusCode).toEqual(200);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty("id");
        expect(typeof res.body.id).toEqual("number");
        expect(res.body).toHaveProperty("name");
        expect(typeof res.body.name).toEqual("string");
        expect(res.body).toHaveProperty("image_url");
        expect(typeof res.body.image_url).toEqual("string");
        expect(res.body).toHaveProperty("price");
        expect(typeof res.body.price).toEqual("number");
        expect(res.body).toHaveProperty("stock");
        expect(typeof res.body.stock).toEqual("number");
        expect(res.body).toHaveProperty("UserId");
        expect(typeof res.body.UserId).toEqual("number");
        expect(res.body.UserId).toEqual(UserId);

        done();
      });
  });

  it("Should send response with 401 status code for access without access_token (Unauthorized)", function (done) {
    // Execute
    request(app)
      .get(`/products/${idProduct}`)
      .end(function (err, res) {
        // Handle error from supertest
        if (err) done(err);

        // Assert
        expect(res.statusCode).toEqual(401);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty("Error");
        expect(res.body).toHaveProperty("message");
        expect(res.body).toEqual(
          expect.objectContaining({
            Error: "Unauthorized",
            message: "The requested page needs a valid username and a password",
          })
        );

        done();
      });
  });

  it("Should send response with 403 status code for access without admin access_token (Forbidden)", function (done) {
    // Execute
    request(app)
      .get(`/products/${idProduct}`)
      .set("access_token", access_token_notAdmin)
      .end(function (err, res) {
        // Handle error from supertest
        if (err) done(err);

        // Assert
        expect(res.statusCode).toEqual(403);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty("Error");
        expect(res.body).toHaveProperty("message");
        expect(res.body).toEqual(
          expect.objectContaining({
            Error: "Forbidden access",
            message: "You are not authorized to access the file",
          })
        );

        done();
      });
  });

  it("Should send response with 404 status code for product not found", function (done) {
    // Execute
    request(app)
      .get(`/products/${idProduct + 5}`)
      .set("access_token", access_token)
      .end(function (err, res) {
        // Handle error from supertest
        if (err) done(err);

        // Assert
        expect(res.statusCode).toEqual(404);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty("Error");
        expect(res.body).toHaveProperty("message");
        expect(res.body).toEqual(
          expect.objectContaining({
            Error: "Invalid request",
            message: "Data not found",
          })
        );

        done();
      });
  });

  it("Should send response with 500 status code for string id data type", function (done) {
    // Execute
    request(app)
      .get("/products/asd")
      .set("access_token", access_token)
      .end(function (err, res) {
        // Handle error from supertest
        if (err) done(err);

        // Assert
        expect(res.statusCode).toEqual(500);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty("Error");
        expect(res.body).toHaveProperty("message");
        expect(res.body).toEqual(
          expect.objectContaining({
            Error: "Error from Server",
            message: "Internal server error",
          })
        );

        done();
      });
  });
});

describe("PUT /products/:id", function () {
  it("Should send response 200 status code", function (done) {
    // Setup
    const body = {
      name: "Blue Shirts",
      image_url: "https://unsplash.com/photos/6UWqw25wfLI",
      price: 200000,
      stock: 5,
      UserId: UserId,
    };
    // Execute
    request(app)
      .put(`/products/${idProduct}`)
      .set("access_token", access_token)
      .send(body)
      .end(function (err, res) {
        // Handle error from supertest
        if (err) done(err);

        // Assert
        expect(res.statusCode).toEqual(200);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty("message");
        expect(res.body).toEqual(
          expect.objectContaining({
            message: "Product have been updated",
          })
        );

        done();
      });
  });

  it("Should send response with 401 status code for access without access_token (Unauthorized)", function (done) {
    // Setup
    const body = {
      name: "Blue Shirts",
      image_url: "https://unsplash.com/photos/6UWqw25wfLI",
      price: 200000,
      stock: 5,
      UserId: UserId,
    };
    // Execute
    request(app)
      .put(`/products/${idProduct}`)
      .send(body)
      .end(function (err, res) {
        // Handle error from supertest
        if (err) done(err);

        // Assert
        expect(res.statusCode).toEqual(401);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty("Error");
        expect(res.body).toHaveProperty("message");
        expect(res.body).toEqual(
          expect.objectContaining({
            Error: "Unauthorized",
            message: "The requested page needs a valid username and a password",
          })
        );

        done();
      });
  });

  it("Should send response with 403 status code for access without admin access_token (Forbidden)", function (done) {
    // Setup
    const body = {
      name: "Blue Shirts",
      image_url: "https://unsplash.com/photos/6UWqw25wfLI",
      price: 200000,
      stock: 5,
      UserId: UserId,
    };
    // Execute
    request(app)
      .put(`/products/${idProduct}`)
      .set("access_token", access_token_notAdmin)
      .send(body)
      .end(function (err, res) {
        // Handle error from supertest
        if (err) done(err);

        // Assert
        expect(res.statusCode).toEqual(403);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty("Error");
        expect(res.body).toHaveProperty("message");
        expect(res.body).toEqual(
          expect.objectContaining({
            Error: "Forbidden access",
            message: "You are not authorized to access the file",
          })
        );

        done();
      });
  });

  it("Should send response with 404 status code for product not found", function (done) {
    // Setup
    const body = {
      name: "Blue Shirts",
      image_url: "https://unsplash.com/photos/6UWqw25wfLI",
      price: 200000,
      stock: 5,
      UserId: UserId,
    };
    // Execute
    request(app)
      .put(`/products/${idProduct + 5}`)
      .set("access_token", access_token)
      .send(body)
      .end(function (err, res) {
        // Handle error from supertest
        if (err) done(err);

        // Assert
        expect(res.statusCode).toEqual(404);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty("Error");
        expect(res.body).toHaveProperty("message");
        expect(res.body).toEqual(
          expect.objectContaining({
            Error: "Invalid request",
            message: "Data not found",
          })
        );

        done();
      });
  });

  it("Should send response with 500 status code for string id data type", function (done) {
    // Setup
    const body = {
      name: "Blue Shirts",
      image_url: "https://unsplash.com/photos/6UWqw25wfLI",
      price: 200000,
      stock: 5,
      UserId: UserId,
    };
    // Execute
    request(app)
      .put("/products/asd")
      .set("access_token", access_token)
      .send(body)
      .end(function (err, res) {
        // Handle error from supertest
        if (err) done(err);

        // Assert
        expect(res.statusCode).toEqual(500);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty("Error");
        expect(res.body).toHaveProperty("message");
        expect(res.body).toEqual(
          expect.objectContaining({
            Error: "Error from Server",
            message: "Internal server error",
          })
        );

        done();
      });
  });
});

describe("DELETE /products/:id", function () {
  it("Should send response 200 status code", function (done) {
    // Setup
    const body = {
      name: "Blue Shirts",
      image_url: "https://unsplash.com/photos/6UWqw25wfLI",
      price: 200000,
      stock: 5,
      UserId: UserId,
    };
    // Execute
    request(app)
      .delete(`/products/${idProduct}`)
      .set("access_token", access_token)
      .send(body)
      .end(function (err, res) {
        // Handle error from supertest
        if (err) done(err);

        // Assert
        expect(res.statusCode).toEqual(200);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty("message");
        expect(res.body).toEqual(
          expect.objectContaining({
            message: "Product have been deleted",
          })
        );

        done();
      });
  });

  it("Should send response with 401 status code for access without access_token (Unauthorized)", function (done) {
    // Setup
    const body = {
      name: "Blue Shirts",
      image_url: "https://unsplash.com/photos/6UWqw25wfLI",
      price: 200000,
      stock: 5,
      UserId: UserId,
    };
    // Execute
    request(app)
      .delete(`/products/${idProduct}`)
      .send(body)
      .end(function (err, res) {
        // Handle error from supertest
        if (err) done(err);

        // Assert
        expect(res.statusCode).toEqual(401);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty("Error");
        expect(res.body).toHaveProperty("message");
        expect(res.body).toEqual(
          expect.objectContaining({
            Error: "Unauthorized",
            message: "The requested page needs a valid username and a password",
          })
        );

        done();
      });
  });

  it("Should send response with 403 status code for access without admin access_token (Forbidden)", function (done) {
    // Setup
    const body = {
      name: "Blue Shirts",
      image_url: "https://unsplash.com/photos/6UWqw25wfLI",
      price: 200000,
      stock: 5,
      UserId: UserId,
    };
    // Execute
    request(app)
      .delete(`/products/${idProduct}`)
      .set("access_token", access_token_notAdmin)
      .send(body)
      .end(function (err, res) {
        // Handle error from supertest
        if (err) done(err);

        // Assert
        expect(res.statusCode).toEqual(403);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty("Error");
        expect(res.body).toHaveProperty("message");
        expect(res.body).toEqual(
          expect.objectContaining({
            Error: "Forbidden access",
            message: "You are not authorized to access the file",
          })
        );

        done();
      });
  });

  it("Should send response with 404 status code for product not found", function (done) {
    // Setup
    const body = {
      name: "Blue Shirts",
      image_url: "https://unsplash.com/photos/6UWqw25wfLI",
      price: 200000,
      stock: 5,
      UserId: UserId,
    };
    // Execute
    request(app)
      .delete(`/products/${idProduct + 5}`)
      .set("access_token", access_token)
      .send(body)
      .end(function (err, res) {
        // Handle error from supertest
        if (err) done(err);

        // Assert
        expect(res.statusCode).toEqual(404);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty("Error");
        expect(res.body).toHaveProperty("message");
        expect(res.body).toEqual(
          expect.objectContaining({
            Error: "Invalid request",
            message: "Data not found",
          })
        );

        done();
      });
  });

  it("Should send response with 500 status code for string id data type", function (done) {
    // Setup
    const body = {
      name: "Blue Shirts",
      image_url: "https://unsplash.com/photos/6UWqw25wfLI",
      price: 200000,
      stock: 5,
      UserId: UserId,
    };
    // Execute
    request(app)
      .delete("/products/asd")
      .set("access_token", access_token)
      .send(body)
      .end(function (err, res) {
        // Handle error from supertest
        if (err) done(err);

        // Assert
        expect(res.statusCode).toEqual(500);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty("Error");
        expect(res.body).toHaveProperty("message");
        expect(res.body).toEqual(
          expect.objectContaining({
            Error: "Error from Server",
            message: "Internal server error",
          })
        );

        done();
      });
  });
});
