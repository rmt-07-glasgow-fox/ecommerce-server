'use strict';
const { encrypt } = require('../helpers')
const data = [
  {
    email: "admin@gmail.com",
    password: encrypt("admin123"),
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    email: "customer@gmail.com",
    password: encrypt("customer123"),
    role: "customer",
    createdAt: new Date(),
    updatedAt: new Date()
  }
]
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', data)
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
    await queryInterface.bulkDelete('Users', null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
