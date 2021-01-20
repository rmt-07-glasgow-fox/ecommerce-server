'use strict';
let products = require('../data/products.json');

module.exports = {

  up: async (queryInterface, Sequelize) => {
    products.map(product => {
      product.createdAt = new Date();
      product.updatedAt = new Date();
    })
    await queryInterface.bulkInsert('Products', products, {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Products', null, {})
  }
};
