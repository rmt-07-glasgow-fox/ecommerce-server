'use strict';

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
   await queryInterface.bulkInsert('Categories', [
     {
       name: "Mouse",
       image: "mouse",
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
       name: "Printer",
       image: "print",
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
       name: "Laptop",
       image: "laptop",
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
       name: "Keyboard",
       image: "keyboard",
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
       name: "Headset",
       image: "headset",
       createdAt: new Date(),
       updatedAt: new Date()
     }
   ], {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Categories',null, {})
  }
};
