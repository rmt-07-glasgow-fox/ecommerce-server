'use strict';
const fs = require("fs/promises")

module.exports = {
  up: (queryInterface, Sequelize) => {
    return fs.readFile("./seeders/user.json", "utf-8")
    .then(data => {
      data = JSON.parse(data)
      data.forEach(el => {
        el.createdAt = new Date()
        el.updatedAt = new Date()
      })
      return queryInterface.bulkInsert("Users", data, {})
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {})
  }
};
