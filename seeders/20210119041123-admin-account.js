'use strict';
const { hashPassword } =  require ('../helpers/bcrypt')

const { query } = require("express");

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
      const data = [
        {
          email: 'admin@mail.com',
          password: hashPassword('admin'),
          role: 'admin',
          createdAt: new Date (),
          updatedAt: new Date ()
        },
        {
          email: 'wow@gmail.com',
          password: hashPassword('qweqwe'),
          role: 'customer',
          createdAt: new Date (),
          updatedAt: new Date ()
        }
    ]

      await queryInterface.bulkInsert ('Users', data)
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete ('Users')
  }
};
