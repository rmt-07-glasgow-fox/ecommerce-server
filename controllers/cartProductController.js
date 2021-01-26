const { CartProduct, Cart, Product } = require('../models')
const cartproduct = require('../models/cartproduct')

class CartProductController {
    static async get (req, res) {
      try {
        const result = await CartProduct.findAll({
            include: [Product]
        })

        return res.status(200).json(result)
      } catch (error) {
        return res.status(500).json(error)
      }
    }

    static async add (req, res) {
      try {
        const opt = {
          cartId: req.cart.id,
          productId: req.body.productId,
          quantity: req.body.quantity
        }

        const result = await CartProduct.create(opt)

        return res.status(201).json(result)
      } catch (error) {
        return res.status(500).json(error)
      }
    }

    static async edit (req, res) {
      try {
        const id = +req.params.id

        const result = await CartProduct.findOne({
          where: {
              id
          }
        })

        return res.status(200).json(result)
      } catch (error) {
        return res.status(500).json(error)
      }
    }

    static async update (req, res) {
     try {
       const id = +req.params.id

       const opt = {
         cartId: req.user.id,
         productId: req.body.productId,
         quantity: req.body.quantity
       }

       const result = await CartProduct.udpate(opt, {
           where: {
               id
           }
       })

       return res.status(201).json(result)
     } catch (error) {
       return res.status(500).json(error)
     }
    }

    static async delete (req, res) {
      try {
        const id = +req.params.id

        const result = await CartProduct.destroy({
            where: {
                id
            }
        })

        if (!result) {
            return res.status(404).json({message: 'error not found'})
        }

        return res.status(201).json(result)
      } catch (error) {
        return res.status(500).json(error)
      }
    }
}

module.exports = CartProductController