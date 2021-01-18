'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.addColumn("Products", "AdminId", {
        type: Sequelize.INTEGER,
        references: {
          model: {tableName: "Admins"},
          key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      })
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Products", "AdminId", {})
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
