'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const fs = require('fs');
    const bannerDB = JSON.parse(fs.readFileSync('./databases/banner.json', 'utf-8'));

    bannerDB.forEach(e => {
      e.createdAt = new Date();
      e.updatedAt = new Date();
    });

    await queryInterface.bulkInsert('Banners', bannerDB, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Banners', null, {});
  }
};
