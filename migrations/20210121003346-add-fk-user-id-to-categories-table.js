'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Categories', 'UserId', Sequelize.INTEGER)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Categories', 'UserId')
  }
};
