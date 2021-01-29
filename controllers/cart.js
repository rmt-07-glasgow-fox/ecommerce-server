const { Cart, User, Product } = require("../models");

exports.create = async (req, res, next) => {
  try {
    const isCart = await Cart.findOne({where: {ProdId: +req.body.ProdId}})
    const data = {
      qty: +req.body.qty,
      UserId: +req.user.id,
      ProdId: +req.body.ProdId
    };
    if (isCart) {
      data.qty = isCart.qty+1
      const cart = await Cart.update(data, {
        where: { id: isCart.id },
        returning: true,
      });
      cart
        ? res.status(200).json(cart[1][0].dataValues)
        : next({ name: "NotFound", item:  "Cart"});
    } else {
      const cart = await Cart.create(data, {w: 1}, {returning: true});
      res.status(201).json(cart);
    }
  } catch (error) {
    next(error);
  }
};

exports.carts = async (req, res, next) => {
  try {
    const carts = await Cart.findAll({order: [['createdAt', 'DESC']]});
    res.status(200).json(carts);
  } catch (error) {
    next(error);
  }
};

exports.cartsUser = async (req, res, next) => {
  try {
    const UserId = req.user.id
    const carts = await Cart.findAll({
      where: {UserId},
      include: Product
    });
    res.status(200).json(carts);
  } catch (error) {
    next(error);
  }
};

exports.cart = async (req, res, next) => {
  try {
    const id = req.params.id;
    const cart = await Cart.findByPk(id);
    cart ? res.status(200).json(cart) : next({ name: "NotFound", item:  "Cart"});
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = {
      qty: req.body.qty,
      UserId: req.user.id,
      ProdId: req.body.ProdId
    };
    const cart = await Cart.update(data, {
      where: { id },
      returning: true,
    });
    cart
      ? res.status(200).json(cart[1][0].dataValues)
      : next({ name: "NotFound", item:  "Cart"});
  } catch (error) {
    next(error);
  }
};

exports.destroy = async (req, res, next) => {
  try {
    const id = req.params.id;
    const cart = await Cart.findByPk(id);
    if (cart) {
      const deletedProduct = await Cart.destroy({ where: { id } });
      res.status(200).json({
        success: [`Cart with id: '${cart.id}' success to delete`],
      });
    } else {
      next({ name: "NotFound", item:  "Cart"});
    }
  } catch (error) {
    next(error);
  }
};
