const {Product} =require('../models')

class controller{
  static addProduct(req, res, next){
    let body = req.body
    let dataProduct = {
      name: body.name,
      description: body.description,
      category: body.category,
      price: +body.price,
      stock: +body.stock,
      imageUrl: body.imageUrl
    }
    Product.create(dataProduct)
    .then(data=>{
      res.status(201).json({data})
    })
    .catch(err=>{
      next(err)
    })
  }

  static showAllProducts(req, res, next){
    Product.findAll()
    .then(data=>{
      res.status(200).json({data})
    })
    .catch(err=>{
      next(err)
    })
  }
  static showProductsByCategory(req, res, next){
    let category = req.params.category
    Product.findAll({where:{category}})
    .then(data=>{
      if(data.length === 0){
        next({name: 'NotFound'})
      }else{
        res.status(200).json({data})
      }
    })
    .catch(err=>{
      next(err)
    })
  }
  static getProductById(req, res, next){
    let id = req.params.id
    Product.findByPk(id)
    .then(data=>{
      if(!data){
        next({name: 'NotFound'})
      }else{
        res.status(200).json({data})
      }
    })
    .catch(err=>{
      next(err)
    })
  }
  static editProduct(req, res, next){
    let body = req.body
    let id = req.params.id
    let dataProduct = {
      name: body.name,
      description: body.description,
      category: body.category,
      price: +body.price,
      stock: +body.stock,
      imageUrl: body.imageUrl
    }

    Product.update(dataProduct, {where:{id}})
    .then(data=>{
      res.status(200).json({name: body.name,
        description: body.description,
        category: body.category,
        price: +body.price,
        stock: +body.stock,
        imageUrl: body.imageUrl})
    })
    .catch(err=>{
      next(err)
    })
  }

  static updateStock(req, res, next){
    let body = req.body
    let id = req.params.id
    let data = {
      stock: body.stock
    }

    Product.update(data, {where:{id}})
    .then(data=>{
      res.status(200).json({message: 'Stock Updated'})
    })
    .catch(err=>{
      next(err)
    })
  }
  static deleteProduct(req, res, next){
    let id = req.params.id
    Product.destroy({where:{id}})
    .then(data=>{
      res.status(200).json({message: `product with ID ${id} has been deleted`})
    })
    .catch(err=>{
      console.log(err)
      next(err)
    })
  }
}

module.exports = controller