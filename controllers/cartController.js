const { Cart, Product, Transaction, sequelize } = require('../models')

class CartController {
  static findAll(req, res, next) {
    Cart
      .findAll({
        attributes: ['id', 'quantity', 'UserId'],
        include: [
          {
            model: Product,
            attributes: { exclude: ['createdAt', 'updatedAt'] }
          }
        ]
      })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static findByCust(req, res, next) {
    Cart
      .findAll({
        where: { UserId: req.UserData.id },
        attributes: ['id', 'quantity'],
        include: [
          {
            model: Product,
            attributes: { exclude: ['createdAt', 'updatedAt'] }
          }
        ]
      })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static create(req, res, next) {
    const ProductId = +req.body.ProductId
    const quantity = +req.body.quantity
    const UserId = req.UserData.id
    let product = null
    let statusCode = null

    Product
      .findOne({ // find to check stock
        where: { id: ProductId },
        attributes: {exclude: ['createdAt', 'updatedAt']}
      })
      .then(data => {
        product = data
        return !data ?
          next({ name: 'CustomError', statusCode: 404, message: 'Product Not Found' }) :
        data && quantity > data.stock ?
          next({ name: 'CustomError', statusCode: 400, message: 'Out of stock!' }) :
          Cart.findOne({ where: { ProductId, UserId } }) // find to decide create or update
      })
      .then(data => {
        return !data ?
          Cart.create({ ProductId, quantity, UserId }) : // create
        data && data.quantity + quantity > product.stock ?
          next({ name: 'CustomError', statusCode: 400, message: 'Out of stock!' }) :
          Cart.update({ quantity: data.quantity + quantity }, {
            where: { id: data.id },
            returning: true
          })
      })
      .then(data => {
        statusCode = data && data[1] ? 200 : data && !data[1] ? 201 : 500
        const id = data && data[1] ? data[1][0].dataValues.id :
          data && !data[1] ? data.id : null
        
        return data ? Cart.findOne({
          where: { id },
          attributes: ['id', 'quantity'],
          include: [
            {
              model: Product,
              attributes: { exclude: ['createdAt', 'updatedAt'] }
            }
          ]
        }) :
        next({ name: 'CustomError', statusCode: 404, message: 'Cart Not Found' })
      })
      .then(data => {
        res.status(statusCode).json(data) // update
      })
      .catch(next)
  }

  static updateQty(req, res, next) {
    const quantity = +req.body.quantity
    const id = +req.params.id
    let cart = null
    Cart.findOne({
      where: { id }
    })
    .then(data => {
      cart = data
      return !data ?
        next({ name: 'CustomError', statusCode: 404, message: 'Cart Not Found' }) :
        Product.findOne({ where: { id: data.ProductId } })
    })
    .then(product => {
      return !product ?
        next({ name: 'CustomError', statusCode: 404, message: 'Product Not Found' }) :
      quantity > product.stock ?
        next({ name: 'CustomError', statusCode: 400, message: 'Out of stock!' }) :
        Cart.update({ quantity },{
          where: { id },
          returning: true
        })
    })
    .then(data => {
      !data ?
        next({ name: 'CustomError', statusCode: 404, message: 'Cart Not Found' }) :
        res.status(200).json({
          id: data[1][0].dataValues.id,
          UserId: data[1][0].dataValues.UserId,
          ProductId: data[1][0].dataValues.ProductId,
          quantity: data[1][0].dataValues.quantity
        }) // update
    })
    .catch(next)
  }

  static delete(req, res, next) {
    Cart
      .destroy({
        where: { id: +req.params.id },
        returning: true
      })
      .then(data => {
        data ?
          res.status(200).json({ message: 'Cart success deleted!' }) :
          next({ name: 'CustomError', statusCode: 404, message: 'Cart Not Found' })
      })
      .catch(next)
  }

  static checkout(req, res, next) {
    // let transaction = null
    let productData = null
    Cart
      .findAll({
        where: { UserId: req.UserData.id }
      })
      .then(cart => {
        if (cart.length > 0) {
          cart.map(el => {
            // sequelize.transaction()
            //   .then(data => {
            //     transaction = data
            //     return Product.findByPk(el.id)
            //   })
            Product.findByPk(el.ProductId)
              .then(product => {
                productData = product
                return !product ? next({ name: 'CustomError', statusCode: 404, message: 'Product Not Found' }) :
                product.stock - el.quantity < 0 ? next({ name: 'CustomError', statusCode: 400, message: 'Out of stock!' }) :
                Transaction.create({
                  name: product.name,
                  image_url: product.image_url,
                  price: product.price,
                  quantity: el.quantity,
                  total: product.price * el.quantity,
                  UserId: req.UserData.id
                })
              })
              .then(data => {
                return Product.update({ stock: productData.stock - el.quantity }, {
                  where: { id: el.ProductId },
                  returning: true
                })
              })
              .then(data => {
                return Cart.destroy({
                  where: { id: el.id }
                })
              })
              .then(data => {
                res.status(200).json({ message: 'Checkout success' })
                // return transaction.commit()
              })
              .catch(err => {
                // transaction && transaction.rollback()
                next(err)
              })
          })

        } else {
          next({ name: 'CustomError', statusCode: 404, message: 'Cart Not Found' })
        }
      })
      .catch(next)   
  }
  
}

module.exports = CartController