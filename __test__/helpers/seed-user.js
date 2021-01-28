const { User } = require("../../models");


function seedUser(email, password, role){
  if(process.env.NODE_ENV === 'test'){
    const input = {
      email,
      password,
      role
    }
    return User.create(input)
  }
}

module.exports = seedUser