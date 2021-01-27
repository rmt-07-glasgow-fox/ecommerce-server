'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('WishlistItems', {
      fields: ['WishlistId', 'ProductId'],
      type: 'unique',
      name: 'WishlistProductUnique'
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('WishlistItems', 'WishlistProductUnique', {})
  }
};
