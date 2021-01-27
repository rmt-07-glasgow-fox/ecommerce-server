const { Cart, Product } = require('../models');

exports.create = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ where: { UserId: userId, ProductId: req.body.ProductId } });

    if (cart) {
      const product = await Product.findByPk(cart.ProductId);
      if (product.stock < cart.quantity + 1) {
        return next({ name: 'LimitStock' });
      } else {
        await Cart.update({ quantity: cart.quantity + 1 }, { where: { id: cart.id } });
        res.status(200).json({ message: 'Cart has been updated' });
      }
    } else {
      const c = await Cart.create({
        ProductId: req.body.ProductId,
        UserId: userId,
        quantity: req.body.quantity,
      });
      return res.status(201).json(c);
    }
  } catch (err) {
    return next(err);
  }
};

exports.list = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const carts = await findAll({ where: { UserId: userId } });
    return res.status(200).json(carts);
  } catch (err) {
    return next(err);
  }
};

exports.incrementQty = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const cartId = req.params.id;
    const cart = await Cart.findOne({ where: { id: cartId, UserId: userId } });

    if (cart) {
      const product = await Product.findByPk(cart.ProductId);
      if (product.stock < cart.quantity + 1) {
        return next({ name: 'LimitStock' });
      } else {
        await Cart.update({ quantity: cart.quantity + 1 }, { where: { id: cart.id } });
        res.status(200).json({ message: 'Cart has been updated' });
      }
    } else {
      return next({ name: 'NotFound', attr: 'Cart' });
    }
  } catch (err) {
    return next(err);
  }
};

exports.decrementQty = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const cartId = req.params.id;
    const cart = await Cart.findOne({ where: { id: cartId, UserId: userId } });

    if (cart) {
      if (cart.quantity - 1 < 0) {
        return next({ name: 'Invalid', attr: 'Quantity' });
      } else {
        await Cart.update({ quantity: cart.quantity - 1 }, { where: { id: cart.id } });
        res.status(200).json({ message: 'Cart has been updated' });
      }
    } else {
      return next({ name: 'NotFound', attr: 'Cart' });
    }
  } catch (err) {
    return next(err);
  }
};

exports.destroy = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const cart = await Cart.findByPk(id);
    if (!cart) return next({ name: 'NotFound', attr: 'Cart' });
    else {
      await Cart.destroy({ where: { id: id } });
      return res.status(200).json({ message: 'Cart has been deleted' });
    }
  } catch (err) {
    return next(err);
  }
};
