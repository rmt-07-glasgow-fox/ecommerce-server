'use strict';
const fs = require('fs'); 

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   const dataProduct = JSON.parse(fs.readFileSync('./dataProduct.json', 'utf-8'))
   dataProduct.forEach(el => {
     el.createdAt = new Date()
     el.updatedAt = new Date()
    });
    return queryInterface.bulkInsert('products', dataProduct, {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('products', null, {});
  }
};
