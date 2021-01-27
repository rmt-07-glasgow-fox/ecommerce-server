const { Product, User, Category } = require('../models')

class ProductController {
  static async showAll(req,res,next){
    try {
      const product = await Product.findAll({
        order: [['id']],
        include: [User, Category]
      })
      res.status(200).json(product)
    } catch (err) {
      next(err)
    }
  }

  static async showOne(req,res,next){
    try {
      const { id } = req.params
      const product = await Product.findOne({
        where: { id },
        include: [User]
      })
      if(product) res.status(200).json(product)
      else next({name: 'ErrorNotFound'})
    } catch (err) {
      next(err)
    }
  }

  static async create(req,res,next){
    try {
      const { name, image_url, price, stock, CategoryId } = req.body
      const UserId = req.user.id
      const input = {
        name: name || '',
        image_url: image_url || '',
        price: +price,
        stock: +stock,
        UserId,
        CategoryId: CategoryId || null
      }
      const product = await Product.create(input)
      res.status(201).json(product)
    } catch (err) {
      next(err)
    }
  }

  static async edit(req,res,next){
    try {
      const {id} = req.params
      const { name, image_url, price, stock, CategoryId } = req.body
      const UserId = req.user.id
      const input = {
        name: name || '',
        image_url: image_url || '',
        price: +price,
        stock: +stock,
        UserId,
        CategoryId: CategoryId || null
      }
      const product = await Product.update(input, {
        where: {id},
        returning: true
      })
      if(product) res.status(200).json(product[1][0])
    } catch (err) {
      next(err)
    }
  }

  static async updateStock(req,res,next) {
    try {
      const { id } = req.params
      const { stock } = req.body
      const product = await Product.update({stock},{
        where: {id},
        returning: true
      })
      if(product[0] === 1) res.status(200).json(product[1][0])
      else next({name: 'ErrorNotFound'})
    } catch (err) {
      next(err)
    }
  }

  static async delete(req,res,next){
    try {
      const { id } = req.params
      const product = await Product.destroy({
        where: {id}
      })
      if(product) res.status(200).json({message: 'product deleted successfully'})
    } catch (err) {
      next(err)
    }
  }
}

module.exports = ProductController