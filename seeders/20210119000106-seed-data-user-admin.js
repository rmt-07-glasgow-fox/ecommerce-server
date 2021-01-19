'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        email: "admin@mail.com",
        password: "123456",
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: "customer@mail.com",
        password: "123456",
        role: "customer",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {})
  }
};
