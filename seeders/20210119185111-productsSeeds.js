'use strict';

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
    let data = require('../products.json')
    // [
    //   {
    //     name: "Shoes",
    //     image_url:"https://freepngimg.com/thumb/shoes/28530-3-nike-shoes-transparent.png",
    //     price: 185000,
    //     stock: 4,
    //   },
    //   {
    //     name: "Jacket",
    //     image_url:"https://freepngimg.com/thumb/jacket/11-2-jacket-png.png",
    //     price: 245000,
    //     stock: 1,
    //   },
    // ]

    let payload = []
    data.forEach(element => {
      element.createdAt = new Date()
      element.updatedAt = new Date()
      payload.push(element)
    });

    await queryInterface.bulkInsert('Products', payload, {});
   
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Products', null, {});
  }
};
