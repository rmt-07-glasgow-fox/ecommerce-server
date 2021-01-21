'use strict';

const { hashPass } = require("../helpers/bcrypt");

let admin = [
  {
    email: 'admin@mail.com',
    password: hashPass('123456'),
    createdAt : new Date(),
    updatedAt : new Date()
  },
  {
    email: 'member@mail.com',
    password: hashPass('haha'),
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

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
    await queryInterface.bulkInsert("Users", admin,{})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {})
  }
};
