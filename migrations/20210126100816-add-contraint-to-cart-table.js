'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addConstraint("Carts", {
      fields: ["ProductId"],
      type: "foreign key",
      name: "add_fk_to_product_id",
      references: {
        //Required field
        table: "Products",
        field: "id"
      },
      onDelete: "cascade",
      onUpdate: "cascade"
    })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeConstraint(
      "Carts",
      "add_fk_to_product_id"
    )
  }
};
