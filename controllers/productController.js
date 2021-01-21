const { Product } = require('../models')

class ProductController {
  static async getAll(req,res,next) {
    try {
      const data = await Product.findAll({
        order: [['updatedAt','asc']]
      })
      res.status(200).json(data)
    } catch(err) {
      next(err)
    }
  }
  static async getById(req,res,next) {
    const id = Number(req.params.id)
    try {
      const data = await Product.findByPk(id)
      res.status(200).json(data)
    } catch(err) {
      next(err)
    }
  }
  static async add(req,res,next) {
    const payload = {
      name: req.body.name,
      image_url: req.body.image_url,
      price: req.body.price,
      stock: req.body.stock,
      category:req.body.category
    }
    try {
      const data = await Product.create(payload)
      res.status(201).json(data)
    } catch (err) {
      next(err)
    }
  }
  // static add(req,res,next) {
  //   const payload = {
  //     name: req.body.name,
  //     image_url: req.body.image_url,
  //     price: req.body.price,
  //     stock: req.body.stock,
  //     category:req.body.category
  //   }
  //   Product.create(payload)
  //   .then(data => {
  //     res.status(201).json({data:data})
  //   })
  //   .catch(err => {
  //     next(err)
  //   })
  // }
  static update(req,res,next) {
    const id = Number(req.params.id);
    const payload = {
      name: req.body.name,
      image_url: req.body.image_url,
      price: req.body.price,
      stock: req.body.stock,
      category: req.body.category
    }
    Product.update(payload, {
        where: {
          id
        }
      })
      .then(() => {
        return Product.findByPk(id)
      })
      .then(data => {
        console.log(data);
        res.status(200).json(data)
      })
      .catch (err => {
      next(err)
      })
  }
  static async delete(req,res,next) {
    const id = Number(req.params.id)
    try {
      const data = await Product.destroy({
        where: {
          id
        }
      })
      res.status(200).json({message: "product has been deleted"})
    } catch (err) {
      next(err)
    }
  }
}

module.exports = ProductController