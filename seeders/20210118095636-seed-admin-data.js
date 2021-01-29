'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const fs = require('fs');
    const userDB = JSON.parse(fs.readFileSync('./databases/user.json', 'utf-8'));

    userDB.forEach(e => {
      e.createdAt = new Date();
      e.updatedAt = new Date();
    });

    await queryInterface.bulkInsert('Users', userDB, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
