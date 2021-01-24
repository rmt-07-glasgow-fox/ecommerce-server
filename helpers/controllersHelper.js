const { Product, Category } = require('../models')

module.exports = {
  fetchOneProduct(id) {
    return Product.findOne({
      where: { id },
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      },
      include: {
        model: Category,
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        }
      }
    })
  },
  updatedProduct(params, id) {
    return Product.update(params, { where: { id } })
  }
}