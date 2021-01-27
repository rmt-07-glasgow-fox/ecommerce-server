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
        res.status(200).json(data)
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
  static deleteCartById (req, res, next) {
    Cart.destroy({
      where:{
        id: req.params.id
      }
    })
      .then(data => {
        if(data === 1){
          res.status(200).json({
            message: 'Success your banner has been deleted.'
          })
        }else{
          next({
            name: 'NoData'
          })
        }
      })
      .catch(err => {
        next(err)
      })
  }
  static async checkoutCart(req, res, next) {
    let errors = []
    let cartPromise = []
    let productPromise = []
    const getCart = await Cart.findAll({
      where: { 
        UserId: req.userData.id 
      }, 
      include: [Product]
    })
    getCart.forEach((el, idx) => {
      if(el.amount <= el.Product.stock && el.status) {
        cartPromise.push(Cart.update({
          status: false
        }, {
          where: {
            id: el.id
          }
        }))
        productPromise.push(Product.update({
          stock: el.Product.stock - el.amount
        }, {
          where: {
            id: el.ProductId
          },
          returning: true
        }))
      } else if (el.amount > el.Product.stock && el.status){
        errors.push({
          name: 'SoldOut',
          itemName: el.Product.name
        })
      }
    })
    if(errors.length) {
      next({
        name: errors[0].name,
        itemName: errors[0].itemName
      })
    }
    await Promise.all(cartPromise)
    let promiseReturn = await Promise.all(productPromise)
    res.status(200).json(promiseReturn)
  }
}

module.exports = CartController