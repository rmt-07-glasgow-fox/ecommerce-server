const { Cart, Content } = require('../models')

class Controller {
  static getCart(req, res, next){
    console.log('kita masuk cart get')
    Cart.findAll({
      include: [Content],
      attributes: ['id', 'ContentId','UserId', 'quantity','status','createdAt','updatedAt'],
      where: {
        UserId: +req.user.id,
      }, 
      order: [['updatedAt', 'DESC']]
    })
    .then(cart => {
      cart.forEach(el => {
        el.dataValues.total = el.quantity * el.Content.price
      })
      res.status(200).json(cart)
    })
    .catch(err => {
      console.log(err.stack, "LOL")
      next(err)
    })
  }

  static postCart(req, res, next) {
    console.log(req.body, 'ini si body')
    console.log('kita masuk cart post')
    Cart.findOne({
      attributes: ['id','UserId','ContentId','quantity', 'status', 'createdAt','updatedAt'],
      where: {
        ContentId:+req.body.ContentId,
        UserId: req.user.id,
        status: false
      }
    })
    .then(cart => {
      if(!cart){
        let quantity = 1
        return Cart.create({
          status: false, 
          quantity, 
          ContentId:+req.body.ContentId, 
          UserId: req.user.id, 
        })
        .then(cart => {
          res.status(201).json(cart)
        })
        .catch(err => {
          console.log(err.stack, 'ini dia error')
          next(err)
        })
      } else {
        return Cart.update({ 
          quantity: +cart.quantity + 1, 
        }, {
          where: {
            id: cart.id
          }
        })
        .then(cart => {
          res.status(201).json(cart)
        })
        .catch(err => {
          console.log(err.stack, 'ini dia error')
          next(err)
        })
      }
    })
  }

  static patchCart (req, res, next) {
    console.log('masuk PATCH YAKAN')
    Cart.findOne({
      include: Content,
      where: {
        id: +req.params.id,
        status: false
      }
    })
    .then(cart => {
      console.log(cart, 'ini cart')
      if ((cart.quantity + req.body.qty) > cart.
      Content.stock){
        next (err)
      }
      return Cart.update({
        quantity: cart.quantity + req.body.qty
      }, {
        where: {
          id: +req.params.id
        }
      })
    }) 
    .then(cart => {
      res.status(201).json(cart)
    })
    .catch(err => {
      console.log(err,"oalah")
      next(err)
    })
  }

  static patchPayment (req, res, next) {
    console.log(req.body, 'masuk PATCH PAYMENT YA')
    Cart.findOne({
      include: Content,
      where: {
        id: +req.body.data
      },
      attributes: ['id','UserId','ContentId','quantity','status', 'createdAt','updatedAt'],
    })
    .then(cart => {
      console.log(cart.Content.name, 'berhasil cart.findOne')
      console.log(cart.quantity, 'ini quantity')
      console.log(cart.id, 'berhasil cart.findOne')
      return Content.update({
        stock: cart.Content.stock - cart.quantity
      }, {
        where: {
          id: cart.ContentId
        },
        returning: true,
        plain: true
      })
    })
    .then(updatedQty => {
      console.log(updatedQty, 'berhasil update qty')
      if(updatedQty[1].stock === 0) {
        console.log('tidak ada======')
        Content.destroy({
          where: {
            id: updatedQty[1].id
          }
        })
        .then(deletedCart => {
           return res.status(400).json({message: "Items is out of stock"})
        })
      } else {
        console.log(' ada ======')
        return Cart.update({
          status: true
        }, {
          where: {
            id: +req.body.data
          }
        })
        .then(updatedStatus => {
          console.log('berhasil updated status')
          res.status(201).json(updatedStatus)
        })
      }
    }) 
    .catch(err => {
      console.log(err.stack, "INI CUY")
      next(err)
    })
  }

  static deleteCart(req, res, next) {
    console.log('kita masuk cart delete')
    Cart.destroy({
      where: {
        ContentId: +req.params.id,
        UserId: +req.user.id
      }
    })
    .then(cart => {
      res.status(200).json({message: 'Delete Cart Success'})
    })
    .catch(err => {
      next({name: "resourceNotFound"})
    })
  }
}

module.exports = Controller