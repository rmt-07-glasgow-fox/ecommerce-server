const { Product } = require('../models')

class ProductController{
      static createProduct(req, res, next) {
            let { name, image_url, price, stock } = req.body

            Product.create({ name, image_url, price, stock })
                   .then(product => {
                       res.status(201).json(product)  
                   }).catch(err => {
                        res.status(400).json(err)
                   })

      }

      static readProduct(req, res, next) {
            Product.findAll()
                   .then(product => {
                         res.status(200).json(product)
                   }).catch(err => {
                         res.status(500).json
                   })
      }

      static updateProduct(req, res, next) {
            let { name, image_url, price, stock } = req.body
            let { id } = req.params

            Product.update({ name, image_url, price, stock },{ where: {id}})
                   .then(product => {
                       res.status(200).json({message: "update success"})  
                   }).catch(err => {
                        res.status(400).json(err)
                   })
      }

      static deleteProduct(req, res, next) {
            let { id } = req.params

            Product.destroy({where: {id}})
                    .then(() => {
                        res.status(200).json({message: 'delete success'})
                    }).catch(err => {
                          res.status(400).json(err)
                    })
      }
}

module.exports = ProductController