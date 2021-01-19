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
    await queryInterface.bulkInsert('Brands', [{
      name: 'Compass',
      image_url: '/brands/compass.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Campess',
      image_url: '/brands/campess.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Ventela',
      image_url: '/brands/ventela.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Patrobas',
      image_url: '/brands/patrobas.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('Brands', null, {})
  }
};
