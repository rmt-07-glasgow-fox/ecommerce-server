'use strict';
const fs = require('fs'); 
const { hashPassword } = require('../helpers/bcrypt');
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
   const dataAdmin = JSON.parse(fs.readFileSync('./dataUser.json', 'utf-8'))
   dataAdmin.forEach(el => {
     el.password = hashPassword(el.password)
     el.createdAt = new Date()
     el.updatedAt = new Date()
    });
    return queryInterface.bulkInsert('users', dataAdmin, {})
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('users', null, {});
  }
};
