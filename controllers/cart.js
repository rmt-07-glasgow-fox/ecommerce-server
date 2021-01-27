const { User, Cart, Product, sequelize } = require('../models')

class CartController {
  static async showAll(req,res,next){
    try {
      const UserId = req.user.id
      const carts = await Cart.findAll({
        where: {
          status: false,
          UserId
        },
        include: [Product]
      })
      res.status(200).json(carts)
    } catch (err) {
      next(err)
    }
  }

  static async create(req,res,next){
    try {
      const UserId = req.user.id
      const { ProductId } = req.body
      const cart = await Cart.findOne({
        where: {
          status: false,
          UserId,
          ProductId
        }
      })
      if (cart) {
        const cartUpdate = await Cart.update({quantity: cart.quantity+1}, {
          where: { id: cart.id },
          returning: true
        })
        res.status(200).json(cartUpdate[1][0])
      } else {
        const cartAdd = await Cart.create({
          UserId,
          ProductId
        })
        res.status(201).json(cartAdd)
      }
    } catch (err) {
      next(err)
    }
  }

  static async checkout(req,res,next){
    let transaction
    try {
      const UserId = req.user.id

      const carts = await Cart.findAll({where: {
        UserId,
        status: false
      }})
      if(carts.length > 0){
        carts.map(async (e) => {
          try {
            transaction = await sequelize.transaction()
            const product = await Product.findByPk(e.ProductId)
            if(product.stock-e.quantity < 0) throw {message: product.name + 'out of stock'}
            if(product){
              const update = await Product.update({stock: product.stock-e.quantity},{
                where: {id: e.ProductId},
                returning: true
              })
              if(!update) throw {name: "updateFailed"}
            }
            const cart = await Cart.update({ status: true }, {
              where: {UserId, ProductId: e.ProductId},
              returning: true
            })
            res.status(200).json({message: 'Checkout success'})
            await transaction.commit()
          } catch (err) {
            if (transaction) await transaction.rollback()
            next(err)
          }
        })
      } else throw {name: "NoCart", message: "cart not found"}
    } catch (err) {
      next(err)
    }
  }

  static async updateQuantity(req,res,next){
    try {
      const { id } = req.params
      const { quantity } = req.body
      const cart = await Cart.update({quantity},{
        where: {id},
        returning: true
      })
      res.status(200).json(cart[1][0])
    } catch (err) {
      next()
    }
  }

  static async delete(req,res,next){
    try {
      const { id } = req.params
      const cart = await Cart.destroy({where: {id}})
      if(cart) res.status(200).json({ message: 'successfully delete cart' })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = CartController