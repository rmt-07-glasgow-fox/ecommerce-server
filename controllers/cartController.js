const { Cart, Product, User } = require('../models/index.js');

class CartController {
  static async readCart (req, res, next) {
    try {
      const read = await Cart.findAll({
        where: { UserId: req.user.id },
        include: [{
          model: User,
          attributes: { exclude: ['password', 'role', 'createdAt', 'updatedAt'] }
        }, {
          model: Product,
          attributes: { exclude: ['UserId'] }
        }],
        order: [['createdAt', 'ASC']]
      })

      return res.status(200).json(read);
    } catch (err) {
      next(err);
    };
  };

  static async createCart (req, res, next) {
    try {
      let UserId = req.user.id;
      let ProductId = req.body.ProductId;
      let quantity = 1;
      let isPaid = false;

      const findProduct = await Product.findByPk(ProductId);

      if (!findProduct) throw { name: 'productNotFound' };
      if (findProduct.stock < quantity) throw { name: 'notEnoughStock' };

      const findOne = await Cart.findOne({ where: { UserId, ProductId } });

      if (findOne) {
        let oldQuantity = findOne.quantity;
        let newQuantity = oldQuantity + quantity;

        await Cart.update({ UserId, ProductId, quantity: newQuantity, isPaid }, { where: { id: findOne.id } });

        const find = await Cart.findByPk(findOne.id);

        return res.status(200).json(find);
      };

      const create = await Cart.create({ UserId, ProductId, quantity, isPaid });

      return res.status(201).json(create);
    } catch (err) {
      next(err);
    };
  };

  static async incCart (req, res, next) {
    try {
      const UserId = req.user.id;
      const id = req.params.id
      const findCart = await Cart.findOne({ where: { id, UserId } })

      if (!findCart) throw { name: 'cartNotFound' };

      const findProd = await Product.findByPk(findCart.ProductId);

      if (findCart.quantity + 1 > findProd.stock) throw ({ name: 'notEnoughStock ' });

      await Cart.update({ quantity: findCart.quantity + 1 }, { where: { id: findCart.id } });

      res.status(200).json({ message: 'Quantity increased.' })
    } catch (err) {
      next(err);
    };
  };

  static async decCart (req, res, next) {
    try {
      const UserId = req.user.id;
      const id = req.params.id
      const findCart = await Cart.findOne({ where: { id, UserId } })

      if (!findCart) throw { name: 'cartNotFound' };

      if (findCart.quantity - 1 < 0) throw ({ name: 'invalidStock' });

      await Cart.update({ quantity: findCart.quantity - 1 }, { where: { id: findCart.id } });

      res.status(200).json({ message: 'Quantity decreased.' });
    } catch (err) {
      next(err);
    };
  };

  static async updateCart (req, res, next) {
    try {
      const id = Number(req.params.id);
      const { isPaid } = req.body;

      const find = await Cart.findByPk(id,{include:[{model: Product}]});

      if (!find) throw { name: 'cartNotFound' };

      console.log(find);

      const findProduct = await Product.findByPk(find.Product.id);

      if (!findProduct) throw { name: 'productNotFound' };
      if (findProduct.stock < find.quantity) throw { name: 'notEnoughStock' };

      const newStock = find.Product.stock - find.quantity

      await Product.update({ stock: newStock }, { where: { id: find.Product.id } })

      await Cart.update({ isPaid }, { where: { id } });

      res.status(200).json({ message: 'Product has been checked out!' });
    } catch (err) {
      next(err);
    };
  };

  static async deleteCart (req, res, next) {
    try {
      const id = req.params.id;

      const find = await Cart.findByPk(id);

      if (!find) throw { name: 'cartNotFound' };

      await Cart.destroy({ where: { id } });

      res.status(200).json({ message: 'Product has been removed from your cart!' });
    } catch (err) {
      next(err);
    };
  };
};

module.exports = CartController;