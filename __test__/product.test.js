const request = require("supertest");
const app = require("../app");
const models = require("../models");
const { Product } = models;

describe("/products", function () {
  let token = "";
  let tokenCustomer =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTYxMDk3NzI5OX0.-8Qb5lMP_kthjmbHIBWw6wSmpghUr7nLT1sWksGTe1I";
  let invalidToken =
    "eyJhbGciOiJIUzI1NnR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTYxMDk3NzI5OX0.-8Qb5lMP_kthjmbHIBWw6wSmpghUr7nLT1sWksGTe1I";
  let validId;

  beforeAll(function (done) {
    const body = {
      email: "admin@mail.com",
      password: "123456",
    };

    request(app)
      .post("/login")
      .send(body)
      .end(function (err, res) {
        if (err) done(err);
        token = res.body.access_token;
        done();
      });
  });

  afterAll(function (done) {
    if (process.env.NODE_ENV === "test") {
      Product.destroy({
        where: {},
      })
        .then(() => {
          models.sequelize.close();
          done();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

  describe("POST /products", function () {
    it("successful product post should send response with status code 201", function (done) {
      // Setup
      const body = {
        name: "Jas",
        image_url:
          "https://i8.amplience.net/i/indochino/15011528_0_0/navy-solid-design-tipton-suit.jpg?$suit-pdp-desk$",
        price: 2000000,
        stock: 5,
        CategoryId: 1
      };

      // Execute
      request(app)
        .post("/products")
        .set("access_token", token)
        .send(body)
        .end(function (err, res) {
          if (err) done(err);

          // Assert
          expect(res.statusCode).toEqual(201);
          expect(res.body).toHaveProperty("name");
          expect(typeof res.body.name).toEqual("string");
          expect(res.body.name).toEqual(body.name);
          expect(res.body).toHaveProperty("image_url");
          expect(typeof res.body.image_url).toEqual("string");
          expect(res.body.image_url).toEqual(body.image_url);
          expect(res.body).toHaveProperty("price");
          expect(typeof res.body.price).toEqual("number");
          expect(res.body.price).toEqual(body.price);
          expect(res.body).toHaveProperty("stock");
          expect(typeof res.body.stock).toEqual("number");
          expect(res.body.stock).toEqual(body.stock);

          validId = res.body.id;

          done();
        });
    });

    it("successful product post should send response with status code 201", function (done) {
      // Setup
      const body = {
        name: "Jas",
        image_url: "",
        price: 2000000,
        stock: 5,
        CategoryId: 1
      };

      // Execute
      request(app)
        .post("/products")
        .set("access_token", token)
        .send(body)
        .end(function (err, res) {
          if (err) done(err);

          // Assert
          expect(res.statusCode).toEqual(201);
          expect(res.body).toHaveProperty("name");
          expect(typeof res.body.name).toEqual("string");
          expect(res.body.name).toEqual(body.name);
          expect(res.body).toHaveProperty("image_url");
          expect(typeof res.body.image_url).toEqual("string");
          expect(res.body.image_url).toEqual(body.image_url);
          expect(res.body).toHaveProperty("price");
          expect(typeof res.body.price).toEqual("number");
          expect(res.body.price).toEqual(body.price);
          expect(res.body).toHaveProperty("stock");
          expect(typeof res.body.stock).toEqual("number");
          expect(res.body.stock).toEqual(body.stock);

          done();
        });
    });

    it("no access token should send response with status code 400", function (done) {
      // Setup
      const body = {
        name: "Jas",
        image_url: "",
        price: 2000000,
        stock: 5,
        CategoryId: 1
      };

      // Execute
      request(app)
        .post("/products")
        .send(body)
        .end(function (err, res) {
          if (err) done(err);

          // Assert
          expect(res.statusCode).toEqual(400);
          expect(typeof res.body).toEqual("object");
          expect(res.body).toHaveProperty("errors");
          expect(Array.isArray(res.body.errors)).toEqual(true);
          expect(res.body.errors).toEqual(
            expect.arrayContaining(["Token is required"])
          );

          done();
        });
    });

    it("invalid access token should send response with status code 400", function (done) {
      // Setup
      const body = {
        name: "Jas",
        image_url: "",
        price: 2000000,
        stock: 5,
        CategoryId: 1
      };

      // Execute
      request(app)
        .post("/products")
        .set("access_token", invalidToken)
        .send(body)
        .end(function (err, res) {
          if (err) done(err);

          // Assert
          expect(res.statusCode).toEqual(400);
          expect(typeof res.body).toEqual("object");
          expect(res.body).toHaveProperty("errors");
          expect(Array.isArray(res.body.errors)).toEqual(true);
          expect(res.body.errors).toEqual(
            expect.arrayContaining(["Invalid Token"])
          );

          done();
        });
    });

    it("token of non-admin should send response with status code 401", function (done) {
      // Setup
      const body = {
        name: "Jas",
        image_url: "",
        price: 2000000,
        stock: 5,
        CategoryId: 1
      };

      // Execute
      request(app)
        .post("/products")
        .set("access_token", tokenCustomer)
        .send(body)
        .end(function (err, res) {
          if (err) done(err);

          // Assert
          expect(res.statusCode).toEqual(401);
          expect(typeof res.body).toEqual("object");
          expect(res.body).toHaveProperty("errors");
          expect(Array.isArray(res.body.errors)).toEqual(true);
          expect(res.body.errors).toEqual(
            expect.arrayContaining(["Unauthorized"])
          );

          done();
        });
    });

    it("empty name should send response with status code 400", function (done) {
      // Setup
      const body = {
        name: "",
        image_url: "",
        price: 2000000,
        stock: 5,
        CategoryId: 1
      };

      // Execute
      request(app)
        .post("/products")
        .set("access_token", token)
        .send(body)
        .end(function (err, res) {
          if (err) done(err);

          // Assert
          expect(res.statusCode).toEqual(400);
          expect(typeof res.body).toEqual("object");
          expect(res.body).toHaveProperty("errors");
          expect(Array.isArray(res.body.errors)).toEqual(true);
          expect(res.body.errors).toEqual(
            expect.arrayContaining(["Product name is required"])
          );

          done();
        });
    });

    it("negative price value should send response with status code 400", function (done) {
      // Setup
      const body = {
        name: "Jas",
        image_url: "",
        price: -100000,
        stock: 5,
        CategoryId: 1
      };

      // Execute
      request(app)
        .post("/products")
        .set("access_token", token)
        .send(body)
        .end(function (err, res) {
          if (err) done(err);

          // Assert
          expect(res.statusCode).toEqual(400);
          expect(typeof res.body).toEqual("object");
          expect(res.body).toHaveProperty("errors");
          expect(Array.isArray(res.body.errors)).toEqual(true);
          expect(res.body.errors).toEqual(
            expect.arrayContaining(["Price must be a positive value"])
          );

          done();
        });
    });

    it("negative stock value should send response with status code 400", function (done) {
      // Setup
      const body = {
        name: "Jas",
        image_url: "",
        price: 100000,
        stock: -1,
        CategoryId: 1
      };

      // Execute
      request(app)
        .post("/products")
        .set("access_token", token)
        .send(body)
        .end(function (err, res) {
          if (err) done(err);

          // Assert
          expect(res.statusCode).toEqual(400);
          expect(typeof res.body).toEqual("object");
          expect(res.body).toHaveProperty("errors");
          expect(Array.isArray(res.body.errors)).toEqual(true);
          expect(res.body.errors).toEqual(
            expect.arrayContaining(["Stock must be a positive value"])
          );

          done();
        });
    });

    it("non-integer price/stock value should send response with status code 400", function (done) {
      // Setup
      const body = {
        name: "Jas",
        image_url: "",
        price: "test",
        stock: "test",
        CategoryId: 1
      };

      // Execute
      request(app)
        .post("/products")
        .set("access_token", token)
        .send(body)
        .end(function (err, res) {
          if (err) done(err);

          // Assert
          expect(res.statusCode).toEqual(400);
          expect(typeof res.body).toEqual("object");
          expect(res.body).toHaveProperty("errors");
          expect(Array.isArray(res.body.errors)).toEqual(true);
          expect(res.body.errors).toEqual(
            expect.arrayContaining(["Price must be an integer"])
          );

          done();
        });
    });
  });

  describe("GET /products", function () {
    it("successful get product should send response with status code 200", function (done) {
      request(app)
        .get("/products")
        .set("access_token", token)
        .end(function (err, res) {
          if (err) done(err);

          expect(res.statusCode).toEqual(200);
          expect(typeof res.body).toEqual("object");

          done();
        });
    });

    it("no access token should send response with status code 400", function (done) {
      request(app)
        .get("/products")
        .end(function (err, res) {
          if (err) done(err);

          expect(res.statusCode).toEqual(400);
          expect(typeof res.body).toEqual("object");
          expect(res.body).toHaveProperty("errors");
          expect(Array.isArray(res.body.errors)).toEqual(true);
          expect(res.body.errors).toEqual(
            expect.arrayContaining(["Token is required"])
          );

          done();
        });
    });

    it("invalid access token should send response with status code 400", function (done) {
      request(app)
        .get("/products")
        .set("access_token", invalidToken)
        .end(function (err, res) {
          if (err) done(err);

          expect(res.statusCode).toEqual(400);
          expect(typeof res.body).toEqual("object");
          expect(res.body).toHaveProperty("errors");
          expect(Array.isArray(res.body.errors)).toEqual(true);
          expect(res.body.errors).toEqual(
            expect.arrayContaining(["Invalid Token"])
          );

          done();
        });
    });

    it("token of non-admin should send response with status code 401", function (done) {
      request(app)
        .get("/products")
        .set("access_token", tokenCustomer)
        .end(function (err, res) {
          if (err) done(err);

          expect(res.statusCode).toEqual(401);
          expect(typeof res.body).toEqual("object");
          expect(res.body).toHaveProperty("errors");
          expect(Array.isArray(res.body.errors)).toEqual(true);
          expect(res.body.errors).toEqual(
            expect.arrayContaining(["Unauthorized"])
          );

          done();
        });
    });
  });

  describe("GET /products/:id", function () {
    it("successful get product should send response with status code 200", function (done) {
      request(app)
        .get(`/products/${validId}`)
        .set("access_token", token)
        .end(function (err, res) {
          if (err) done(err);

          expect(res.statusCode).toEqual(200);
          expect(typeof res.body).toEqual("object");

          done();
        });
    });

    it("unsuccessful product get should send response with status 404", function (done) {
      request(app)
        .get("/products/1")
        .set("access_token", token)
        .end(function (err, res) {
          if (err) done(err);

          expect(res.statusCode).toEqual(404);
          expect(typeof res.body).toEqual("object");
          expect(res.body).toHaveProperty("errors");
          expect(Array.isArray(res.body.errors)).toEqual(true);
          expect(res.body.errors).toEqual(
            expect.arrayContaining(["Product not found"])
          );

          done();
        });
    });

    it("no access token should send response with status code 400", function (done) {
      request(app)
        .get("/products/1")
        .end(function (err, res) {
          if (err) done(err);

          expect(res.statusCode).toEqual(400);
          expect(typeof res.body).toEqual("object");
          expect(res.body).toHaveProperty("errors");
          expect(Array.isArray(res.body.errors)).toEqual(true);
          expect(res.body.errors).toEqual(
            expect.arrayContaining(["Token is required"])
          );

          done();
        });
    });

    it("invalid access token should send response with status code 400", function (done) {
      request(app)
        .get("/products/1")
        .set("access_token", invalidToken)
        .end(function (err, res) {
          if (err) done(err);

          expect(res.statusCode).toEqual(400);
          expect(typeof res.body).toEqual("object");
          expect(res.body).toHaveProperty("errors");
          expect(Array.isArray(res.body.errors)).toEqual(true);
          expect(res.body.errors).toEqual(
            expect.arrayContaining(["Invalid Token"])
          );

          done();
        });
    });

    it("token of non-admin should send response with status code 401", function (done) {
      request(app)
        .get("/products/1")
        .set("access_token", tokenCustomer)
        .end(function (err, res) {
          if (err) done(err);

          expect(res.statusCode).toEqual(401);
          expect(typeof res.body).toEqual("object");
          expect(res.body).toHaveProperty("errors");
          expect(Array.isArray(res.body.errors)).toEqual(true);
          expect(res.body.errors).toEqual(
            expect.arrayContaining(["Unauthorized"])
          );

          done();
        });
    });
  });

  describe("PUT /products/:id", function () {
    it("successful product update should send response with status code 200", function (done) {
      // Setup
      const body = {
        name: "Jas",
        image_url:
          "https://i8.amplience.net/i/indochino/15011528_0_0/navy-solid-design-tipton-suit.jpg?$suit-pdp-desk$",
        price: 2000000,
        stock: 5,
        CategoryId: 1
      };

      // Execute
      request(app)
        .put(`/products/${validId}`)
        .set("access_token", token)
        .send(body)
        .end(function (err, res) {
          if (err) done(err);

          // Assert
          expect(res.statusCode).toEqual(200);
          expect(res.body).toHaveProperty("name");
          expect(typeof res.body.name).toEqual("string");
          expect(res.body.name).toEqual(body.name);
          expect(res.body).toHaveProperty("image_url");
          expect(typeof res.body.image_url).toEqual("string");
          expect(res.body.image_url).toEqual(body.image_url);
          expect(res.body).toHaveProperty("price");
          expect(typeof res.body.price).toEqual("number");
          expect(res.body.price).toEqual(body.price);
          expect(res.body).toHaveProperty("stock");
          expect(typeof res.body.stock).toEqual("number");
          expect(res.body.stock).toEqual(body.stock);

          done();
        });
    });

    it("successful product update should send response with status code 200", function (done) {
      // Setup
      const body = {
        name: "Jas",
        image_url: "",
        price: 2000000,
        stock: 5,
        CategoryId: 1
      };

      // Execute
      request(app)
        .put(`/products/${validId}`)
        .set("access_token", token)
        .send(body)
        .end(function (err, res) {
          if (err) done(err);

          // Assert
          expect(res.statusCode).toEqual(200);
          expect(res.body).toHaveProperty("name");
          expect(typeof res.body.name).toEqual("string");
          expect(res.body.name).toEqual(body.name);
          expect(res.body).toHaveProperty("image_url");
          expect(typeof res.body.image_url).toEqual("string");
          expect(res.body.image_url).toEqual(body.image_url);
          expect(res.body).toHaveProperty("price");
          expect(typeof res.body.price).toEqual("number");
          expect(res.body.price).toEqual(body.price);
          expect(res.body).toHaveProperty("stock");
          expect(typeof res.body.stock).toEqual("number");
          expect(res.body.stock).toEqual(body.stock);

          done();
        });
    });

    it("unsuccessful product update should send response with status 400", function (done) {
      const body = {
        name: "Jas",
        image_url: "",
        price: 2000000,
        stock: 5,
        CategoryId: 1
      };

      request(app)
        .put(`/products/${validId}`)
        .set("access_token", token)
        .end(function (err, res) {
          if (err) done(err);

          expect(res.statusCode).toEqual(400);
          expect(typeof res.body).toEqual("object");
          expect(res.body).toHaveProperty("errors");
          expect(Array.isArray(res.body.errors)).toEqual(true);
          expect(res.body.errors).toEqual(
            expect.arrayContaining(["No change was committed"])
          );

          done();
        });
    });

    it("no access token should send response with status code 400", function (done) {
      // Setup
      const body = {
        name: "Jas",
        image_url: "",
        price: 2000000,
        stock: 5,
        CategoryId: 1
      };

      // Execute
      request(app)
        .put(`/products/${validId}`)
        .send(body)
        .end(function (err, res) {
          if (err) done(err);

          // Assert
          expect(res.statusCode).toEqual(400);
          expect(typeof res.body).toEqual("object");
          expect(res.body).toHaveProperty("errors");
          expect(Array.isArray(res.body.errors)).toEqual(true);
          expect(res.body.errors).toEqual(
            expect.arrayContaining(["Token is required"])
          );

          done();
        });
    });

    it("invalid access token should send response with status code 400", function (done) {
      // Setup
      const body = {
        name: "Jas",
        image_url: "",
        price: 2000000,
        stock: 5,
        CategoryId: 1
      };

      // Execute
      request(app)
        .put(`/products/${validId}`)
        .set("access_token", invalidToken)
        .send(body)
        .end(function (err, res) {
          if (err) done(err);

          // Assert
          expect(res.statusCode).toEqual(400);
          expect(typeof res.body).toEqual("object");
          expect(res.body).toHaveProperty("errors");
          expect(Array.isArray(res.body.errors)).toEqual(true);
          expect(res.body.errors).toEqual(
            expect.arrayContaining(["Invalid Token"])
          );

          done();
        });
    });

    it("token of non-admin should send response with status code 401", function (done) {
      // Setup
      const body = {
        name: "Jas",
        image_url: "",
        price: 2000000,
        stock: 5,
        CategoryId: 1
      };

      // Execute
      request(app)
        .put(`/products/${validId}`)
        .set("access_token", tokenCustomer)
        .send(body)
        .end(function (err, res) {
          if (err) done(err);

          // Assert
          expect(res.statusCode).toEqual(401);
          expect(typeof res.body).toEqual("object");
          expect(res.body).toHaveProperty("errors");
          expect(Array.isArray(res.body.errors)).toEqual(true);
          expect(res.body.errors).toEqual(
            expect.arrayContaining(["Unauthorized"])
          );

          done();
        });
    });

    it("empty name should send response with status code 400", function (done) {
      // Setup
      const body = {
        name: "",
        image_url: "",
        price: 2000000,
        stock: 5,
        CategoryId: 1
      };

      // Execute
      request(app)
        .put(`/products/${validId}`)
        .set("access_token", token)
        .send(body)
        .end(function (err, res) {
          if (err) done(err);

          // Assert
          expect(res.statusCode).toEqual(400);
          expect(typeof res.body).toEqual("object");
          expect(res.body).toHaveProperty("errors");
          expect(Array.isArray(res.body.errors)).toEqual(true);
          expect(res.body.errors).toEqual(
            expect.arrayContaining(["Product name is required"])
          );

          done();
        });
    });

    it("negative price value should send response with status code 400", function (done) {
      // Setup
      const body = {
        name: "Jas",
        image_url: "",
        price: -100000,
        stock: 5,
        CategoryId: 1
      };

      // Execute
      request(app)
        .put(`/products/${validId}`)
        .set("access_token", token)
        .send(body)
        .end(function (err, res) {
          if (err) done(err);

          // Assert
          expect(res.statusCode).toEqual(400);
          expect(typeof res.body).toEqual("object");
          expect(res.body).toHaveProperty("errors");
          expect(Array.isArray(res.body.errors)).toEqual(true);
          expect(res.body.errors).toEqual(
            expect.arrayContaining(["Price must be a positive value"])
          );

          done();
        });
    });

    it("negative stock value should send response with status code 400", function (done) {
      // Setup
      const body = {
        name: "Jas",
        image_url: "",
        price: 100000,
        stock: -1,
        CategoryId: 1
      };

      // Execute
      request(app)
        .put(`/products/${validId}`)
        .set("access_token", token)
        .send(body)
        .end(function (err, res) {
          if (err) done(err);

          // Assert
          expect(res.statusCode).toEqual(400);
          expect(typeof res.body).toEqual("object");
          expect(res.body).toHaveProperty("errors");
          expect(Array.isArray(res.body.errors)).toEqual(true);
          expect(res.body.errors).toEqual(
            expect.arrayContaining(["Stock must be a positive value"])
          );

          done();
        });
    });

    it("non-integer price/stock value should send response with status code 400", function (done) {
      // Setup
      const body = {
        name: "Jas",
        image_url: "",
        price: "test",
        stock: "test",
        CategoryId: 1
      };

      // Execute
      request(app)
        .put(`/products/${validId}`)
        .set("access_token", token)
        .send(body)
        .end(function (err, res) {
          if (err) done(err);

          // Assert
          expect(res.statusCode).toEqual(400);
          expect(typeof res.body).toEqual("object");
          expect(res.body).toHaveProperty("errors");
          expect(Array.isArray(res.body.errors)).toEqual(true);
          expect(res.body.errors).toEqual(
            expect.arrayContaining(["Price must be an integer"])
          );

          done();
        });
    });
  });

  describe("DELETE /products/:id", function () {
    it("successful product delete should send response with status code 200", function (done) {
      request(app)
        .delete(`/products/${validId}`)
        .set("access_token", token)
        .end(function (err, res) {
          if (err) done(err);

          expect(res.statusCode).toEqual(200);
          expect(typeof res.body).toEqual("object");
          expect(res.body).toHaveProperty("message");
          expect(res.body.message).toEqual("Product has been deleted");

          done();
        });
    });

    it("unsuccessful product delete should send response with status code 200", function(done){
      request(app)
        .delete(`/products/1`)
        .set("access_token", token)
        .end(function (err, res) {
          if (err) done(err);

          expect(res.statusCode).toEqual(400);
          expect(typeof res.body).toEqual("object");
          expect(res.body).toHaveProperty("errors");
          expect(Array.isArray(res.body.errors)).toEqual(true);
          expect(res.body.errors).toEqual(
            expect.arrayContaining(["No change was committed"])
          );

          done();
        });
    })

    it("no access token should send response with status code 400", function (done) {
      request(app)
        .delete(`/products/${validId}`)
        .end(function (err, res) {
          if (err) done(err);

          expect(res.statusCode).toEqual(400);
          expect(typeof res.body).toEqual("object");
          expect(res.body).toHaveProperty("errors");
          expect(Array.isArray(res.body.errors)).toEqual(true);
          expect(res.body.errors).toEqual(
            expect.arrayContaining(["Token is required"])
          );

          done();
        });
    });

    it("invalid access token should send response with status code 400", function (done) {
      request(app)
        .delete(`/products/${validId}`)
        .set("access_token", invalidToken)
        .end(function (err, res) {
          if (err) done(err);

          expect(res.statusCode).toEqual(400);
          expect(typeof res.body).toEqual("object");
          expect(res.body).toHaveProperty("errors");
          expect(Array.isArray(res.body.errors)).toEqual(true);
          expect(res.body.errors).toEqual(
            expect.arrayContaining(["Invalid Token"])
          );

          done();
        });
    });

    it("token of non-admin should send response with status code 401", function (done) {
      request(app)
        .delete(`/products/${validId}`)
        .set("access_token", tokenCustomer)
        .end(function (err, res) {
          if (err) done(err);

          expect(res.statusCode).toEqual(401);
          expect(typeof res.body).toEqual("object");
          expect(res.body).toHaveProperty("errors");
          expect(Array.isArray(res.body.errors)).toEqual(true);
          expect(res.body.errors).toEqual(
            expect.arrayContaining(["Unauthorized"])
          );

          done();
        });
    });

  });
});
