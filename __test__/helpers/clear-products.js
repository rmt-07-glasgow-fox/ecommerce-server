const {Product} = require('../../models')

clearProducts = () => {
  if(process.env.NODE_ENV === 'test') {
    return Product.destroy({where: {}})
  }
}

module.exports = clearProducts;