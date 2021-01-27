'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let data = require('../data/products.json')
    let obj = []
    for (let i = 0; i < data.length; i++) {
      obj.push({
        name: data[i].name,
        image_url: data[i].image_url,
        price: data[i].price,
        stock: data[i].stock,
        category: data[i].category,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
    return queryInterface.bulkInsert('Products',obj,{})
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Products',null,{})
  }
};
