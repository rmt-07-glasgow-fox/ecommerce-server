'use strict';
const { hashPassword } = require('../helper/bcrypt');

let user = [
  {
    "email" : "admin@mail.com",
    "password" : hashPassword('1234'),
    "role" : "admin"
  },
  {
    "email" : "customer@mail.com",
    "password" : hashPassword('1234'),
    "role" : "customer"
  },
]

user.forEach(element => {
  element.createdAt = new Date()
  element.updatedAt = new Date()
});
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', user )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete ( 'Users', null , {} )
  }
};
