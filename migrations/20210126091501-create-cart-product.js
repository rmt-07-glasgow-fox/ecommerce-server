'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('CartProducts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      CartId: {
        type: Sequelize.INTEGER,
        references: {
          model: {tableName: "Carts"},
          id: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      ProductId: {        
      type: Sequelize.INTEGER,
      references: {
        model: {tableName: "Products"},
        id: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
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
    await queryInterface.dropTable('CartProducts');
  }
};