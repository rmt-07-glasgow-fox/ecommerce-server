const { History, Cart, Product, sequelize, Category, ProductCart } = require('../models');

class TransactionController {
  static async history(req, res, next) {
    try {
      const history = await History.findAll({ order: [
          ['createdAt', 'desc']
        ], where: { userId: req.user.id } });

      return res.status(200).json(history);
    } catch (error) {
      return next(error);
    }
  }

  static async checkout(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const cart = await Cart.findOne({
        where: { userId: req.user.id },
        include: [{
          model: Product,
          as: 'product',
          include: [{ model: Category, as: 'category', attributes: ['name'] }],
          attributes: { exclude: ['createdAt', 'updatedAt', 'userId'] },
          through: { model: ProductCart, attributes: ['id', 'quantity', 'totalPrice'] },
        }],
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      }, { transaction: t })

      if (cart.product.length === 0) throw { name: 'emptyCart' };

      cart.product.forEach(async(el) => {
        if (el.ProductCart.quantity > el.stock) {
          throw { name: 'maximumStock' }
        } else {
          let stock = el.stock - el.ProductCart.quantity;
          await Product.update({ stock }, { where: { id: el.id } }, { transaction: t });

          let input = { userId: req.user.id, productName: el.name, productImage: el.image_url, productPrice: el.price, quantity: el.ProductCart.quantity, category: el.category.name };
          await History.create(input, null, { transaction: t });
        }
      });

      await ProductCart.destroy({ where: { cartId: cart.id } }, { transaction: t })
      await Cart.update({ totalPayment: 0 }, { where: { id: cart.id } }, { transaction: t })

      t.afterCommit(() => {
        res.status(200).json({
          message: 'Successfully checkout!'
        })
      });

      await t.commit();

    } catch (error) {
      await t.rollback();
      return next(error)
    }
  }
}

module.exports = TransactionController;