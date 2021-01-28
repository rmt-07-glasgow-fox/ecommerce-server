'use strict';
const {hasher} = require("../helpers/hash")

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        name: "Admin 1",
        email: "admin@mail.com",
        password: hasher("123123"),
        role: "Admin",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {})
  }
};
