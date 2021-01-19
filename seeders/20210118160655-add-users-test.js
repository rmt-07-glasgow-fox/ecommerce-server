'use strict';

const fs = require('fs');
const { hashPassword } = require('../helpers/bcrypt');
let data = JSON.parse(fs.readFileSync('./users.json', 'utf-8'))
data.forEach(el => {
  el.password = hashPassword(el.password)
  el.createdAt = new Date()
  el.updatedAt = new Date()
});

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', data, {} )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {} )
  }
};
