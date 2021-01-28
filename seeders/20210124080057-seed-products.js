'use strict';
const fs = require('fs')

module.exports = {
  up: async (queryInterface, Sequelize) => {

    let data = JSON.parse(fs.readFileSync('./product.json','utf-8'))
    await queryInterface.bulkInsert('Products',data,{})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Products',null,{})
  }
};
