const request = require("supertest");
const app = require("../app");
const models = require("../models");
const adminToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTYxMTQ1NTQ3OH0.i1esdATOr_vqTO5yUSmWelzedi1ssHN4_kIcdQVP-kM";
const customerToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJjdXN0b21lckBtYWlsLmNvbSIsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTYxMTQ1NTQxNX0.x2OaBW1VCewQWigi66hxtOXpTpc0BBoMephE_bWOOI4";
let access_token = "";
let CategoryId = 1;

/**
 * create category
 * requirement test cases:
 * 1. not provide valid access_token
 * 2. provide valid access_token but the user is not an Admin
 * 3. required fields is missed [name]
 *
 * additional test cases:
 * 1.
 */

afterAll((done) => {
  request(app)
    .delete(`/api/categories/${CategoryId}`)
    .set({ access_token: adminToken })
    .end((err, res) => {
      err ? done(err) : err;

      models.sequelize.close();
      done();
    });
});

describe("POST /api/categories/", () => {
  // condition: all field filled with valid data
  // result: created success
  it("Create category success", (done) => {
    const body = {
      name: "Olahraga Outdoor",
    };

    request(app)
      .post("/api/categories/")
      .set({ access_token: adminToken })
      .send(body)
      .end((err, res) => {
        err ? done(err) : err;

        CategoryId = res.body.id;

        expect(res.statusCode).toEqual(201);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty("id");
        expect(typeof res.body.id).toEqual("number");
        expect(res.body).toHaveProperty("name");
        expect(typeof res.body.name).toEqual("string");
        expect(res.body.name).toEqual(body.name);

        done();
      });
  });

  // condition: all field filled with valid data without provide access_token
  // result: created failed
  it("Not provide access_token", (done) => {
    const body = {
      name: "Olahraga Outdoor",
    };

    request(app)
      .post("/api/categories/")
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
      name: "Olahraga Outdoor",
    };

    request(app)
      .post("/api/categories/")
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
    };

    request(app)
      .post("/api/categories/")
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
});

/**
 * update category
 * requirement test cases:
 * 1. not provide valid access_token
 * 2. provide valid access_token but the user is not an Admin
 *
 * additional test cases:
 * 1.
 */

describe("PUT /api/categories/", () => {
  it("Update category success", (done) => {
    const body = {
      name: "Olahraga Outdoor",
    };

    request(app)
      .put(`/api/categories/${CategoryId}`)
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

        done();
      });
  });

  // condition: all field filled with valid data without provide access_token
  // result: created failed
  it("Not provide access_token", (done) => {
    const body = {
      name: "Olahraga Outdoor",
    };

    request(app)
      .put(`/api/categories/${CategoryId}`)
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
      name: "Olahraga Outdoor",
    };

    request(app)
      .put(`/api/categories/${CategoryId}`)
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
    };

    request(app)
      .post("/api/categories/")
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
});


/**
 * update category
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

describe("DELETE /api/categories/", () => {
  // condition: not provide valid access_token
  // result: delete failed
  it("Not provide valid access_token", (done) => {
    request(app)
      .delete(`/api/categories/${CategoryId}`)
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
  it("Not an admin", (done) => {
    request(app)
      .delete(`/api/categories/${CategoryId}`)
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

  it("Delete category success", (done) => {
    request(app)
      .delete(`/api/categories/${CategoryId}`)
      .set({ access_token: adminToken })
      .end((err, res) => {
        err ? done(err) : err;

        expect(res.statusCode).toEqual(200);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty("success");
        expect(Array.isArray(res.body.success)).toEqual(true);
        expect(res.body.success).toEqual(
          expect.arrayContaining([
            `Category with id: '${CategoryId}' success to delete`,
          ])
        );

        done();
      });
  });
});
