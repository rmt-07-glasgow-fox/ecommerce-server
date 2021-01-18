'use strict';
const { hashPassword } = require('../helpers/bcrypt.js');

const data = [
  {
    email: 'admin@mail.com',
    password: hashPassword('123456'),
    role: 'admin',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.bulkInsert('Users', data);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
