'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Categories', [
      {
        name: 'Makanan',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Minuman',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Pakaian',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categories', null, {})
  }
};
