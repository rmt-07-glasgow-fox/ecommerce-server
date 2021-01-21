const request = require("supertest");
const app = require("../app");
const clearProducts = require("./helpers/clear-products");
const models = require("../models");

describe("POST /api/products/", () => {
  let access_token = "";
  let ProductId = 0;

  beforeAll((done) => {
    request(app)
      .post("/api/users/login")
      .send({ email: "admin@mail.com", password: "123456" })
      .end((err, res) => {
        if (err) done(err);

        access_token = res.body.access_token;

        done();
      });
  });

  afterAll((done) => {
    clearProducts();
    models.sequelize.close();
    done();
  });

  // condition: all field filled with valid data
  // result: created success
  it("Create product success", (done) => {
    // Setup
    const body = {
      name: "Perahu Karet Rescue BlueLines 100% Original Produk",
      image_url:
        "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTpj1u7h60ZB6Z4HlTY97_6GwCwmAkGtBCG3Ji7cOMmwOIUntqGR_MTKKdDdC6XjvK8icy5s_YfEDqI7s2oh-kL8-73ZjcD7NccidUzWotI&usqp=CAE",
      price: "32700000",
      stock: "100",
      // category: "Olahraga Outdoor",
    };

    // Execute
    request(app)
      .post("/api/products/")
      .set({ access_token: access_token })
      .send(body)
      .end((err, res) => {
        // Superset error handling
        if (err) done(err);

        // Assert
        expect(res.statusCode).toEqual(201);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty("id");
        expect(typeof res.body.id).toEqual("number");
        expect(res.body).toHaveProperty("name");
        expect(typeof res.body.name).toEqual("string");
        expect(res.body.name).toEqual(body.name);
        expect(res.body).toHaveProperty("image_url");
        expect(typeof res.body.image_url).toEqual("string");
        expect(res.body.image_url).toEqual(body.image_url);
        expect(res.body).toHaveProperty("price");
        expect(typeof res.body.price).toEqual("number");
        expect(res.body.price).toEqual(+body.price);
        expect(res.body).toHaveProperty("stock");
        expect(typeof res.body.stock).toEqual("number");
        expect(res.body.stock).toEqual(+body.stock);
        // expect(res.body).toHaveProperty("category");
        // expect(typeof res.body.category).toEqual("string");
        // expect(res.body.category).toEqual(body.category)

        done();
      });
  });

  // condition: all field filled with valid data without provide access_token
  // result: created failed
  it("Not provide access_token", (done) => {
    // Setup
    const body = {
      name: "Perahu Karet Rescue BlueLines 100% Original Produk",
      image_url:
        "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTpj1u7h60ZB6Z4HlTY97_6GwCwmAkGtBCG3Ji7cOMmwOIUntqGR_MTKKdDdC6XjvK8icy5s_YfEDqI7s2oh-kL8-73ZjcD7NccidUzWotI&usqp=CAE",
      price: "32700000",
      stock: "100",
      // category: "Olahraga Outdoor",
    };

    // Execute
    request(app)
      .post("/api/products/")
      // .set({ access_token: access_token }
      .send(body)
      .end((err, res) => {
        // Superset error handling
        if (err) done(err);

        // Assert
        expect(res.statusCode).toEqual(401);
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('errors')
        expect(Array.isArray(res.body.errors)).toEqual(true)
        expect(res.body.errors).toEqual(
          expect.arrayContaining(["Login first"])
        );

        done();
      });
  });

  // condition: all field filled with valid data and provide but not an Admin
  // result: created success
  it("Not an Admin", (done) => {
    // Setup
    const body = {
      name: "Perahu Karet Rescue BlueLines 100% Original Produk",
      image_url:
        "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTpj1u7h60ZB6Z4HlTY97_6GwCwmAkGtBCG3Ji7cOMmwOIUntqGR_MTKKdDdC6XjvK8icy5s_YfEDqI7s2oh-kL8-73ZjcD7NccidUzWotI&usqp=CAE",
      price: "32700000",
      stock: "100",
      // category: "Olahraga Outdoor",
    };

    // Execute

    request(app)
      .post("/api/users/login")
      .send({ email: "customer@mail.com", password: "123456" })
      .end((err, res) => {
        if (err) done(err);

        access_token = res.body.access_token;

      });

    request(app)
      .post("/api/products/")
      .set({ access_token: access_token })
      .send(body)
      .end((err, res) => {
        // Superset error handling
        if (err) done(err);

        // Assert
        expect(res.statusCode).toEqual(401);
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('errors')
        expect(Array.isArray(res.body.errors)).toEqual(true)
        expect(res.body.errors).toEqual(
          expect.arrayContaining(["Login first"])
        );

        done();
      });
  });

  
});
