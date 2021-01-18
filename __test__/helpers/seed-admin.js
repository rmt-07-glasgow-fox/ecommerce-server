const { hashPassword } = require("../../helpers/brcypt");
const { sequelize } = require("../../models");


function seedAdmin(){
  if(process.env.NODE_ENV === 'test'){
    return sequelize.queryInterface.bulkInsert('Users', [
      {
        email: 'admin@mail.com',
        password: hashPassword('1234'),
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'rafli@mail.com',
        password: hashPassword('1234'),
        role: 'customers',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  }
}

module.exports = seedAdmin