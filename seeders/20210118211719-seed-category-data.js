'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const fs = require('fs');
    const categoryDB = JSON.parse(fs.readFileSync('./databases/category.json', 'utf-8'));

    categoryDB.forEach(e => {
      e.createdAt = new Date();
      e.updatedAt = new Date();
    });

    await queryInterface.bulkInsert('Categories', categoryDB, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
