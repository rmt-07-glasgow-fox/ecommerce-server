const { Product, User} = require('../models/index')

class ProductController {
  static async show(req,res,next){
    try {
      const data = await Product.findAll()
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  static async add(req,res,next){
    console.log('MUNCULLLLLLLLL');
    try {
      let input = {
        name : req.body.name,
        image_url : req.body.image_url,
        price : req.body.price,
        stock : req.body.stock,
        category: req.body.category
      }
      const data = await Product.create(input)
      res.status(201).json(data)
    } catch (err) {
      next(err)
    }
  }

  static async edit(req,res,next){
    try {
      let input = {
        name : req.body.name,
        image_url : req.body.image_url,
        price : req.body.price,
        stock : req.body.stock,
        category: req.body.category
      }
      const data = await Product.update(input, {
        where : {
          id : req.params.id
        }
      })
      res.status(200).json({msg: 'Product has been updated'})
    } catch (err) {
      next(err)
    }
  }

  static async delete(req,res,next){
    try {
      const data = await Product.destroy({
        where : {
          id : req.params.id
        }
      })
      res.status(200).json({msg : "Product has been deleted successfully"})
    } catch (err) {
      next(err)
    }
  }


}

module.exports = ProductController