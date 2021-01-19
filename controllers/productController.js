const { Product }   = require('../models')

class ProductController {
  static async get(req, res, next) {
    try {
      const products = await Product.findAll({ order: [['id', 'ASC']] })
      return res.status(200).json(products)
    } catch (err) {
      next(err)
    }
  }

  static async create(req, res, next) {
    const { name, image_url, price, stock } = req.body
    try {
      const newProduct = await Product.create({
        name,
        image_url,
        price,
        stock
      })
      const response = {
        id: newProduct.id,
        name: newProduct.name,
        image_url: newProduct.image_url,
        price: newProduct.price,
        stock: newProduct.stock,
      }
      return res.status(201).json(response)
    } catch (err) {
      next(err)
    }
  }

  static async updateAll(req, res, next) {
    const id = +req.params.id
    const { name, image_url, price, stock } = req.body
    try {
      const productToUpdate = await Product.update({
        name,
        image_url,
        price,
        stock
      },
      {where: { id }, returning: true})
      if (productToUpdate[0] === 0) {
        throw { name: 'notFound' }
      }
      const response = productToUpdate[1][0]
      return res.status(200).json(response)
    } catch (err) {
        next(err)
    }
  }

  static async delete(req, res, next) {
    let id = +req.params.id
    try {
      const deletedProduct = await Product.findByPk(id)
      if (!deletedProduct) {
        throw { name: 'notFound' }
      }
      await Product.destroy({where: { id }})
      return res.status(200).json({message: 'Product success to delete'})
    } catch (err) {
      next(err)
    }
  }
}

module.exports = ProductController