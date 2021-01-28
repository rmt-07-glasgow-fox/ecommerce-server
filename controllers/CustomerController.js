const { Customer } = require("../models/");
const { comparePassword } = require("../helpers/bcrypt.js");
const { generateJwt } = require("../helpers/jwt.js");

class CustomerController {
  static register(req, res, next) {
    Customer.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    })
      .then((dataCustomer) => {
        const payload = {
          id: dataCustomer.id,
          name: dataCustomer.name,
          email: dataCustomer.email,
          role: dataCustomer.role,
        };
        const access_token = generateJwt(payload);
        return res.status(201).json({ access_token });
      })
      .catch((err) => {
        next(err);
      });
  }

  static login(req, res, next) {
    const { email, password } = req.body;

    Customer.findOne({ where: { email } })
    .then((dataCustomer) => {
      if (!dataCustomer) {
        throw { name: "invalidEmailPassword" };
      }
      if (dataCustomer.role !== "customer") {
        throw { name: "customerOnly" };
      }
      const checkPassword = comparePassword(password, dataCustomer.password);
      if (!checkPassword) {
        throw { name: "invalidEmailPassword" };
      }
      const payload = {
        id: dataCustomer.id,
        name: dataCustomer.name,
        email: dataCustomer.email,
        role: dataCustomer.role,
      };
      const access_token = generateJwt(payload);
      return res.status(200).json({ access_token });
    })
    .catch((err) => {
      next(err);
    });
  }
  
}

module.exports = CustomerController;
