const { Product } = require('../../models/index');

function clearDb () {
  return Product.destroy({ where: {} });
}

module.exports = clearDb;