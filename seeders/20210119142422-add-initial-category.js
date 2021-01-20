'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const categories = [
      {
        name: 'Tops',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jeans',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Knitwear',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jumpers',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sportswear',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Shoes',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Accessories',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    await queryInterface.bulkInsert('Categories', categories, {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Categories', null, {})
  }
};
