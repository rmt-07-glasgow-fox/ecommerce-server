'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let data = [{
      firstname:"Sapu",
      lastname:"Jagad",
      email:"a@gmail.com",
      password:"123456",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      firstname:"Some",
      lastname:"One",
      email:"b@gmail.com",
      password:"123456",
      createdAt: new Date(),
      updatedAt: new Date()
    }]
    await queryInterface.bulkInsert('Users',data, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
