const {Product} = require('../models')

module.exports = async (req, res, next) => {
  try {
    const user = req.user
    const product = await Product.findByPk(req.params.id)
    if (user.id === product.UserId) {
      next()
    } else {
      throw {
        code: 403,
        message: 'Unauthorized'
      }
    }
  } catch (error) {
    next(error)
  }
}