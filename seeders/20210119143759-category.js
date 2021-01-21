'use strict';

let list = [
  {
    "name" : "Turboprop"
  },
  {
    "name" : "Turbojet"
  },
  {
    "name" : "Turboshaft"
  },
  {
    "name" : "Turbofan"
  },
  {
    "name" : "Ramjet "
  }
]

list.forEach(element => {
  element.createdAt = new Date()
  element.updatedAt = new Date()
});
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Categories', list )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete ( 'Categories', null , {} )
  }
};
