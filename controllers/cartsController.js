const { User, Product, Cart } = require('../models/index')
const { hashPassword, checkPassword} = require('../helpers/bcrypt')
const { generateToken, checkToken } = require('../helpers/jwt')

class Controller {
  static addToCart (req, res, next) {
    let { ProductId, quantity} = req.body
    console.log('INPUT=', { ProductId, quantity });
    let input = {
      UserId: +req.user.id,
      ProductId: +ProductId,
      quantity: +quantity,
      status: false
    }
    Cart.findOne({
      where: {
        UserId: +req.user.id,
        ProductId: +req.body.ProductId
      },
      include: [ Product ]
    })
    .then((data) => {
      // console.log('Cart.findOne TRIGGERED=', data);
      if (!data) {
        // console.log('Cart.findOne NO DATA=', data);
        return Cart.create(input)
      }
      else {
        // console.log('Cart.findOne YES DATA=', data);
        return Cart.update({quantity: quantity}, {
          where: {
            UserId: +req.user.id,
            ProductId: +req.body.ProductId
          }
        })
      }
    })
    .then((data) => {
      res.status(201).json({ message: "Added to cart!" })
    })
    .catch((err) => {
      next(err)
    })
  }

  static showAll (req, res, next) {
    console.log('showAll TRIGGETED');
    Cart.findAll({
      where: {
        UserId: +req.user.id,
        status: false
      },
      order: [['createdAt', 'DESC']],
      attributes : ['id', 'UserId', 'ProductId', 'quantity', 'status'],
      include: [ Product ]
    })
    .then((data) => {
      // console.log('showAll DATA=', data);
      res.status(200).json(data)
    })
    .catch((err) => {
      // console.log('showAll ERR=', err);
      next(err)
    })
  }

  static checkout (req, res, next) {
    Cart.findAll({
      where: {
        UserId: +req.user.id,
        status: false
      },
      include: [ Product ]
    })
    .then((data) => {
      // console.log('   check whether all quantity are above stocks!')
      data.forEach(element => {
        let stock = element.Product.quantity
        let checkoutQty = element.quantity
        if (checkoutQty > stock) {
          return res.status(400).json({
            message: "Can't checkout, quantity you wish to buy exceeds our stock"
          })
        }
      })

      // console.log('   substract all the quantity in Products to the quantity of checkout!')
      data.forEach(element => {
        let stock = element.Product.stock - element.quantity
        let ProductId = element.Product.id
        // console.log('   a stock=', stock);
        Product.update({ stock: stock }, {
          where: {
            id: +ProductId
          },
          returning: true
        })
        .then((data) => {
          // console.log(`   A checkout ID=${ProductId} is successful!`, data)
        })
        .catch((err) => {
          next(err)
        })
      })

      console.log('All checkouts are successful!')

      // destroy all carts
      // Cart.destroy({
      //   where:{UserId: +req.user.id}
      // })
      // .then((data) => {
      //   return res.status(201).json({ message: "Checkout successful!" })
      // })
      // .catch((err) => {
      //   next(err)
      // })

      // set all carts status to reu
      Cart.update({ status: true }, {
        where:{UserId: +req.user.id}
      })
      .then((data) => {
        return res.status(201).json({ message: "Checkout successful!" })
      })
      .catch((err) => {
        next(err)
      })
    })
    .catch((err) => {
      next(err)
    })
  }

  static delete (req, res, next) {
    let id = +req.params.id

    Cart.destroy({
      where:{id:id}
    })
    .then((data) => {
      if (!data) {
        return res.status(404).json({message:"Error 404: cart not found"})
      }
      return res.status(201).json({message: "Cart deleted successfully!"})
    })
    .catch((err) => {
      next(err)
    })
  }

  static history (req, res, next) {
    console.log('showAll history TRIGGETED');
    Cart.findAll({
      where: {
        UserId: +req.user.id,
        status: true
      },
      order: [['createdAt', 'DESC']],
      attributes : ['id', 'UserId', 'ProductId', 'quantity', 'status', 'updatedAt'],
      include: [ Product ]
    })
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((err) => {
      next(err)
    })
  }

}

module.exports = Controller

