'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('CartItems', {
      fields: ['CartId', 'ProductId'],
      type: 'unique',
      name: 'CartProductUnique'
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('CartItems', 'CartProductUnique', {})
  }
};
