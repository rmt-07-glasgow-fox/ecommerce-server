const { Cart, Product } = require('../models')

class CartController {
  static getCartByUserId (req, res, next) {
    Cart.findAll({
      where: {
        UserId: req.userData.id,
        status: true
      },
      include: {
        model: Product
      },
      order: [
        ['createdAt', 'DESC']
      ]
    })
      .then(data => {
        if(data.length === 0){
          next({
            name: 'NoData'
          })
        }else{
          res.status(200).json(data)
        }
      })
      .catch(err => {
        next(err)
      })
  }
  static async addCart (req, res, next) {
    try {
      const cartData = await Cart.findOne({
        where: {
          UserId: req.userData.id,
          ProductId: req.params.productId,
          status: true
        }
      })
      if(!cartData) {
        const checkProductInCart = await Product.findOne({
          where: {
            id: req.params.productId
          }
        })
        if(!checkProductInCart) {
          next({
            name: 'NoData'
          })
        }else {
          let productAmount = (req.body.amount ? req.body.amount : 1)
          let productStock = checkProductInCart.stock
          if(productStock - productAmount >= 0) {
            const addProduct = await Cart.create({
              UserId: req.userData.id,
              ProductId: req.params.productId,
              amount: req.body.amount || ''
            })
            res.status(201).json(addProduct)
          }else{
            next({
              name: 'NotEnoughStock'
            })
          }
        }
      } else {
        console.log(`There's this item in my cart`)
        const checkProductInCart = await Product.findOne({
          where: {
            id: req.params.productId
          }
        })
        if(!checkProductInCart) {
          next({
            name: 'NoData'
          })
        }else {
          let productStock = checkProductInCart.stock
          let productAmount = (req.body.amount ? req.body.amount : 1)
          if(productStock - productAmount - cartData.amount >= 0) {
            const updateStock = await Cart.update(
              {
                amount: productAmount + cartData.amount
              },
              {
                where: {
                  id: cartData.id
                },
                returning: true
              }
            )
            res.status(200).json(updateStock[1])
          } else{
            next({
              name: 'NotEnoughStock'
            })
          }
        }
      }
    } catch (error) {
      next(error)
    }
  }
  static patchCartStatus (req, res, next) {
    Cart.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(data => {
        if(!data){
          next({
            name: 'NoData'
          })
        }else{
          return Cart.update({
            status: req.body.status
          },{
            where: {
              id: req.params.id
            }
          })
        }
      })
      .then(data => {
        res.status(200).json({
          message: 'Success your product has been removed from your cart.'
        })
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = CartController