const { Product } = require('../../models')

function clearProducts () {
  if (process.env.NODE_ENV == 'test') {
    return Product.destroy({where: {}})
  }
}

module.exports = clearProducts