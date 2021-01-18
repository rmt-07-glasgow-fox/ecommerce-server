'use strict';

const { hashPassword } = require('../helpers/bcrypt')

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
   const data = [
     {
       email: 'bintang@gmail.com',
       password: hashPassword('bintang123'),
       role: 'customer',
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
      email: 'brenda@gmail.com',
      password: hashPassword('brenda123'),
      role: 'customer',
      createdAt: new Date(),
      updatedAt: new Date()
    }
   ]

   return queryInterface.bulkInsert('Users', data, {})
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
