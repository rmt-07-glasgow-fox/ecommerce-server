'use strict';
const { hashPassword } = require('../helpers/bcrypt')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let password = hashPassword('1234')
    console.log(password)
    await queryInterface.bulkInsert('Users', [{
      email: 'admin@mail.com',
      password: password,
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {})
  }
};
