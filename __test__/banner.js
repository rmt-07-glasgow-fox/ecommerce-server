const request = require("supertest");
const app = require("../app");
const models = require("../models");
const adminToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTYxMTQ1NTQ3OH0.i1esdATOr_vqTO5yUSmWelzedi1ssHN4_kIcdQVP-kM";
const customerToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJjdXN0b21lckBtYWlsLmNvbSIsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTYxMTQ1NTQxNX0.x2OaBW1VCewQWigi66hxtOXpTpc0BBoMephE_bWOOI4";
let access_token = "";
let BannerId = 1;

/**
 * create banner
 * requirement test cases:
 * 1. not provide valid access_token
 * 2. provide valid access_token but the user is not an Admin
 * 3. required fields is missed [name, image_url, price, stock, CatId]
 * 4. stock field is filled with minus number
 * 5. price field is filled with minus number
 * 6. fields is filled with invalid data type [image_url, price, stock, CatId]
 *
 * additional test cases:
 * 1.
 */

afterAll((done) => {
  request(app)
    .delete(`/api/banners/${BannerId}`)
    .set({ access_token: adminToken })
    .end((err, res) => {
      err ? done(err) : err;

      models.sequelize.close();
      done();
    });
});

describe("POST /api/banners/", () => {
  // condition: all field filled with valid data
  // result: created success
  it("Create banner success", (done) => {
    const body = {
      name: "Perahu Karet Rescue BlueLines 100% Original Produk",
      image_url:
        "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTpj1u7h60ZB6Z4HlTY97_6GwCwmAkGtBCG3Ji7cOMmwOIUntqGR_MTKKdDdC6XjvK8icy5s_YfEDqI7s2oh-kL8-73ZjcD7NccidUzWotI&usqp=CAE",
      price: "32700000",
      stock: "100",
      CatId: "1",
    };

    request(app)
      .post("/api/banners/")
      .set({ access_token: adminToken })
      .send(body)
      .end((err, res) => {
        err ? done(err) : err;

        BannerId = res.body.id;

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
        // expect(res.body).toHaveProperty("CatId");
        // expect(typeof res.body.CatId).toEqual("string");
        // expect(res.body.CatId).toEqual(body.CatId)

        done();
      });
  });

  // condition: all field filled with valid data without provide access_token
  // result: created failed
  it("Not provide access_token", (done) => {
    const body = {
      name: "Perahu Karet Rescue BlueLines 100% Original Produk",
      image_url:
        "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTpj1u7h60ZB6Z4HlTY97_6GwCwmAkGtBCG3Ji7cOMmwOIUntqGR_MTKKdDdC6XjvK8icy5s_YfEDqI7s2oh-kL8-73ZjcD7NccidUzWotI&usqp=CAE",
      price: "32700000",
      stock: "100",
      CatId: "1",
    };

    request(app)
      .post("/api/banners/")
      // .set({ access_token: access_token }
      .send(body)
      .end((err, res) => {
        err ? done(err) : err;

        expect(res.statusCode).toEqual(401);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty("errors");
        expect(Array.isArray(res.body.errors)).toEqual(true);
        expect(res.body.errors).toEqual(
          expect.arrayContaining(["Login first"])
        );

        done();
      });
  });

  // condition: all field filled with valid data and provide access_token but not an Admin
  // result: created failed
  it("Unauthorized", (done) => {
    const body = {
      name: "Perahu Karet Rescue BlueLines 100% Original Produk",
      image_url:
        "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTpj1u7h60ZB6Z4HlTY97_6GwCwmAkGtBCG3Ji7cOMmwOIUntqGR_MTKKdDdC6XjvK8icy5s_YfEDqI7s2oh-kL8-73ZjcD7NccidUzWotI&usqp=CAE",
      price: "32700000",
      stock: "100",
      CatId: "1",
    };

    request(app)
      .post("/api/banners/")
      .set({
        access_token: customerToken,
      })
      .send(body)
      .end((err, res) => {
        err ? done(err) : err;

        expect(res.statusCode).toEqual(403);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty("errors");
        expect(Array.isArray(res.body.errors)).toEqual(true);
        expect(res.body.errors).toEqual(
          expect.arrayContaining(["Unauthorized"])
        );

        done();
      });
  });

  // condition: all field filled with valid data except name
  // result: created failed
  it("Name field is missed", (done) => {
    const body = {
      name: "",
      image_url:
        "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTpj1u7h60ZB6Z4HlTY97_6GwCwmAkGtBCG3Ji7cOMmwOIUntqGR_MTKKdDdC6XjvK8icy5s_YfEDqI7s2oh-kL8-73ZjcD7NccidUzWotI&usqp=CAE",
      price: "32700000",
      stock: "100",
      CatId: "1",
    };

    request(app)
      .post("/api/banners/")
      .set({
        access_token: adminToken,
      })
      .send(body)
      .end((err, res) => {
        err ? done(err) : err;

        expect(res.statusCode).toEqual(400);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty("errors");
        expect(Array.isArray(res.body.errors)).toEqual(true);
        expect(res.body.errors).toEqual(
          expect.arrayContaining(["Name is required"])
        );

        done();
      });
  });

  // condition: all field filled with valid data except image_url
  // result: created failed
  it("Image url field is missed", (done) => {
    const body = {
      name: "Perahu Karet Rescue BlueLines 100% Original Produk",
      image_url: "",
      price: "32700000",
      stock: "100",
      CatId: "1",
    };

    request(app)
      .post("/api/banners/")
      .set({
        access_token: adminToken,
      })
      .send(body)
      .end((err, res) => {
        err ? done(err) : err;

        expect(res.statusCode).toEqual(400);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty("errors");
        expect(Array.isArray(res.body.errors)).toEqual(true);
        expect(res.body.errors).toEqual(
          expect.arrayContaining(["Image url is required"])
        );

        done();
      });
  });

  // condition: all field filled with valid data except price
  // result: created failed
  it("Price field is missed", (done) => {
    const body = {
      name: "Perahu Karet Rescue BlueLines 100% Original Produk",
      image_url:
        "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTpj1u7h60ZB6Z4HlTY97_6GwCwmAkGtBCG3Ji7cOMmwOIUntqGR_MTKKdDdC6XjvK8icy5s_YfEDqI7s2oh-kL8-73ZjcD7NccidUzWotI&usqp=CAE",
      price: "",
      stock: "100",
      CatId: "1",
    };

    request(app)
      .post("/api/banners/")
      .set({
        access_token: adminToken,
      })
      .send(body)
      .end((err, res) => {
        err ? done(err) : err;

        expect(res.statusCode).toEqual(400);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty("errors");
        expect(Array.isArray(res.body.errors)).toEqual(true);
        expect(res.body.errors).toEqual(
          expect.arrayContaining(["Price is required"])
        );

        done();
      });
  });

  // condition: all field filled with valid data except stock
  // result: created failed
  it("Stock field is missed", (done) => {
    const body = {
      name: "Perahu Karet Rescue BlueLines 100% Original Produk",
      image_url:
        "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTpj1u7h60ZB6Z4HlTY97_6GwCwmAkGtBCG3Ji7cOMmwOIUntqGR_MTKKdDdC6XjvK8icy5s_YfEDqI7s2oh-kL8-73ZjcD7NccidUzWotI&usqp=CAE",
      price: "32700000",
      stock: "",
      CatId: "1",
    };

    request(app)
      .post("/api/banners/")
      .set({
        access_token: adminToken,
      })
      .send(body)
      .end((err, res) => {
        err ? done(err) : err;

        expect(res.statusCode).toEqual(400);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty("errors");
        expect(Array.isArray(res.body.errors)).toEqual(true);
        expect(res.body.errors).toEqual(
          expect.arrayContaining(["Stock is required"])
        );

        done();
      });
  });

  // condition: all field filled with valid data except stock filled with minus number
  // result: created failed
  it("Stock field is filled with minus number", (done) => {
    const body = {
      name: "Perahu Karet Rescue BlueLines 100% Original Produk",
      image_url:
        "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTpj1u7h60ZB6Z4HlTY97_6GwCwmAkGtBCG3Ji7cOMmwOIUntqGR_MTKKdDdC6XjvK8icy5s_YfEDqI7s2oh-kL8-73ZjcD7NccidUzWotI&usqp=CAE",
      price: "32700000",
      stock: "-100",
      CatId: "1",
    };

    request(app)
      .post("/api/banners/")
      .set({
        access_token: adminToken,
      })
      .send(body)
      .end((err, res) => {
        err ? done(err) : err;

        expect(res.statusCode).toEqual(400);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty("errors");
        expect(Array.isArray(res.body.errors)).toEqual(true);
        expect(res.body.errors).toEqual(
          expect.arrayContaining(["Stock can not less than 0"])
        );

        done();
      });
  });

  // condition: all field filled with valid data except price filled with minus number
  // result: created failed
  it("Price field is filled with minus number", (done) => {
    const body = {
      name: "Perahu Karet Rescue BlueLines 100% Original Produk",
      image_url:
        "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTpj1u7h60ZB6Z4HlTY97_6GwCwmAkGtBCG3Ji7cOMmwOIUntqGR_MTKKdDdC6XjvK8icy5s_YfEDqI7s2oh-kL8-73ZjcD7NccidUzWotI&usqp=CAE",
      price: "-32700000",
      stock: "100",
      CatId: "1",
    };

    request(app)
      .post("/api/banners/")
      .set({
        access_token: adminToken,
      })
      .send(body)
      .end((err, res) => {
        err ? done(err) : err;

        expect(res.statusCode).toEqual(400);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty("errors");
        expect(Array.isArray(res.body.errors)).toEqual(true);
        expect(res.body.errors).toEqual(
          expect.arrayContaining(["Price can not less than 0"])
        );

        done();
      });
  });

  // condition: all field filled with valid data except stock filled with not number
  // result: created failed
  it("Stock field is filled with not number", (done) => {
    const body = {
      name: "Perahu Karet Rescue BlueLines 100% Original Produk",
      image_url:
        "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTpj1u7h60ZB6Z4HlTY97_6GwCwmAkGtBCG3Ji7cOMmwOIUntqGR_MTKKdDdC6XjvK8icy5s_YfEDqI7s2oh-kL8-73ZjcD7NccidUzWotI&usqp=CAE",
      price: "32700000",
      stock: "seratus",
      CatId: "1",
    };

    request(app)
      .post("/api/banners/")
      .set({
        access_token: adminToken,
      })
      .send(body)
      .end((err, res) => {
        err ? done(err) : err;

        expect(res.statusCode).toEqual(400);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty("errors");
        expect(Array.isArray(res.body.errors)).toEqual(true);
        expect(res.body.errors).toEqual(
          expect.arrayContaining(["Stock must be number"])
        );

        done();
      });
  });

  // condition: all field filled with valid data except price filled with not number
  // result: created failed
  it("Price field is filled with not number", (done) => {
    const body = {
      name: "Perahu Karet Rescue BlueLines 100% Original Produk",
      image_url:
        "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTpj1u7h60ZB6Z4HlTY97_6GwCwmAkGtBCG3Ji7cOMmwOIUntqGR_MTKKdDdC6XjvK8icy5s_YfEDqI7s2oh-kL8-73ZjcD7NccidUzWotI&usqp=CAE",
      price: "tigaratusjutaduapuluhtujuhriburupiah",
      stock: "100",
      CatId: "1",
    };

    request(app)
      .post("/api/banners/")
      .set({
        access_token: adminToken,
      })
      .send(body)
      .end((err, res) => {
        err ? done(err) : err;

        expect(res.statusCode).toEqual(400);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty("errors");
        expect(Array.isArray(res.body.errors)).toEqual(true);
        expect(res.body.errors).toEqual(
          expect.arrayContaining(["Price must be number"])
        );

        done();
      });
  });

  // condition: all field filled with valid data except image_url filled with not url
  // result: created failed
  it("Image url field is filled with not url", (done) => {
    const body = {
      name: "Perahu Karet Rescue BlueLines 100% Original Produk",
      image_url: "image",
      price: "3270000",
      stock: "100",
      CatId: "1",
    };

    request(app)
      .post("/api/banners/")
      .set({
        access_token: adminToken,
      })
      .send(body)
      .end((err, res) => {
        err ? done(err) : err;

        expect(res.statusCode).toEqual(400);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty("errors");
        expect(Array.isArray(res.body.errors)).toEqual(true);
        expect(res.body.errors).toEqual(
          expect.arrayContaining(["Image url must be an url"])
        );

        done();
      });
  });
});

/**
 * update banner
 * requirement test cases:
 * 1. not provide valid access_token
 * 2. provide valid access_token but the user is not an Admin
 * 3. stock field is filled with minus number
 * 4. price field is filled with minus number
 * 5. fields is filled with invalid data type [image_url, price, stock, CatId]
 *
 * additional test cases:
 * 1.
 */

describe("PUT /api/banners/", () => {
  it("Update banner success", (done) => {
    const body = {
      name: "Perahu Karet Rescue BlueLines 100% Original Produk",
      image_url:
        "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTpj1u7h60ZB6Z4HlTY97_6GwCwmAkGtBCG3Ji7cOMmwOIUntqGR_MTKKdDdC6XjvK8icy5s_YfEDqI7s2oh-kL8-73ZjcD7NccidUzWotI&usqp=CAE",
      price: "32700000",
      stock: "50",
      CatId: "1",
    };

    request(app)
      .put(`/api/banners/${BannerId}`)
      .set({ access_token: adminToken })
      .send(body)
      .end((err, res) => {
        err ? done(err) : err;

        expect(res.statusCode).toEqual(200);
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
        // expect(res.body).toHaveProperty("CatId");
        // expect(typeof res.body.CatId).toEqual("string");
        // expect(res.body.CatId).toEqual(body.CatId)

        done();
      });
  });

  // condition: stock filled with minus number
  // result: created failed
  it("Stock field is filled with minus number", (done) => {
    const body = {
      name: "Perahu Karet Rescue BlueLines 100% Original Produk",
      image_url:
        "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTpj1u7h60ZB6Z4HlTY97_6GwCwmAkGtBCG3Ji7cOMmwOIUntqGR_MTKKdDdC6XjvK8icy5s_YfEDqI7s2oh-kL8-73ZjcD7NccidUzWotI&usqp=CAE",
      price: "32700000",
      stock: "-100",
      CatId: "1",
    };

    request(app)
      .post("/api/banners/")
      .set({
        access_token: adminToken,
      })
      .send(body)
      .end((err, res) => {
        err ? done(err) : err;

        expect(res.statusCode).toEqual(400);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty("errors");
        expect(Array.isArray(res.body.errors)).toEqual(true);
        expect(res.body.errors).toEqual(
          expect.arrayContaining(["Stock can not less than 0"])
        );

        done();
      });
  });

  // condition: price filled with minus number
  // result: created failed
  it("Price field is filled with minus number", (done) => {
    const body = {
      name: "Perahu Karet Rescue BlueLines 100% Original Produk",
      image_url:
        "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTpj1u7h60ZB6Z4HlTY97_6GwCwmAkGtBCG3Ji7cOMmwOIUntqGR_MTKKdDdC6XjvK8icy5s_YfEDqI7s2oh-kL8-73ZjcD7NccidUzWotI&usqp=CAE",
      price: "-32700000",
      stock: "100",
      CatId: "1",
    };

    request(app)
      .post("/api/banners/")
      .set({
        access_token: adminToken,
      })
      .send(body)
      .end((err, res) => {
        err ? done(err) : err;

        expect(res.statusCode).toEqual(400);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty("errors");
        expect(Array.isArray(res.body.errors)).toEqual(true);
        expect(res.body.errors).toEqual(
          expect.arrayContaining(["Price can not less than 0"])
        );

        done();
      });
  });

  // condition: stock filled with not number
  // result: created failed
  it("Stock field is filled with not number", (done) => {
    const body = {
      name: "Perahu Karet Rescue BlueLines 100% Original Produk",
      image_url:
        "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTpj1u7h60ZB6Z4HlTY97_6GwCwmAkGtBCG3Ji7cOMmwOIUntqGR_MTKKdDdC6XjvK8icy5s_YfEDqI7s2oh-kL8-73ZjcD7NccidUzWotI&usqp=CAE",
      price: "32700000",
      stock: "seratus",
      CatId: "1",
    };

    request(app)
      .post("/api/banners/")
      .set({
        access_token: adminToken,
      })
      .send(body)
      .end((err, res) => {
        err ? done(err) : err;

        expect(res.statusCode).toEqual(400);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty("errors");
        expect(Array.isArray(res.body.errors)).toEqual(true);
        expect(res.body.errors).toEqual(
          expect.arrayContaining(["Stock must be number"])
        );

        done();
      });
  });

  // condition: price filled with not number
  // result: created failed
  it("Price field is filled with not number", (done) => {
    const body = {
      name: "Perahu Karet Rescue BlueLines 100% Original Produk",
      image_url:
        "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTpj1u7h60ZB6Z4HlTY97_6GwCwmAkGtBCG3Ji7cOMmwOIUntqGR_MTKKdDdC6XjvK8icy5s_YfEDqI7s2oh-kL8-73ZjcD7NccidUzWotI&usqp=CAE",
      price: "tigaratusjutaduapuluhtujuhriburupiah",
      stock: "100",
      CatId: "1",
    };

    request(app)
      .post("/api/banners/")
      .set({
        access_token: adminToken,
      })
      .send(body)
      .end((err, res) => {
        err ? done(err) : err;

        expect(res.statusCode).toEqual(400);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty("errors");
        expect(Array.isArray(res.body.errors)).toEqual(true);
        expect(res.body.errors).toEqual(
          expect.arrayContaining(["Price must be number"])
        );

        done();
      });
  });

  // condition: image_url filled with not url
  // result: created failed
  it("Image url field is filled with not url", (done) => {
    const body = {
      name: "Perahu Karet Rescue BlueLines 100% Original Produk",
      image_url: "image",
      price: "3270000",
      stock: "100",
      CatId: "1",
    };

    request(app)
      .post("/api/banners/")
      .set({
        access_token: adminToken,
      })
      .send(body)
      .end((err, res) => {
        err ? done(err) : err;

        expect(res.statusCode).toEqual(400);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty("errors");
        expect(Array.isArray(res.body.errors)).toEqual(true);
        expect(res.body.errors).toEqual(
          expect.arrayContaining(["Image url must be an url"])
        );

        done();
      });
  });
});

/**
 * Delete banner
 * requirement test cases:
 * 1. not provide valid access_token
 * 2. provide valid access_token but the user is not an Admin
 *
 * additional test cases:
 * 1.
 */

describe("DELETE /api/banners/", () => {
  // condition: not provide valid access_token
  // result: delete failed
  it("Not provide valid access_token", (done) => {
    request(app)
      .delete(`/api/banners/${BannerId}`)
      .end((err, res) => {
        err ? done(err) : err;

        expect(res.statusCode).toEqual(401);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty("errors");
        expect(Array.isArray(res.body.errors)).toEqual(true);
        expect(res.body.errors).toEqual(
          expect.arrayContaining(["Login first"])
        );

        done();
      });
  });

  // condition: provide valid access_token but not an Admin
  // result: delete failed
  it("Unauthorized", (done) => {
    request(app)
      .delete(`/api/banners/${BannerId}`)
      .set({
        access_token: customerToken,
      })
      .end((err, res) => {
        err ? done(err) : err;

        expect(res.statusCode).toEqual(403);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty("errors");
        expect(Array.isArray(res.body.errors)).toEqual(true);
        expect(res.body.errors).toEqual(
          expect.arrayContaining(["Unauthorized"])
        );

        done();
      });
  });

  it("Delete banner success", (done) => {
    request(app)
      .delete(`/api/banners/${BannerId}`)
      .set({ access_token: adminToken })
      .end((err, res) => {
        err ? done(err) : err;

        expect(res.statusCode).toEqual(200);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty("success");
        expect(Array.isArray(res.body.success)).toEqual(true);
        expect(res.body.success).toEqual(
          expect.arrayContaining([
            `Banner with id: '${BannerId}' success to delete`,
          ])
        );

        done();
      });
  });
});
