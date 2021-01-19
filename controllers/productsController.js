const { User, Product } = require('../models/index')
const { hashPassword, checkPassword} = require('../helpers/bcrypt')
const { generateToken, checkToken } = require('../helpers/jwt')

class Controller {
  static create (req, res, next) {
    let { name, image_url, price, stock } = req.body

    let input = {
      name, image_url, price, stock,
      UserId: +req.user.id
    }

    if (req.user.role !== 'admin') {
      return res.status(403).json({message:"Need administrator authorization!"})
    }

    Product.create(input, {
      returning: true
    })
    .then((data) => {
      data.dataValues.message = 'Product created successfully!'
      return res.status(201).json(data)
    })
    .catch((err) => {
      next(err)
    })
  }
}

module.exports = Controller