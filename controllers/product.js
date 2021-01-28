const {Product} = require("../models")

class ProductController {
  static add(req, res, next) {
    const product = {
      name: req.body.name,
      image_url: req.body.image_url,
      price: req.body.price,
      stock: req.body.stock,
      UserId: req.user.id
    }

    Product.create(product)
    .then(data => {
      return res.status(201).json(data)
    })
    .catch(next)
  }

  static getAll(req, res, next) {

    Product.findAll()
    .then(data => {
      return res.status(200).json({data})
    })
    .catch(next)
  }

  static findCurrent(req, res, next) {
    let id = +req.params.id

    Product.findByPk(id)
    .then(data => {
      return res.status(200).json(data)
    })
    .catch(next)
  }

  static put(req, res, next) {
    let id = +req.params.id

    const updatedData = {
      name: req.body.name,
      image_url: req.body.image_url,
      price: req.body.price,
      stock: req.body.stock
    }

    Product.update(updatedData, {where: {id}})
    .then(data => {
      return res.status(200).json({message: `Updated Successfully`})
    })
    .catch(next)
  }

  static delete(req, res, next) {
    let id = +req.params.id

    Product.destroy({where: {id}})
    .then(data => {
      return res.status(200).json({message: `Deleted Successfully`})
    })
    .catch(next)
  }
}

module.exports = ProductController