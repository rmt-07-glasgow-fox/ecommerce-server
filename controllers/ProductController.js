const { Product } = require("../models")

class ProductController {
  static async create(req, res, next) {
    const { name, imageUrl, price, stock } = req.body
    const payload = { name, imageUrl, price, stock }
    try {
      const product = await Product.create(payload)
      res.status(201).json(product)
    } catch (err) {
      next(err)
    }
  }
  
  static async read(req, res, next) {
    try {
      const products = await Product.findAll()
      res.status(200).json(products)
    } catch (err) {
      next(err)
    }
  }
  
  static async update(req, res, next) {
    const id = +req.params.id
    const { name, imageUrl, price, stock } = req.body
    const payload = { name, imageUrl, price, stock }

    try {
      const product = await Product.update(payload, {
        where: { id },
        returning: true,
      })
      if (product[0] === 0) {
        next({ name: "NotFound" })
      } else {
        res.status(200).json(product[1][0])
      }
    } catch (err) {
      next(err)
    }
  }

  static async delete(req, res, next) {
    
    try {
      const id = +req.params.id;
      const product = await Product.destroy({ where: { id } })
        if (product === 0) {
          next({ name: "NotFound" });
        } else {
          res.status(200).json({name: "Successfully delete product"});
        }
    } catch {
      next(err);
    }
  }
}

module.exports = ProductController
