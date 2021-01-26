const { Cart, User } = require("../models");

exports.create = async (req, res, next) => {
  try {
    const data = {
      quantity: req.body.quantity,
      UserId: req.user.id,
      ProdId: req.body.ProdId
    };
    console.log(data);
    const cart = await Cart.create(data);
    res.status(201).json(cart);
  } catch (error) {
    next(error);
  }
};

exports.carts = async (req, res, next) => {
  try {
    const carts = await Cart.findAll();
    res.status(200).json(carts);
  } catch (error) {
    next(error);
  }
};

exports.cartsUser = async (req, res, next) => {
  try {
    const carts = await Cart.findAll({include: User});
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
      quantity: req.body.quantity,
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
