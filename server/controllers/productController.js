const { Product } = require('../models')

class ProductController{
  static getProducts(req, res, next){

  }

  static addProducts(req, res, next){
    let value = {
      name: req.body.name,
      image_url: req.body.image_url,
      price: req.body.price,
      stock: req.body.stock,
      UserId: req.userData.id
    }
    console.log(value);
    Product.create(value)
    .then(data => {
      res.status(201).json(data)
    })
    .catch(err => {
      if(err.name == "SequelizeValidationError"){
        next({
            status: 400,
            errors: err.errors
        })
      } else {
          next(err)
      }
    })
  }
}

module.exports = ProductController