const { User, Order, Product, Cart, OrderDetail } = require('../models');

exports.checkout = async (req, res, next) => {
  try {
    const userId = req.user.id;
    let idCarts = [];

    const carts = await Cart.findAll({ where: { UserId: userId, status: true } });
    carts.map((c) => {
      idCarts.push(c.id);
    });
    const products = await Product.findAll({ where: { id: idCarts } });

    carts.map((c) => {
      products.map((p) => {
        if (c.ProductId === p.id && c.quantity > p.stock) {
          return next({ name: 'LimitStock' });
        }
      });
    });

    const body = {
      UserId: userId,
      address: req.body.address,
      phone: req.body.phone,
      payment_method: req.body.paymentMethod,
      amount: req.body.amount,
      notes: req.body.notes,
    };

    const order = await Order.create(body);
    let orderdetail = [];
    carts.map((c) => {
      orderdetail.push({ OrderId: order.id, ProductId: c.ProductId, quantity: c.quantity });
    });

    await OrderDetail.bulkCreate(orderdetail);
    await Cart.destroy({ where: { id: idCarts } });
    await carts.map((c) => {
      products.map(async (p) => {
        if (c.ProductId === p.id) {
          const body = { stock: p.stock - c.quantity };
          await Product.update(body, { where: { id: p.id } });
        }
      });
    });

    return res.status(201).json(order);
  } catch (err) {
    return next(err);
  }
};

exports.list = async (req, res, next) => {};

exports.updateStatus = async (req, res, next) => {};
