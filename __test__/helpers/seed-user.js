const { User } = require("../../models");


function seedUser(){
  if(process.env.NODE_ENV === 'test'){
    const input = {
      email: 'rafli@gmail.com',
      password: `123123123`,
    }
    return User.create(input)
  }
}

module.exports = seedUser