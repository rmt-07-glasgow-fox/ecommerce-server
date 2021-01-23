const { Category } = require('../models')

function clearCategory(){
  if(process.env.NODE_ENV == 'test'){
    return Category.destroy({where:{}})
  }
}

module.exports = clearCategory