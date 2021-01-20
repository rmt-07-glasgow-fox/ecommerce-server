const { Product } = require('../models')

class ProductController{
      static createProduct(req, res, next) {
            let newProduct = {
                  name: req.body.name,
                  image_url: req.body.image_url,
                  price: req.body.price,
                  stock: req.body.stock
            }

            Product.create(newProduct)
                   .then(product => {
                       res.status(201).json(product)  
                   }).catch(err => {
                        
                        if(err.name === 'SequelizeValidationError') res.status(400).json(err)
                        next(err)
                   })

      }

      static readProduct(req, res, next) {
            Product.findAll()
                   .then(product => {
                         res.status(200).json(product)
                   }).catch(err => {
                        if(err.name === 'SequelizeValidationError') res.status(400).json(err)
                         next(err)
                   })
      }

      static updateProduct(req, res, next) {
            let editedProduct = {
                  name: req.body.name,
                  image_url: req.body.image_url,
                  price: req.body.price,
                  stock: req.body.stock
            }
            let { id } = req.params

            Product.update(editedProduct,{ where: {id}})
                   .then(()=> {
                        
                       return Product.findOne({where: {id}})  
                   }).then(product => {
                     
                       res.status(200).json(product)
                  }).catch(err => {
                        
                        if(err.name === 'SourceNotFound') next({name: 'SourceNotFound'})
                        if(err.name === 'SequelizeValidationError') res.status(400).json(err)
                        next(err)
                   })
      }

      static deleteProduct(req, res, next) {
            let { id } = req.params

            Product.destroy({where: {id}})
                    .then(data => {
                        if (data == 0) res.status(404).json({message: "Not found"})
                        console.log(data);
                        res.status(200).json({message: 'delete success'})
                    }).catch(err => {
                        if(err.name === 'SourceNotFound') next({name: 'SourceNotFound'})
                          next(err)

                    })
      }
}

module.exports = ProductController