'use strict';

const { hashPassword } = require('../helper/bcrypt')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', 
    [
      {
      email: 'admin@mail.com',
      password: hashPassword('1234'),
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
        email: 'user@mail.com',
        password: hashPassword('1234'),
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {})
  }
};
