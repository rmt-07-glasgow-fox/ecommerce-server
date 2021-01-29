'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Categories', [
      { tag: 'Others', createdAt: new Date(), updatedAt: new Date() },
      { tag: 'Electronic', createdAt: new Date(), updatedAt: new Date() },
      { tag: 'Sport & Healthy', createdAt: new Date(), updatedAt: new Date() },
      { tag: 'Food & Drink', createdAt: new Date(), updatedAt: new Date() },
      { tag: 'Books', createdAt: new Date(), updatedAt: new Date() },
      { tag: 'Clothes & Fashion', createdAt: new Date(), updatedAt: new Date() },
      { tag: 'Tools & Furnitures', createdAt: new Date(), updatedAt: new Date() }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categories', null, {})
  }
};
