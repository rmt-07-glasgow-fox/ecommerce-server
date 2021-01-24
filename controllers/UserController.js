const { User } = require("../models");
const { checkPassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jsonwebtoken");

class UserController {
  static login(req, res, next) {
    const { email, password } = req.body;

    if (!email) next({ name: "NoEmail" });
    if (!password) next({ name: "NoPassword" });

    User.findOne({
      where: { email },
    })
      .then((response) => {
        if (!response) next({ name: "InvalidCredentials" });
        else {
          if (!checkPassword(password, response.password)) {
            next({ name: "InvalidCredentials" });
          } else {
            //create access token
            const payload = {
              id: response.id,
              email: response.email,
              role: response.role,
            };

            const access_token = createToken(payload);
            res.status(200).json({
              id: response.id,
              email: response.email,
              role: response.role,
              access_token,
            });
          }
        }
      })
      .catch((err) => {
        // res.status(500).json(err)
        next(err);
      });
  }
}

module.exports = UserController;
