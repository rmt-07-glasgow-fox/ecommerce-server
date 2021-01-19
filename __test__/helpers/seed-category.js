const { Category } = require('../../models')

function seedCategory(userId){
  if(process.env.NODE_ENV === 'test'){
    const input = {
      name: 'Fashion',
      UserId: userId
    }
    return Category.create(input)
  }
}

module.exports = seedCategory