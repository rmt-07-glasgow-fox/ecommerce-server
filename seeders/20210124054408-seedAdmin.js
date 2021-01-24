'use strict';

const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(5)
const adminPass = bcrypt.hashSync('1234', salt)
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
      await queryInterface.bulkInsert('Users', [{
        email:'admin2@mail.com',
        password: adminPass,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      }])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {})
  }
};
