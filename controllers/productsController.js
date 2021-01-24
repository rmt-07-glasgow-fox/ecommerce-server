const { User, Product } = require('../models/index')
const { hashPassword, checkPassword} = require('../helpers/bcrypt')
const { generateToken, checkToken } = require('../helpers/jwt')

class Controller {
  static showAll (req, res, next) {
    Product.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      order: [
        ['updatedAt', 'DESC']
      ]
    })
    .then((data) => {
      return res.status(200).json(data)
    })
    .catch((err) => {
      next(err)
    })
  }

  static create (req, res, next) {
    let { name, image_url, price, stock } = req.body

    let input = {
      name, image_url, price, stock,
      UserId: +req.user.id
    }

    console.log(input);

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

  static update (req, res, next) {
    let { name, image_url, price, stock } = req.body
    let id = +req.params.id

    let input = {
      name, image_url, price, stock,
      UserId: +req.user.id
    }

    if (req.user.role !== 'admin') {
      return res.status(403).json({message:"Need administrator authorization!"})
    }

    Product.update(input, {
      where: {id: id}
    })
    .then((data) => {
      return res.status(201).json({message: "Product updated successfully!"})
    })
    .catch((err) => {
      next(err)
    })
  }

  static delete (req, res, next) {
    let id = +req.params.id

    if (req.user.role !== 'admin') {
      return res.status(403).json({message:"Need administrator authorization!"})
    }

    Product.destroy({
      where:{id:id}
    })
    .then((data) => {
      if (!data) {
        return res.status(404).json({message:"Error 404: task not found"})
      }
      return res.status(201).json({message: "Product deleted successfully!"})
    })
    .catch((err) => {
      next(err)
    })
  }
}

module.exports = Controller