'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('CartLists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      CartId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        reference:{model:{tableName:'Carts'},key:'id'},
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
      },
      ProductId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        reference:{model:{tableName:'Products'},key:'id'},
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
      },
      qty: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      currentPrice: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('CartLists');
  }
};