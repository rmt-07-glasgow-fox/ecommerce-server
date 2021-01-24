const { User } = require("../../models");
const { hashPassword } = require("../../helpers/bcrypt.js");
const { sequelize } = require("../../models");
const { queryInterface } = sequelize;

function clearUser() {
  if (process.env.NODE_ENV === "test") {
    return User.destroy({ where: {} });
  }
}

function seedUser() {
  if (process.env.NODE_ENV === "test") {
    const Users = [
      {
        email: "admin@mail.com",
        password: hashPassword("admin"),
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "notadmin@mail.com",
        password: hashPassword("notadmin"),
        role: "Customer",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    return queryInterface.bulkInsert("Users", Users, {});
  }
}


module.exports = {clearUser, seedUser};
