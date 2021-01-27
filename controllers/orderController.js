const { Order, User, Product } = require("../models")
const nodemailer = require('nodemailer')

class OrderController {
  static getAllOrder(req, res, next) {
    Order.findAll({
      include: Product,
      where: { userId: req.user.id }
    })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        next(err)
      })
  }
  static getOneOrder(req, res, next) {
    const id = req.params.orderId
    Order.findOne({
      include: Product,
      where: {id}
    })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        next(err)
      })
  }
  static createOrder(req, res, next) {
    const { count, productId } = req.body
    const userId = req.user.id
    let counter
    let productStock

    Order.findOne({
      include: Product,
      where: { 
        productId,
        userId: req.user.id
      }
    })
      .then(data => {
        if (data) {
          if (data.count >= data.Product.stock) {
            counter = data.count
            productStock = data.Product.stock
          } else {
            data.count += 1
            return data.save()
          }
        } else if (!data) {
          return Order.create({ count, productId, userId })
        }
      })
      .then(data => {
        if (counter >= productStock) {
          return next({ name: "OrderCountTooBig" })
        }
        return res.status(201).json(data)
      })
      .catch(err => {
        next(err)
      })
  }
  static patchOrder(req, res, next) {
    const id = req.params.orderId
    const { count } = req.body
    let counter
    let productStock

    Order.findOne({
      include: Product,
      where: { id }
    })
      .then(data => {
        if (data.Product.stock < count) {
          counter = data.count
          productStock = data.Product.stock
        } else {
          data.count = count
          return data.save()
        }
      })
      .then(data => {
        if (counter >= productStock) {
          return next({ name: "OrderCountTooBig" })
        } else {
          res.status(200).json(data)
        }
      })
      .catch(err => {
        next(err)
      })
  }
  static deleteOrder(req, res, next) {
    const id = req.params.orderId
    Order.destroy({
      where: {id}
    })
      .then(data => {
        res.status(200).json({ message: "Order deleted" })
      })
      .catch(err => {
        next(err)
      })
  }
  static deleteAllOrder(req, res, next) {
    let userId = req.user.id
    Order.destroy({
      where: { userId }
    })
      .then(data => {
        res.status(200).json({ message: "All order deleted" })
      })
      .catch(err => {
        next(err)
      })
  }
  static sendReceipt (req, res, next) {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SECRET_EMAIL,
        pass: process.env.SECRET_PASS
      }
    });
    const totalPrice = req.body.totalPrice
    User.findOne({
      where: { id: req.user.id }
    })
    .then(data => {
      let mailOptions = {
        from: process.env.SECRET_EMAIL,
        to: data.email,
        subject: 'Order Receipt',
        text: `Order Receipt from e-commerce gameshop


        Your grand total payment is: Rp. ${(totalPrice.toLocaleString())}
        
        Thanks for shopping from e-commerce gameshop`
      };
  
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      res.status(200).json(data)
    })
    .catch(err => {
      next(err)
    })

  }
}

module.exports = OrderController