'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('CartItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      CartId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Carts'
          }
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      ProductId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Products'
          }
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      quantity: {
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
    await queryInterface.dropTable('CartItems');
  }
};