'use strict';
const hashPassword = require('../helper/hashPasword')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const admin = {
      email: "admin@mail.com",
      username: "admin",
      role: "admin",
      password: hashPassword('1234'),
      createdAt: new Date(),
      updatedAt: new Date()
    }
    await queryInterface.bulkInsert("Users", [admin], {})
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
    await queryInterface.bulkDelete("Users", null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
