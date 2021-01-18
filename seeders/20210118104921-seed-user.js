'use strict';
const { hashPassword } = require('../helpers/bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const user = [
      {
        firstname: 'Admin',
        lastname: 'Admin',
        email: 'admin@mail.com',
        password: hashPassword('1234567890'),
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert('Users', user, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
