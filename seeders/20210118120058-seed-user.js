'use strict';
const { hashPassword } = require("../helpers/hashPassword.js")


module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    let user = require('../data/user.json')
    user.forEach(el => {
      el.password = hashPassword(el.password)
      el.createdAt = new Date()
      el.updatedAt = new Date()
    })
    return queryInterface.bulkInsert('Users', user, {})
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Users', null, {})

  }
};
