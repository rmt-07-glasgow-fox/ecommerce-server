const { Cart, Product } = require('../models');

class CartController {
  
  static addCart = async (req, res, next) => {
    let { ProductId, amount, totalPrice } = req.body;
    try {
      const cart = await Cart.findOne({
        where: {
          ProductId,
          status: false
        }
      })
      if (cart) {
        totalPrice = +totalPrice + +cart.totalPrice;
        amount = +amount + cart.amount;
        const updatedCart = await Cart.update({ amount, totalPrice }, {
          where: {
            id: cart.id
          },
          returning: true
        })
        res.status(200).json(updatedCart[1][0])
      } else {
        const newCart = await Cart.create({
          UserId: req.user.id, 
          ProductId, amount, totalPrice
        })
        res.status(201).json(newCart)
      }
    }
    catch(err) {
      next(err)
    }
  }

  static getCarts = async (req, res, next) => {
    try {
      const carts = await Cart.findAll({
        where: {
          UserId: req.user.id
        },
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        },
        include: Product,
        order: [['id', 'ASC']]
      })
      res.status(200).json(carts)
    }
    catch(err) {
      next(err)
    }
  }
  
  static putCart = async (req, res, next) => {
    try {
      let { amount, totalPrice } = req.body;
      const cart = await Cart.update({
        amount, totalPrice
      }, {
        where: { id: req.params.id }, returning: true
      });
      if (cart[0] == 1) {
        res.status(200).json(cart[1][0])
      } else {
        throw { name: 'NotFound' }
      }
    }
    catch (err) {
      next(err);
    }
  }

  static patchCart = async (req, res, next) => {
    let ids = [];
    try {
      let carts = await Cart.findAll({
        where: {
          UserId: req.user.id,
          status: false
        },
        include: {
          model: Product
        }
      })
      
      carts.map(async cart => {
        if (cart.dataValues.amount <= cart.dataValues.Product.dataValues.stock) {
          cart.dataValues.Product.dataValues.stock -= cart.amount;
          ids.push(cart.dataValues.id);
          await Product.update({
            stock: cart.dataValues.Product.dataValues.stock
          },{
            where: {
              id: cart.dataValues.Product.dataValues.id
            },
            individualHooks: true
          })
        }
      })
      
      const checkouts = await Cart.update({ status: true }, {
        where: {
          id: ids
        },
        returning: true
      })

      if (checkouts[0] == 2) {
        res.status(200).json(checkouts[1])
      } else {
        throw { name: 'NotFound' }
      }
    } catch (err) {
      next(err)
    }
  }

  static deleteCart = async (req, res, next) => {
    try {
      const cart = await Cart.destroy({
        where: {
          id: req.params.id
        }
      })
      if (cart == 1) {
        res.status(200).json({ message: 'Success, cart deleted' });
      } else {
        throw { name: 'NotFound' };
      }
    }
    catch(err) {
      next(err);
    }
  }
}

module.exports = CartController;