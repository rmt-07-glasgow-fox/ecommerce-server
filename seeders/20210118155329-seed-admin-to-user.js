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
    await queryInterface.bulkInsert('Users', [{
       name: 'John Doe',
       email: 'admin@mail.com',
       password: '1234',
       role: 'admin',
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
      name: 'Akira Nagashima',
      email: 'akira@mail.com',
      password: '123456',
      role: 'customer',
      createdAt: new Date(),
       updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
