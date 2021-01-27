'use strict';

const user = require('../data/users.json');
const {hashPassword} = require('../helpers/bcrypt');

for(let i = 0; i < user.length; i++) {
  user[i].password = hashPassword(user[i].password);
  user[i].createdAt = new Date();
  user[i].updatedAt = new Date();
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', user, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {})
  }
};
