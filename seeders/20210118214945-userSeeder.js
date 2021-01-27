'use strict';
const { hashPassword } = require('../helpers/bcrypt')
const dataUser = [
  {
    email: "admin@mail.com",
    role: "admin",
    password: hashPassword("123456"),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    email: "customer@mail.com",
    role: "customer",
    password: hashPassword("123456"),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    email: "customer2@mail.com",
    role: "customer",
    password: hashPassword("123456"),
    createdAt: new Date(),
    updatedAt: new Date()
  }
]
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', dataUser)
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null)
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
