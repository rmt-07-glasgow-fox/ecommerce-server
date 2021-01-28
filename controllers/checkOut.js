const { Cart, Product } = require('../models')
const cart = require('../models/cart')

class Checkout {
    static async getCartChekout (req, res, next) {
        const userId = req.loggedInUser.id
        try {
            const checkOut = await Cart.findAll({where: {UserId: userId, status: 'paid'}, include: {model: Product}, attributes: ['id', 'UserId', 'ProductId', 'status', 'quantity']})
            res.status(200).json(checkOut)
        }
        catch(err) {
            next(err)
        }
    } 
    static async checkout (req, res, next) {
        try {
          const status = 'paid'
          const carts = await Cart.findAll({
            where: {
              UserId: req.loggedInUser.id,
              status: 'unpaid'
            },
            include: [Product]
          })
            console.log(carts.length, '>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<')
            carts.map(element => {
              let newStock = element.Product.stock - element.quantity
              Product.update({
                stock: newStock
              }, {where: {id: element.Product.id}})
            })
            await Cart.update({
              status
            }, {where: {UserId: req.loggedInUser.id}})
            res.status(200).json('checkout berhasil')
        }
        catch(err){
          next(err)
        }
      }
}

module.exports = Checkout