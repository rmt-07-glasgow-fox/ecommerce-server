const { Cart, Product, ProductCart, Category } = require('../models');

class CartController {
  static async getAll(req, res, next) {
    try {
      const cart = await Cart.findAll({
        where: { userId: req.user.id },
        include: [{
          model: Product,
          as: 'product',
          include: [{ model: Category, as: 'category', attributes: ['name'] }],
          attributes: { exclude: ['createdAt', 'updatedAt', 'userId'] },
          through: { model: ProductCart, attributes: ['id', 'quantity', 'totalPrice'] },
        }],
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      })

      return res.status(200).json(cart)
    } catch (error) {
      return next(error);
    }
  }

  static async createOrUpdateCart(req, res, next) {
    try {
      const { productId, quantity } = req.body;

      const product = await Product.findByPk(productId);
      if (!product) return next({ name: 'notFound' });

      if (quantity > product.stock) return next({ name: 'maximumStock' })

      // FIND OR CREATE NEW CART
      // IF CART DOESN'T EXIST INSERTED VALUE IN DEFAULTS OBJECT OTHERWISE LEAVE IT
      const [findOrCreateCart] = await Cart.findOrCreate({
        where: { userId: req.user.id },
        defaults: { totalPayment: 0 }
      })

      // FIND OR CREATE NEW DETAIL CART PRODUCT
      // IF DETAIL CART PRODUCT DOESN'T EXIST INSERTED VALUE IN DEFAULTS OBJECT OTHERWISE LEAVE IT
      await ProductCart.findOrCreate({
        where: { productId, cartId: findOrCreateCart.id },
        defaults: { productId, quantity, totalPrice: product.price, cartId: findOrCreateCart.id }
      })

      // UPDATE DETAIL CART PRODUCT
      await ProductCart.update({
        quantity: +quantity,
        totalPrice: quantity * product.price
      }, { where: { productId, cartId: findOrCreateCart.id } })

      // SUM TOTAL PAYMENT
      const totalPayment = await ProductCart.sum('totalPrice', { where: { cartId: findOrCreateCart.id } });

      // THEN UPDATE TOTAL PAYMENT
      await findOrCreateCart.update({ totalPayment })

      return res.status(201).json(findOrCreateCart)

    } catch (error) {
      return next(error)
    }
  }

  static async destroy(req, res, next) {
    try {
      const cart = await ProductCart.findOne({ where: { id: req.params.id } });
      if (!cart) return next({ name: 'notFound' });

      await cart.destroy();

      // SUM TOTAL PAYMENT
      let totalPayment = await ProductCart.sum('totalPrice', { where: { cartId: cart.cartId } });

      if (isNaN(totalPayment)) totalPayment = 0

      // THEN UPDATE TOTAL PAYMENT
      await Cart.update({ totalPayment }, { where: { id: cart.cartId } })

      return res.status(200).json({
        message: 'successfully remove cart'
      })
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = CartController