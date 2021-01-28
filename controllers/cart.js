const { User, Product, Cart } = require('../models')

class CartController {

  static async addCart (req, res, next) {
    try {
      const UserId = req.userId;
      const { ProductId, qty } = req.body;
      const cartFound = await Cart.findOne({
        where: {
          UserId,
          ProductId
        }
      })
      if(cartFound) {
        const product = await Product.findOne({ where: { id: ProductId } });
        const stock = product.stock;
        if (cartFound.qty === stock) {
          return next(err);
        }
        cartFound.qty += 1;
        await cartFound.save();
        return res.status(200).json(cartFound);
      } else {
        const payload = { UserId, ProductId, qty };
        const response = await Cart.create(payload);
        return res.status(201).json(response);
      }
    } catch (err) {
      return next(err);
    }
  }

  static async getAll (req, res, next) {
    try {
      const id = req.userId
      const user = await User.findOne({
        where: { id },
        include: {
          model: Product
        }
      })
      const response = user.Products.map(async product => {
        const { id, name, imageUrl, price, stock } = product;
        const { qty } = product.Cart;
        const cartId = await Cart.findOne({ where: { UserId: user.id, ProductId: id }, attributes: ['id'] })
        const cart =  { id, name, imageUrl, price, stock, cartId: cartId.id, qty};
        return cart
      });
      const responses = await Promise.all(response);
      res.status(200).json(responses)
    } catch (err) {
      return next(err);
    }    
  }

  static async updateCart (req, res, next) {
    try {
      const id = req.params.id;
      const qty = req.body.qty;
      const cart = await Cart.findOne({ where: { id } });
      const product = await Product.findOne({ where: { id: cart.ProductId } });
      if(qty > product.stock) {
        return next({ message: 'Out of stock' });
      }
      cart.qty = qty;
      await cart.save();
      return res.status(200).json({ message: 'Success update qty' });
    } catch (err) {
      return next(err)
    }
  }

  static async delete (req, res, next) {
    try {
      const id = req.params.id;
      const status = await Cart.destroy({ where: { id } });
      if (status === 1) {
        return res.status(200).json({ message: 'Success delete cart' })
      } else {
        return next(err);
      }
    } catch (err) {
      return next(err);
    }
  }

  static async checkout (req, res, next) {
    try {
      const id = req.params.id;
      const cart = await Cart.findOne({ where: { id } });
      const product = await Product.findOne({ where: { id: cart.ProductId } });
      if(product.stock - cart.qty < 0) {
        return res.status(400).json({ message: 'Out of stock' })
      } else {
        product.stock = product.stock - cart.qty;
        await product.save();
        const status = await Cart.destroy({ where: { id } });
        if (status !== 1) return next(err);
        return res.status(200).json({ message: 'Success checkout cart' })
      }
    } catch (err) {
      return next(err);
    }
  }
}

module.exports = CartController