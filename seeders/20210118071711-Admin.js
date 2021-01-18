'use strict';
const {
  hashPass
} = require("../helpers/bcrypt")
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: "admin@mail.com",
      password: hashPass("123456"),
      name: "admin name",
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      email: "notAdmin@mail.com",
      password: hashPass("123456"),
      name: "customer name",
      role: "customer",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
