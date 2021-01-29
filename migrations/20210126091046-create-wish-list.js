'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('WishLists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        reference:{model:{tableName:'Users'},key:'id'},
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
    await queryInterface.dropTable('WishLists');
  }
};