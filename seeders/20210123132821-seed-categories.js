"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("Categories", [
      {
        name: "Shirts",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Pants",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Jackets",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Footwear",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Categories", null, {});
  },
};
