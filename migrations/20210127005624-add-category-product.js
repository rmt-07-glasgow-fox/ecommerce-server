'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Products', 'CategoryId', {
      type: Sequelize.STRING,
      defaultValue: 0,
      onDelete: "CASCADE",
      onUpdated: "CASCADE"
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Products', 'CategoryId')
  }
};
