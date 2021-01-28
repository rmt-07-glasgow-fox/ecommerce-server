const { Product } = require("../../models");

function clearProduct(){
  if(process.env.NODE_ENV === 'test'){
    return Product.destroy({where: {}})
  }
}

module.exports = clearProduct