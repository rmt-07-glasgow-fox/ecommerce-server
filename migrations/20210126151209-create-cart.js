'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Carts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Users',
            key: 'id'
          },
          onDelete: 'cascade',
          onUpdate: 'cascade'
        }
      },
      ProductId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Products',
            key: 'id'
          },
          onDelete: 'cascade',
          onUpdate: 'cascade'
        }
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      cost: {
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
    await queryInterface.dropTable('Carts');
  }
};