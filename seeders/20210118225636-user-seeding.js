"use strict";
const { hashPassword } = require("../helpers/bcrypt.js");

module.exports = {
  up: async (queryInterface, Sequelize) => {
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
    await queryInterface.bulkInsert("Users", Users, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
