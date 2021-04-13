const { Cart, User, Product, Category, sequelize } = require("../models");

class CartController {
  static addCart(req, res, next) {
    const UserId = req.user.id;
    const { ProductId, amount } = req.body;

    let productData;

    Product.findByPk(ProductId)
      .then((data) => {
        productData = data;
        if (amount > data.stock || !data.stock) {
          next({ name: "AmountExceedsStock" });
        }
        else {
          return Cart.findOne({
            attributes: ["id", "UserId", "ProductId", "amount"],
            where: {
              UserId,
              ProductId,
              isBought: false,
            },
          });
        }
      })
      .then((cartItem) => {
        if (cartItem) {
          let add = cartItem.amount;
          if (cartItem.amount < productData.stock) {
            ++add;
          }
          // console.log(add, cartItem.amount, 'ini add lohhhhh');
          return Cart.update(
            {
              amount: add,
            },
            {
              where: { id: cartItem.id },
              returning: true,
            }
          );
        } else {
          return Cart.create({
            ProductId,
            UserId,
            amount,
            isBought: false,
          });
        }
      })
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => next(err));
  }

  static listCart(req, res, next) {
    const UserId = req.user.id;

    Cart.findAll({
      where: {
        UserId,
        isBought: false,
      },
      order: [["id", "ASC"]],
      attributes: ["id", "UserId", "ProductId", "amount", "isBought"],
      include: [
        {
          model: User,
          attributes: {
            exclude: ["password", "updatedAt", "createdAt"],
          },
        },
        {
          model: Product,
          include: {
            model: Category,
            attributes: {
              exclude: ["updatedAt", "createdAt"],
            },
          },
          attributes: {
            exclude: ["updatedAt", "createdAt"],
          },
        },
      ],
    })
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => next(err));
  }

  static patchCart(req, res, next) {
    const id = +req.params.id;
    const { ProductId, amount } = req.body;

    Product.findByPk(ProductId)
      .then((data) => {
        if (amount > data.stock) {
          next({ name: "AmountExceedsStock" });
        } else {
          return Cart.update(
            {
              amount,
            },
            {
              where: {
                id,
              },
              returning: true,
            }
          );
        }
      })
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => next(err));
  }

  static deleteCart(req, res, next) {
    const id = req.params.id;
    Cart.destroy({ where: { id } })
      .then((response) => {
        res.status(200).json({ message: "Cart item successfully deleted" });
      })
      .catch((err) => next(err));
  }

  static async checkOut(req, res, next) {
    const t = await sequelize.transaction();
    const cartItems = req.body;
    if (cartItems.length === 0) next({ name: "EmptyCart" });

    // res.status(200).json(cartItems)
    try {
      const result = await sequelize.transaction(async (t) => {
        let UserId;

        cartItems.forEach(async (item) => {
          const { id, ProductId, amount } = item;
          UserId = item.UserId;

          const product = await Product.findByPk(ProductId, { transaction: t });

          if (product.stock < amount) next({ name: "AmountExceedsStock" });
          else {
            await Product.update(
              {
                stock: product.stock - amount,
              },
              {
                where: {
                  id: ProductId,
                },
                transaction: t,
              }
            );
          }
        });

        await Cart.update(
          { isBought: true },
          {
            where: { UserId },
            transaction: t,
          }
        );

        return 'Checkout successful'
      });

      res.status(200).json({
        message: result
      })

    } catch (error) {
      next(error);
    }
  }
}

module.exports = CartController;
