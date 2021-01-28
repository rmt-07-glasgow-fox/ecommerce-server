const { Product } = require('../models')

class ProductController {
  static async categories(req, res, next) {
    try {
      const products = await Product.findAll({
        attributes: ['category'],
        group: ['category']
      })
      res.status(200).json(products.map(product => product.category))
    } catch(error) {
      if (error) {
        next(error)
      } else {
        next({name: 'cantRetrieve'})
      }
    }
  }

  static async findAll(req, res, next) {
    try {
      const products = await Product.findAll()
      res.status(200).json(products)
    } catch(error) {
      if (error) {
        next(error)
      } else {
        next({name: 'cantRetrieve'})
      }
    }
  }

  static async create(req, res, next) {
    try {
      const { name, image_url, price, stock, category } = req.body
      const obj = {
        name,
        image_url,
        price,
        stock,
        category
      }

      const product = await Product.create(obj)
      res.status(201).json(product)
    } catch(error) {
      next(error)
    }
  }

  static async findOne(req, res, next) {
    try {
      let id = req.params.id

      const product = await Product.findByPk(id)

      if (product) {
        res.status(200).json(product)
      } else {
        next({name: 'notFound'})
      }
    } catch(error) {
      next(error)
    }
  }

  static async delete(req, res, next) {
    try {
      let id = req.params.id

      const product = await Product.findByPk(id)

      if (product) {
        product.destroy()
        res.status(200).json({msg: 'Product has been deleted'})
      } else {
        next({name: 'notFound'})
      }
    } catch(error) {
      next(error)
    }
  }

  static async update(req, res, next) {
    try {
      let id = req.params.id
      let { name, image_url, price, stock, category } = req.body
      let product = await Product.findByPk(id)
      product.name = name
      product.image_url = image_url
      product.price = price
      product.stock = stock
      product.category = category
      await product.save()

      res.status(200).json(product)
    } catch(error) {
      next(error)
    }
  }
}

module.exports = { ProductController }