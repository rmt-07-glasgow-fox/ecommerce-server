'use strict';

let admin = [
  {
    email: "admin@mail.com",
    password: "qweqwe"
  }
]

module.exports = {
  up: async (queryInterface, Sequelize) => {

    admin.forEach(el => {
      el.createdAT = new Date()
      el.updatedAt = new Date()
    })
    await queryInterface.bulkInsert("Admins", admin, {} )
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Admins", null, {} )
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
