const { CartProduct, Cart, Product } = require('../models')

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
          productId: req.body.productId,
          quantity: req.body.quantity
        }

        const dataProduct = await Product.findOne({
          where: {
            id: opt.productId
          }
        })

        if (dataProduct.stock < opt.quantity) return res.status(401).json({
          message: 'Quantity exceeds stock!'
        })

        const checkCart = await Cart.findOne({
          where: {
            userId: req.user.id
          }
        })

        const dataCart = {
          userId: req.user.id,
          status: 'In Cart'
        }

        if (!checkCart) return await Cart.create(dataCart)

        const dataCartProduct = {
          cartId: checkCart.id,
          productId: opt.productId,
          quantity: opt.quantity
        }

        const isProductExist = await CartProduct.findOne({
          where: {
            cartId: dataCartProduct.cartId
          }
        })

        if (isProductExist.productId === +dataCartProduct.productId) return res.status(401).json({
          message: 'Product already exist in cart'
        })

        const createCartProduct = await CartProduct.create(dataCartProduct)
        return res.status(201).json(createCartProduct)
      } catch (error) {
        return res.status(500).json(error)
      }
    }

    static async update (req, res) {
     try {
       const id = +req.params.id

       const opt = {
         quantity: req.body.quantity
       }

       const dataCartProduct = await CartProduct.findOne({
         where: {
           id
         }
       })

       const dataProduct = await Product.findOne({
          where: {
            id: dataCartProduct.productId
          }
       })

       if (dataProduct.stock < opt.quantity) return res.status(401).json({
          message: 'Quantity exceeds stock!'
       })

       const result = await CartProduct.update(opt, {
           where: {
               id
           },
           returning: true
       })

       return res.status(201).json({
         message: 'data updated!'
       })
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

        return res.status(201).json({
          message: 'success to delete!'
        })
      } catch (error) {
        return res.status(500).json(error)
      }
    }
}

module.exports = CartProductController