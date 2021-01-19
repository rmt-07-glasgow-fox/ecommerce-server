'use strict';
const { hashPassword } = require('../helper/bcrypt')
let admin = [
  {
    email: "admin@mail.com",
    password: "qweqwe",
    role: "admin"
  }
]

module.exports = {
  up: async (queryInterface, Sequelize) => {

    admin.forEach(el => {
      el.password = hashPassword(el.password)
      el.createdAt = new Date()
      el.updatedAt = new Date()
    })
    await queryInterface.bulkInsert("Users", admin, {} )
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
    await queryInterface.bulkDelete("Users", null, {} )
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
