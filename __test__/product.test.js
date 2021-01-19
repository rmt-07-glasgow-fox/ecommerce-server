const request = require("supertest")
const app = require("../app")
const { User, Product } = require("../models")
const { generateToken } = require("../helpers/jwt")
const { clearProduct, clearNewUser } = require("../helpers/clearAll")

let access_token_admin
let access_token_notAdmin

let inputProduct = {
  name: "Monster Hunter World",
  imageUrl: "https://www.monsterhunterworld.com/sp/images/top/bg_mv.jpg",
  price: 699999,
  stock: 100,
  genre: "adventure",
}
let productId

beforeAll(done => {
  User.findOne({
    where: { email: "admin@mail.com" }
  })
    .then(data => {
      access_token_admin = generateToken({
        id: data.id, email: data.email, role: data.role
      })
      return User.findOne({
        where: { email: "notAdmin@mail.com" }
      })
    })
    .then(data => {
      access_token_notAdmin = generateToken({
        id: data.id, email: data.email, role: data.role
      })
      return Product.create(inputProduct)
    })
    .then(data => {
      productId = data.id
      done()
    })
    .catch(err => {
      done()
    })
})

afterAll((done) => {
  console.log(access_token_notAdmin);
  clearProduct()
    .then(() => {
      return clearNewUser()
    })
    .then(() => {
      done()
    })
    .catch(console.log)
});

describe("POST/products", function () {

  describe("POST success", () => {
    it("should send response with 201 status code", function (done) {
      //Setup
      const body = inputProduct
      //Execute
      request(app)
        .post("/products")
        .set("access_token", access_token_admin)
        .send(body)
        .end(function (err, res) {
          if (err) done(err)

          //Assert
          expect(res.statusCode).toEqual(201)
          expect(typeof res.body).toEqual("object")
          expect(res.body).toHaveProperty("name")
          expect(res.body.name).toEqual(body.name)
          expect(res.body).toHaveProperty("imageUrl")
          expect(res.body.imageUrl).toEqual(body.imageUrl)
          expect(res.body).toHaveProperty("price")
          expect(res.body.price).toEqual(body.price)
          expect(res.body).toHaveProperty("stock")
          expect(res.body.stock).toEqual(body.stock)
          expect(res.body).toHaveProperty("genre")
          expect(res.body.genre).toEqual(body.genre)

          done()
        })
    })
  })

  describe("Empty access_token", () => {
    it("should send response with 401 status code", function (done) {
      //Setup
      const body = inputProduct
      //Execute
      request(app)
        .post("/products")
        .set("access_token", ""  )
        .send(body)
        .end(function (err, res) {
          if (err) done(err)

          //Assert
          expect(res.statusCode).toEqual(401)
          expect(typeof res.body).toEqual("object")
          expect(res.body).toHaveProperty("message")
          expect(res.body).toEqual(
            expect.objectContaining({ message: "Please login first" })
          )

          done()
        })
    })
  })

  describe("access_token not belong to admin", () => {
    it('should send response with status code 401', (done) => {
      const body = inputProduct
      let notAdmin = access_token_notAdmin

      request(app)
        .post("/products")
        .set("access_token", notAdmin)
        .send(body)
        .end((err, res) => {
          if (err) done(err)

          expect(res.statusCode).toEqual(401);
          expect(typeof res.body).toEqual("object");
          expect(res.body).toHaveProperty("message", "You're unauthorized to do this");

          done()
        })
    });
  })

  describe("Required name field must not empty", () => {
    it("should send response with 400 status code", (done) => {
      //Setup
      const body = {
        name: "",
        imageUrl: "https://www.monsterhunterworld.com/sp/images/top/bg_mv.jpg",
        price: 699999,
        stock: 100,
        genre: "adventure",
      }
      //Execute
      request(app)
        .post("/products")
        .set("access_token", access_token_admin)
        .send(body)
        .end((err, res) => {
          if (err) done(err)

          //Assert
          expect(res.statusCode).toEqual(400)
          expect(typeof res.body).toEqual("object")
          expect(res.body).toHaveProperty("errors")
          expect(Array.isArray(res.body.errors)).toEqual(true)
          expect(res.body.errors).toEqual(
            expect.arrayContaining(["Name is required"])
          );

          done()
        })
    })
  })

  describe('Required imageUrl must not empty', () => {
    it('should send response with 400 status code', (done) => {
      const body = {
        name: "Monster Hunter World",
        imageUrl: "",
        price: 699999,
        stock: 100,
        genre: "adventure",
      }
      //Execute
      request(app)
        .post("/products")
        .set("access_token", access_token_admin)
        .send(body)
        .end((err, res) => {
          if (err) done(err)

          expect(res.statusCode).toEqual(400);
          expect(typeof res.body).toEqual("object");
          expect(res.body).toHaveProperty("errors");
          expect(Array.isArray(res.body.errors)).toEqual(true);
          expect(res.body.errors).toEqual(
            expect.arrayContaining(["Image URL is required"])
          );

          done()
        })
    });
  });

  describe('Required price must not empty', () => {
    it('should send response with 400 status code', (done) => {
      //Setup
      const body = {
        name: "Monster Hunter World",
        imageUrl: "https://www.monsterhunterworld.com/sp/images/top/bg_mv.jpg",
        price: "",
        stock: 100,
        genre: "adventure",
      }
      //Execute
      request(app)
        .post("/products")
        .set("access_token", access_token_admin)
        .send(body)
        .end((err, res) => {
          if (err) done(err)

          //Assert
          expect(res.statusCode).toEqual(400);
          expect(typeof res.body).toEqual("object");
          expect(res.body).toHaveProperty("errors");
          expect(Array.isArray(res.body.errors)).toEqual(true);
          expect(res.body.errors).toEqual(
            expect.arrayContaining(["Price is required"])
          );

          done()
        })
    });
  });

  describe('Price must be greater than zero', () => {
    it('should send response with status code 400', (done) => {
      //Setup
      const body = {
        name: "Monster Hunter World",
        imageUrl: "https://www.monsterhunterworld.com/sp/images/top/bg_mv.jpg",
        price: 0,
        stock: 100,
        genre: "adventure",
      }
      //Execute
      request(app)
        .post("/products")
        .set("access_token", access_token_admin)
        .send(body)
        .end((err, res) => {
          if(err) done(err)
          //Assert
          expect(res.statusCode).toEqual(400);
          expect(typeof res.body).toEqual("object");
          expect(res.body).toHaveProperty("errors");
          expect(Array.isArray(res.body.errors)).toEqual(true);
          expect(res.body.errors).toEqual(
            expect.arrayContaining(["Price must be greater than zero"])
          );
  
          done()
        })
    });
  });

  describe('Price must be greater than zero', () => {
    it('should send response with status code 400', (done) => {
      //Setup
      const body = {
        name: "Monster Hunter World",
        imageUrl: "https://www.monsterhunterworld.com/sp/images/top/bg_mv.jpg",
        price: -200,
        stock: 100,
        genre: "adventure",
      }
      request(app)
        .post("/products")
        .set("access_token", access_token_admin)
        .send(body)
        .end((err, res) => {
          if(err) done(err)
  
          expect(res.statusCode).toEqual(400);
          expect(typeof res.body).toEqual("object");
          expect(res.body).toHaveProperty("errors");
          expect(Array.isArray(res.body.errors)).toEqual(true);
          expect(res.body.errors).toEqual(
            expect.arrayContaining(["Price must be greater than zero"])
          );
  
          done()
        })
    });
  });

  describe('Stock must not be less than zero', () => {
    it('should send response with 400 status code', (done) => {
      //setup
      const body = {
        name: "Monster Hunter World",
        imageUrl: "https://www.monsterhunterworld.com/sp/images/top/bg_mv.jpg",
        price: 699999,
        stock: -20,
        genre: "adventure",
      }
      //execute
      request(app)
        .post("/products")
        .set("access_token", access_token_admin)
        .send(body)
        .end((err, res) => {
          if(err) done(err)

          expect(res.statusCode).toEqual(400);
          expect(typeof res.body).toEqual("object");
          expect(res.body).toHaveProperty("errors")
          expect(Array.isArray(res.body.errors)).toEqual(true);
          expect(res.body.errors).toEqual(
            expect.arrayContaining(["Stock must not be less than zero"])
          );

          done()
        })
    });
  });

  describe('Required genre field must not empty', () => {
    it('should send response with 400 status code', (done) => {
      const body = {
        name: "Monster Hunter World",
        imageUrl: "https://www.monsterhunterworld.com/sp/images/top/bg_mv.jpg",
        price: 699999,
        stock: 200,
        genre: "",
      }
      //exec
      request(app)
        .post("/products")
        .set("access_token", access_token_admin)
        .send(body)
        .end((err, res) => {
          if (err) done(err)

          //assert
          expect(res.statusCode).toEqual(400);
          expect(typeof res.body).toEqual("object");
          expect(res.body).toHaveProperty("errors");
          expect(Array.isArray(res.body.errors)).toEqual(true);
          expect(res.body.errors).toEqual(
            expect.arrayContaining(["Genre is required"])
          );

          done()
        })
    });
  });

  describe('Data type must be same as required data type', () => {
    it('should send response with 400 status code', (done) => {
      const body = {
        name: 100,
        imageUrl: 100,
        price: "hundred",
        stock: "hundred",
        genre: 200,
      }
      //exec
      request(app)
        .post("/products")
        .set("access_token", access_token_admin)
        .send(body)
        .end((err, res) => {
          if (err) done(err)

          //assert
          expect(res.statusCode).toEqual(400);
          expect(typeof res.body).toEqual("object");
          expect(res.body).toHaveProperty("errors");
          expect(Array.isArray(res.body.errors)).toEqual(true);
          expect(res.body.errors).toEqual(
            expect.arrayContaining(["Name must be string", "Image URL must be string", "Price must be integer",
            "Stock must be integer", "Genre must be string"])
          );

          done()
        })
    });
  });
})

describe('GET/products', () => {
  describe('Get success', () => {
    it('should send response with status code 200', (done) => {
      //setup
      //exec
      request(app)
        .get("/products")
        .set({ access_token: access_token_admin})
        .end((err, res) => {
          if (err) done(err)

          expect(res.statusCode).toEqual(200);
          expect(typeof res.body).toEqual("object");

          done()
        })
    });
  });

  describe('Empty access token', () => {
    it('should send response with status code 401', (done) => {
      request(app)
        .get("/product")
        .set({ access_token: ""})
        .end((err, res) => {
          if (err) done(err)

          expect(res.statusCode).toEqual(401)
          expect(typeof res.body).toEqual("object")
          expect(res.body).toHaveProperty("message")
          expect(res.body).toEqual(
            expect.objectContaining({ message: "Please login first" })
          )

          done()
        })
    });
  });
});

describe('GET/products/:id', () => {
  describe('Get success', () => {
    it('should send response with status code 200', (done) => {
      //setup
      let id = productId
      //exec
      request(app)
        .get("/products/" + id)
        .set({ access_token: access_token_admin})
        .end((err, res) => {
          if (err) done(err)

          expect(res.statusCode).toEqual(200);
          expect(typeof res.body).toEqual("object");
          expect(res.body).toHaveProperty("id")
          expect(res.body).toHaveProperty("name")
          expect(res.body).toHaveProperty("imageUrl")
          expect(res.body).toHaveProperty("price")
          expect(res.body).toHaveProperty("stock")
          expect(res.body).toHaveProperty("genre")

          done()
        })
    });
  });

  describe('Empty access token', () => {
    it('should send response with status code 401', (done) => {
      let id = productId
      request(app)
        .get("/product/" + id)
        .set({ access_token: ""})
        .end((err, res) => {
          if (err) done(err)

          expect(res.statusCode).toEqual(401)
          expect(typeof res.body).toEqual("object")
          expect(res.body).toHaveProperty("message")
          expect(res.body).toEqual(
            expect.objectContaining({ message: "Please login first" })
          )

          done()
        })
    });
  });

  describe('Data not found', () => {
    it('should send response with status code 404', (done) => {
      let id = productId + 2
      //exec
      request(app)
        .delete("/products/" + id)
        .set("access_token", access_token_admin)

        .end((err, res) => {
          if(err) done(err)

          expect(res.statusCode).toEqual(404);
          expect(typeof res.body).toEqual("object");
          expect(res.body).toHaveProperty("message", "Not found");

          done()
        })
    });
  });


});

describe("PUT/products/:id", function () {
  describe("PUT success", () => {
    it("should send response with 200 status code", function (done) {
      //Setup
      const body = {
        name: "Monster Hunter World Next",
        imageUrl: "https://www.monsterhunterworld.com/sp/images/top/bg_mv.jpg",
        price: 666666,
        stock: 50,
        genre: "adventure",
      }
      let id = productId
      //Execute
      request(app)
        .put("/products/" + id)
        .set("access_token", access_token_admin)
        .send(body)
        .end(function (err, res) {
          if (err) done(err)

          //Assert
          expect(res.statusCode).toEqual(200)
          expect(typeof res.body).toEqual("object")
          expect(res.body).toEqual([1]);

          done()
        })
    })
  })

  describe("Empty access_token", () => {
    it("should send response with 401 status code", function (done) {
      //Setup
      const body = {
        name: "Monster Hunter World Next",
        imageUrl: "https://www.monsterhunterworld.com/sp/images/top/bg_mv.jpg",
        price: 666666,
        stock: 50,
        genre: "adventure",
      }
      let id = productId
      //Execute
      request(app)
        .put("/products/" + id)
        .set("access_token", ""  )
        .send(body)
        .end(function (err, res) {
          if (err) done(err)

          //Assert
          expect(res.statusCode).toEqual(401)
          expect(typeof res.body).toEqual("object")
          expect(res.body).toHaveProperty("message")
          expect(res.body).toEqual(
            expect.objectContaining({ message: "Please login first" })
          )

          done()
        })
    })
  })

  describe("access_token not belong to admin", () => {
    it('should send response with status code 401', (done) => {
      const body = {
        name: "Monster Hunter World Next",
        imageUrl: "https://www.monsterhunterworld.com/sp/images/top/bg_mv.jpg",
        price: 666666,
        stock: 50,
        genre: "adventure",
      }
      let id = productId
      let notAdmin = access_token_notAdmin

      request(app)
        .put("/products/" + id)
        .set("access_token", notAdmin)
        .send(body)
        .end((err, res) => {
          if (err) done(err)

          expect(res.statusCode).toEqual(401);
          expect(typeof res.body).toEqual("object");
          expect(res.body).toHaveProperty("message", "You're unauthorized to do this");

          done()
        })
    });
  })

  describe("Required name field must not empty", () => {
    it("should send response with 400 status code", (done) => {
      //Setup
      const body = {
        name: "",
        imageUrl: "https://www.monsterhunterworld.com/sp/images/top/bg_mv.jpg",
        price: 699999,
        stock: 100,
        genre: "adventure",
      }
      let id = productId
      //Execute
      request(app)
        .put("/products/" + id)
        .set("access_token", access_token_admin)
        .send(body)
        .end((err, res) => {
          if (err) done(err)

          //Assert
          expect(res.statusCode).toEqual(400)
          expect(typeof res.body).toEqual("object")
          expect(res.body).toHaveProperty("errors")
          expect(Array.isArray(res.body.errors)).toEqual(true)
          expect(res.body.errors).toEqual(
            expect.arrayContaining(["Name is required"])
          );

          done()
        })
    })
  })

  describe('Required imageUrl must not empty', () => {
    it('should send response with 400 status code', (done) => {
      const body = {
        name: "Monster Hunter World",
        imageUrl: "",
        price: 699999,
        stock: 100,
        genre: "adventure",
      }
      let id = productId
      //Execute
      request(app)
        .put("/products/" + id)
        .set("access_token", access_token_admin)
        .send(body)
        .end((err, res) => {
          if (err) done(err)

          expect(res.statusCode).toEqual(400);
          expect(typeof res.body).toEqual("object");
          expect(res.body).toHaveProperty("errors");
          expect(Array.isArray(res.body.errors)).toEqual(true);
          expect(res.body.errors).toEqual(
            expect.arrayContaining(["Image URL is required"])
          );

          done()
        })
    });
  });

  describe('Required price must not empty', () => {
    it('should send response with 400 status code', (done) => {
      //Setup
      const body = {
        name: "Monster Hunter World",
        imageUrl: "https://www.monsterhunterworld.com/sp/images/top/bg_mv.jpg",
        price: "",
        stock: 100,
        genre: "adventure",
      }
      let id = productId
      //Execute
      request(app)
        .put("/products/" + id)
        .set("access_token", access_token_admin)
        .send(body)
        .end((err, res) => {
          if (err) done(err)

          //Assert
          expect(res.statusCode).toEqual(400);
          expect(typeof res.body).toEqual("object");
          expect(res.body).toHaveProperty("errors");
          expect(Array.isArray(res.body.errors)).toEqual(true);
          expect(res.body.errors).toEqual(
            expect.arrayContaining(["Price is required"])
          );

          done()
        })
    });
  });

  describe('Price must be greater than zero', () => {
    it('should send response with status code 400', (done) => {
      //Setup
      const body = {
        name: "Monster Hunter World",
        imageUrl: "https://www.monsterhunterworld.com/sp/images/top/bg_mv.jpg",
        price: 0,
        stock: 100,
        genre: "adventure",
      }
      let id = productId
      //Execute
      request(app)
        .put("/products/" + id)
        .set("access_token", access_token_admin)
        .send(body)
        .end((err, res) => {
          if(err) done(err)
          //Assert
          expect(res.statusCode).toEqual(400);
          expect(typeof res.body).toEqual("object");
          expect(res.body).toHaveProperty("errors");
          expect(Array.isArray(res.body.errors)).toEqual(true);
          expect(res.body.errors).toEqual(
            expect.arrayContaining(["Price must be greater than zero"])
          );
  
          done()
        })
    });
  });

  describe('Price must be greater than zero', () => {
    it('should send response with status code 400', (done) => {
      //Setup
      const body = {
        name: "Monster Hunter World",
        imageUrl: "https://www.monsterhunterworld.com/sp/images/top/bg_mv.jpg",
        price: -200,
        stock: 100,
        genre: "adventure",
      }
      let id = productId
      request(app)
        .put("/products/" + id)
        .set("access_token", access_token_admin)
        .send(body)
        .end((err, res) => {
          if(err) done(err)
  
          expect(res.statusCode).toEqual(400);
          expect(typeof res.body).toEqual("object");
          expect(res.body).toHaveProperty("errors");
          expect(Array.isArray(res.body.errors)).toEqual(true);
          expect(res.body.errors).toEqual(
            expect.arrayContaining(["Price must be greater than zero"])
          );
  
          done()
        })
    });
  });

  describe('Stock must not be less than zero', () => {
    it('should send response with 400 status code', (done) => {
      //setup
      const body = {
        name: "Monster Hunter World",
        imageUrl: "https://www.monsterhunterworld.com/sp/images/top/bg_mv.jpg",
        price: 699999,
        stock: -20,
        genre: "adventure",
      }
      let id = productId
      //execute
      request(app)
        .put("/products/" + id)
        .set("access_token", access_token_admin)
        .send(body)
        .end((err, res) => {
          if(err) done(err)

          expect(res.statusCode).toEqual(400);
          expect(typeof res.body).toEqual("object");
          expect(res.body).toHaveProperty("errors")
          expect(Array.isArray(res.body.errors)).toEqual(true);
          expect(res.body.errors).toEqual(
            expect.arrayContaining(["Stock must not be less than zero"])
          );

          done()
        })
    });
  });

  describe('Required genre field must not empty', () => {
    it('should send response with 400 status code', (done) => {
      const body = {
        name: "Monster Hunter World",
        imageUrl: "https://www.monsterhunterworld.com/sp/images/top/bg_mv.jpg",
        price: 699999,
        stock: 200,
        genre: "",
      }
      let id = productId
      //exec
      request(app)
        .put("/products/" + id)
        .set("access_token", access_token_admin)
        .send(body)
        .end((err, res) => {
          if (err) done(err)

          //assert
          expect(res.statusCode).toEqual(400);
          expect(typeof res.body).toEqual("object");
          expect(res.body).toHaveProperty("errors");
          expect(Array.isArray(res.body.errors)).toEqual(true);
          expect(res.body.errors).toEqual(
            expect.arrayContaining(["Genre is required"])
          );

          done()
        })
    });
  });

  describe('Data type must be same as required data type', () => {
    it('should send response with 400 status code', (done) => {
      const body = {
        name: 100,
        imageUrl: 100,
        price: "hundred",
        stock: "hundred",
        genre: 200,
      }
      let id = productId
      //exec
      request(app)
        .put("/products/" + id)
        .set("access_token", access_token_admin)
        .send(body)
        .end((err, res) => {
          if (err) done(err)

          //assert
          expect(res.statusCode).toEqual(400);
          expect(typeof res.body).toEqual("object");
          expect(res.body).toHaveProperty("errors");
          expect(Array.isArray(res.body.errors)).toEqual(true);
          expect(res.body.errors).toEqual(
            expect.arrayContaining(["Name must be string", "Image URL must be string", "Price must be integer",
            "Stock must be integer", "Genre must be string"])
          );

          done()
        })
    });
  });
})

describe('DELETE/products/:id', () => {
  describe("Empty access_token", () => {
    it("should send response with 401 status code", function (done) {
      let id = productId
      //exec
      request(app)
        .delete("/products/" + id)
        .set("access_token", "")
        .end((err, res) => {
          if(err) done(err)

          //Assert
          expect(res.statusCode).toEqual(401)
          expect(typeof res.body).toEqual("object")
          expect(res.body).toHaveProperty("message")
          expect(res.body).toEqual(
            expect.objectContaining({ message: "Please login first" })
          )

          done()
        })
    })
  })

  describe("access_token not belong to admin", () => {
    it('should send response with status code 401', (done) => {
      let id = productId
      let notAdmin = access_token_notAdmin

      request(app)
        .delete("/products/" + id)
        .set("access_token", notAdmin)
        .end((err, res) => {
          if (err) done(err)

          expect(res.statusCode).toEqual(401);
          expect(typeof res.body).toEqual("object");
          expect(res.body).toHaveProperty("message", "You're unauthorized to do this");

          done()
        })
    });
  })

  describe('Delete success', () => {
    it('should send response with status code 200', (done) => {
      let id = productId
      //exec
      request(app)
        .delete("/products/" + id)
        .set("access_token", access_token_admin)

        .end((err, res) => {
          if(err) done(err)

          expect(res.statusCode).toEqual(200);
          expect(typeof res.body).toEqual("object");
          expect(res.body).toHaveProperty("message", "Product successfully deleted");

          done()
        })
    });
  });

  describe('Data not found', () => {
    it('should send response with status code 404', (done) => {
      let id = productId
      //exec
      request(app)
        .delete("/products/" + id)
        .set("access_token", access_token_admin)

        .end((err, res) => {
          if(err) done(err)

          expect(res.statusCode).toEqual(404);
          expect(typeof res.body).toEqual("object");
          expect(res.body).toHaveProperty("message", "Not found");

          done()
        })
    });
  });
  
});



