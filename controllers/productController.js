const {Product} = require("../models")

class productController {
    static create(req, res, next) {
        const {name, imageUrl, category, price, stock} = req.body
        Product.create({name, imageUrl, category, price, stock})
          .then(product => {
            const {id, name, imageUrl, category, price, stock} = product
            res.status(201).json({id, name, imageUrl, category, price, stock})
          })
          .catch(err => {
            next(err)
          })
    }

    static getProducts(req, res, next) {
      Product.findAll()
      .then(products => {
        const output = products.map(el => {
          return { 
            id: el.id, 
            name: el.name,
            imageUrl: el.imageUrl,
            category: el.category,
            price: el.price,
            stock: el.stock }
        })
        res.status(200).json(output)
      })
      .catch(err => {
        next(err)})
    }

    static getProduct(req, res, next) {
      Product.findByPk(+req.params.id)
      .then(product => {
        const {id, name, imageUrl, category, price, stock} = product
        res.status(200).json({id, name, imageUrl, category, price, stock})
      })
      .catch(err => {
        next(err)})
    }

    static editProduct(req, res, next) {
      const {name, imageUrl, category, price, stock} = req.body
        Product.update({name, imageUrl, category, price, stock}, {where: {id: +req.params.id}})
          .then(product => {
            res.status(200).json({message: "edit product successfull"})
          })
          .catch(err => {
            next(err)
          })
    }

    static deleteProduct(req, res, next) {
      Product.destroy({where: {id: +req.params.id}})
      .then(data => {
        res.status(200).json({message: 'delete product successfull'})
      })
      .catch(err => next(err))
    }
}

module.exports = productController