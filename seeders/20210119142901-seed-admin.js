'use strict';

const { hash } = require("../helpers/bcrypt");

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
   let data = [
     {
      email: 'mail@email.com',
      password: hash('binmail'),
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      email: 'ultraman@email.com',
      password: hash('ultraman'),
      role: 'customer',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      email: 'admin@mail.com',
      password: hash('1234'),
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
     }
  ] 

   await queryInterface.bulkInsert('Users',data,{})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

   await queryInterface.bulkDelete('Users',null,{})
  }
};
