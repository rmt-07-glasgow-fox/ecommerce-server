const { Product, Category, ProductCategory } = require('../models')

class ProductController {
  static getAllProducts(req, res, next){
    Product.findAll({
      include: [ Category ]
    })
      .then(data => {
        res.send(data)
      })
      .catch(err => {
        res.send(err)
      })
  }
  static getProductById(req, res, next){
    Product.findByPk(req.params.id)
      .then(data => {
        if(data){
          res.status(200).json(data)
        }else{
          next({
            name: 'NoData'
          })
        }
      })
      .catch(err => {
        next(err)
      })
  }
  static addProduct(req, res, next){
    Product.create({
      name: req.body.name || '',
      image_url: req.body.image_url || '',
      price: +req.body.price,
      stock: req.body.stock || '',
      UserId: req.userData.id,
    })
      .then(data => {
        res.status(201).json({
          data
        })
      })
      .catch(err => {
        next(err)
      })
  }
  static editProductById(req, res, next){
    Product.update(req.body, {
      where:{
        id: req.params.id
      }
    })
      .then(data => {
        if(data[0] === 1){
          res.status(200).json({
            message: 'Success your product has been saved.'
          })
        }else{
          next({
            name: 'NoData'
          })
        }
      })
      .catch(err => {
        next(err)
      })
  }
  static deleteProductById(req, res, next){
    Product.destroy({
      where:{
        id: req.params.id
      }
    })
      .then(data => {
        if(data === 1){
          res.status(200).json({
            message: 'Success your product has been deleted.'
          })
        }else{
          next({
            name: 'NoData'
          })
        }
      })
      .catch(err => {
        next(err)
      })
  }
  static patchCategoryById(req, res, next){
    const { CategoryId } = req.body
    const ProductId  = +req.params.id
    Category.findByPk(CategoryId)
      .then(data => {
        if(!data){
          next({
            name: 'NoData'
          })
        }else{
          return ProductCategory.findOne({
            where:{
              CategoryId
            }
          })
        }
      })
        .then(data => {
          if(data){
            next({
              name: 'AlreadyExist'
            })
          }else{
            return ProductCategory.create({
              CategoryId,
              ProductId
            })
          }
        })
        .then(data => {
          res.status(200).json(data)
        })
        .catch(err => {
          console.log(err)
          next(err)
        })
  }
}

module.exports = ProductController