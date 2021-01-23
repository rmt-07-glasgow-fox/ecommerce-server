"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn(
      "Products",
      "CategoryId",
      {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Categories",
          },
          key: "id"
        },
        onDelete: "SET NULL",
        onUpdate: "CASCADE"
      },
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn("Product", "CategoryId");
  },
};
