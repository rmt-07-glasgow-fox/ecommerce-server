'use strict';

const { createHash } = require('../helpers/hashPassword')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        fullName: 'Admin',
        email: 'admin@mail.com',
        password: createHash('123456'),
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fullName: 'User',
        email: 'user@mail.com',
        password: createHash('123456'),
        role: 'customer',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
