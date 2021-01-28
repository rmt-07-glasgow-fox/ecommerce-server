const {Cart, Product, sequelize} = require("../models")
const {checkToken} = require('../helpers/jwt')

class cartController {
    static create(req, res, next) {
        const ProductId = req.body.ProductId
        const UserId = checkToken(req.headers.access_token).id
        Cart.findOne({
          include: 'Product', 
          attributes: ['id', 'UserId', 'ProductId', 'quantity'], 
          where: {ProductId, UserId, status: false}
        })
        .then(cart => {
          if (!cart) {
            return Cart.create({ProductId, UserId})
            .then(cart => {
              const {id, ProductId, UserId, quantity} = cart
              res.status(201).json({id, ProductId, UserId, quantity})
            })
          } else {
            const quantity = cart.quantity + 1
            return Cart.update({quantity}, {where: {id: cart.id}})
            .then(cart => {
              res.status(200).json({message: "added!"})
            }) 
          }
        })
        .catch(err => {
          next(err)
        })
    }

    static getCarts(req, res, next) {
      const UserId = checkToken(req.headers.access_token).id
      Cart.findAll({
        include: 'Product', 
        attributes: ['id', 'UserId', 'quantity', 'status', 'updatedAt'], 
        where: {UserId}, order: [['createdAt', 'DESC']]
      })
      .then(carts => {
        const output = carts.map(el => {
          return { 
            id: el.id, 
            UserId: el.UserId,
            ProductId: el.ProductId,
            quantity: el.quantity,
            status: el.status,
            updatedAt: el.updatedAt,
            Product: {
                    id: el.Product.id,
                    name: el.Product.name,
                    imageUrl: el.Product.imageUrl,
                    price: el.Product.price,
                    stock: el.Product.stock
                }
            }
        })
        res.status(200).json(output)
      })
      .catch(err => {
        next(err)})
    }

    static edit(req, res, next) {
      const {quantity} = req.body
        Cart.update({quantity}, {where: {id: +req.params.id}})
          .then(cart => {
            res.status(200).json({message: "added!"})
          })
          .catch(err => {
            next(err)
          })
    }

    static delete(req, res, next) {
      Cart.destroy({where: {id: +req.params.id}})
      .then(data => {
        res.status(200).json({message: 'delete cart successfull'})
      })
      .catch(err => next(err))
    }

    static async checkout (req, res, next) {
      const UserId = checkToken(req.headers.access_token).id
      const t = await sequelize.transaction()
      try {
        const cart = await Cart.findAll({where:{UserId, status: false}}, {transaction: t})
        for(const item of cart) {
          const product = await Product.findByPk(item.ProductId)
          if (item.quantity > product.stock) {
            throw {name: 'StockNotEnough'}
          } else {
            let stock = product.stock - item.quantity
            await Product.update({stock}, {where: {id: item.ProductId}})
            await Cart.update({status: true}, {where: {UserId, ProductId: item.ProductId, status: false}})
          }
        }
        t.afterCommit(() => {
          return res.status(200).json({message: 'Checkout successfull'})
        })
        await t.commit();
      } catch (err) {
        await t.rollback();
        next(err)
      }
    }
}

module.exports = cartController