const { Cart, Product } = require('../models')

class CartController {
  static add (req,res,next) {
    const input = {
      UserId: req.user.id,
      ProductId: req.params.ProductId
    }
    Cart.create(input)
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => {
        next(err)
      })
  }
  static getAll(req,res,next) {
    Cart.findAll({
      where: {
        UserId: req.user.id
      },
      order: [['createdAt','DESC']],
      include: Product
    })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        next(err)
      })
  }
  static increaseQty(req,res,next) {
    const id = req.params.id
    Cart.findByPk(id, {
      include: Product
    })
      .then(data => {
        return Cart.increment({quantity: 1}, {
          where: {
            id
          }
        })
      })
      .then(data => {
        res.status(200).json({quantity:data[0][0][0].quantity})
      })
      .catch(err => {
        next(err)
      })
  }
  static decreaseQty(req,res,next) {
    const id = Number(req.params.id)
    Cart.findByPk(id, {
      include: Product
    })
      .then(data => {
        if (data.quantity === 1) {
          return Cart.destroy({
            where: {
              id
            }
          })
        }
      })
      .then(data => {
          return Cart.decrement({quantity: 1}, {
            where: {
              id
            }
          })
      })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        next(err)
      })
  }
  static findByPk(req,res,next) {
    const id = Number(req.params.id)
    Cart.findByPk(id)
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        next(err)
      })
  }
  static delete (req,res,next) {
    const id = Number(req.params.id)
    Cart.destroy({
      where: {
        id
      }
    })
      .then(data => {
        res.status(200).json({message: 'Product removed'})
      })
      .catch(err => {
        next(err)
      })
  }
  static patch (req,res,next) {
    const id = req.params.id
    Cart.findByPk(id, {
      include: Product
    })
    .then(response => {
      const obj = {
        quantity: req.body.quantity
      }
      return Cart.update(obj, {
        where: {
          id
        }
      })
    })
    .then(response => {
      res.status(200).json(response)
    })
    .catch(err => {
      next(err)
    })
  }
}

module.exports = CartController