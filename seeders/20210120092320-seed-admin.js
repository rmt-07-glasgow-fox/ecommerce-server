'use strict';
const {hashPassword} = require('../helper/hash')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
    {
     name: 'Romi Zaki',
     email: 'admin@mail.com',
     password: hashPassword('1234'),
     role: 'Admin',
     createdAt: new Date(),
     updatedAt: new Date()
    }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
