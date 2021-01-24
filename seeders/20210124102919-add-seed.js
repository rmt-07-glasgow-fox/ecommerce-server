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
   let seed = [
    {
      name: "Key-chain Luffy",
      stock: 10,
      price: 15000,
      image_url: 'https://images-na.ssl-images-amazon.com/images/I/516oWi4IkuL._AC_.jpg'
    }
  ]

  seed.forEach(el => {
    el.createdAt = new Date();
    el.updatedAt = new Date();
  });
    await queryInterface.bulkInsert('Products', seed, {});
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
