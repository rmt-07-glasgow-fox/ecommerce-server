const { Cart, Product, Customer } = require("../models/");
const { Op } = require("sequelize");
const { sequelize } = require("../models");



class CartController {
  static getCarts(req, res, next) {
    // Customer.findOne({
    //   where: { id: req.customer.id }, include: [
    //     { model: Product }]
    // })
    //   .then((dataCart) => {
    //     res.status(200).json(dataCart)
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   })
    Cart.findAll({ where: { CustomerId: req.customer.id }, include: Product })
      .then((dataCart) => {
        res.status(200).json(dataCart)
      })
      .catch((err) => {
        console.log(err);
      })
  }

  static createCart(req, res, next) {
    const idProduct = Number(req.body.idProduct)
    let productPrice = null
    let productStock = null

    console.log(idProduct);
    console.log(req.customer.id);

    Product.findByPk(idProduct)
      .then((dataProduct) => {
        if (!dataProduct) {
          throw { name: "dataNotFound" };
        }
        productStock = dataProduct.stock
        productPrice = dataProduct.price
        return Customer.findOne({ where: { id: req.customer.id }, include: Product }) // Get all customer products in Carts
      })
      .then((dataCart) => {
        // console.log(dataCart);
        // res.status(200).json(dataCart)
        // res.status(200).json(dataCart.Products)
        const filterDataCart = dataCart.Products.find((cart) => {
          return cart.id === idProduct
        })
        // console.log(JSON.stringify(filterDataCart,null,2));
        // console.log(JSON.stringify(filterDataCart.Cart,null,2));

        if (!filterDataCart) { // IF undefined product in Cart 
          return Cart.create({
            ProductId: idProduct,
            CustomerId: req.customer.id,
            quantity: req.body.quantity,
            total_price: productPrice
          })
        } else {
          const cartPayload = filterDataCart.Cart
          if (cartPayload.quantity + Number(req.body.quantity) > productStock) {
            throw { name: "quantityError" };
          }
          // return Customer.update({
          //   quantity: dataCart.quantity + Number(req.body.quantity),
          //   total_price: productPrice + dataCart.total_price 
          // }, { where: { id:req.customer.id }, include: Product, returning: true }
          // )
          // console.log(dataCart.quantity);
          // console.log(Number(req.body.quantity));
          return Cart.update({
            quantity: cartPayload.quantity + Number(req.body.quantity),
            total_price: productPrice + cartPayload.total_price
          }, { where: { [Op.and]: [{ CustomerId: req.customer.id }, { ProductId: idProduct }] }, returning: true }
          )
        }
      })
      .then((updatedDataCart) => {
        if (Array.isArray(updatedDataCart)) {
          if (updatedDataCart[1].length === 0) {
            next(err); // Handle error from [0, []]
          }
          return res.status(200).json(updatedDataCart[1][0]) // [1, [{ data }]]
        }
        res.status(200).json(updatedDataCart) // { data }
      })
      .catch((err) => {
        console.log(err);
        next(err)
      })
  }

  static deleteCart(req, res, next) {
    const idProduct = Number(req.body.idProduct)
    
    Cart.destroy({ where: { [Op.and]: [{ CustomerId: req.customer.id }, { ProductId: idProduct }] } })
      .then(() => {
        res.status(200).json({ message: "Product have been deleted" });
      })
      .catch((err) => {
        next(err);
      });
  }

  static updateQuantity(req, res, next) {
    const idProduct = Number(req.body.idProduct)
    const quantityProduct = Number(req.body.quantity)
    let productPrice = null
    let productStock = null

    // TODO: Move to hooks
    if (!quantityProduct || quantityProduct < 0) {
      throw { name: "quantityError" } // Cannot zero and negative value
    }

    Product.findByPk(idProduct)
      .then((dataProduct) => {
        if (!dataProduct) {
          throw { name: "dataNotFound" };
        }
        productStock = dataProduct.stock
        productPrice = dataProduct.price * quantityProduct
        return Cart.findOne({ where: { [Op.and]: [{ CustomerId: req.customer.id }, { ProductId: idProduct }] } })
      })
      .then((dataCart) => {
        if (!dataCart) {
          throw { name: "dataNotFound" };
        } else {
          if (dataCart.quantity + quantityProduct > productStock) {
            throw { name: "quantityError" };
          }
          return Cart.update({
            quantity: dataCart.quantity + quantityProduct,
            total_price: productPrice + dataCart.total_price
          }, { where: { [Op.and]: [{ CustomerId: req.customer.id }, { ProductId: idProduct }] }, returning: true }
          )
        }
      })
      .then((updatedDataCart) => {
        if (updatedDataCart[1].length === 0) {
          next(err); // Handle error from [0, []]
        }
        return res.status(200).json(updatedDataCart[1][0]) // [1, [{ data }]]
      })
      .catch((err) => {
        console.log(err);
        next(err);
      })
  }

  static checkoutCart(req, res, next) {
    Customer.findOne({
      where: { id: req.customer.id }, include: [
        { model: Product }]
    })
      .then((dataCustomer) => {
        // res.status(200).json(dataCustomer.Products)
        // res.status(200).json(dataCustomer.Products[0].stock)
        // res.status(200).json(dataCustomer.Products[0].Cart.quantity)

        const lackOfStock = dataCustomer.Products.filter((product) => {
          if (product.stock < product.Cart.quantity) {
            return product
          }
        })

        // console.log(JSON.stringify(lackOfStock,null,2));
        if (lackOfStock.length > 0) {
          const message = lackOfStock.map((product) => product.name + " Invalid Stock");
          return res.status(400).json({
            Error: "Validation error",
            message,
          });
        }


        const forLoop = async _ => {
          console.log('Start')

          for (let index = 0; index < dataCustomer.Products.length; index++) {
            const element = dataCustomer.Products[index];
            const updatedQuantity = element.stock - element.Cart.quantity

            try {
              // Result is whatever you returned inside the transaction
              let result = await sequelize.transaction(async (t) => {
                // Update every stock property in Product
                await Product.update({ stock: updatedQuantity }, { where: { id: element.id }, transaction: t });
                // Delete every Product in Cart tabel
                return await Cart.destroy({ where: { [Op.and]: [{ CustomerId: req.customer.id }, { ProductId: element.id }] } }, { transaction: t });
              });

              console.log(result);
            } catch (err) {
              console.log(err);
            }
          }
          console.log('End')
        }

        forLoop()

        // const transx = async function (id, quantity) {
        //   try {
        //     // Result is whatever you returned inside the transaction
        //     let result = await sequelize.transaction(async (t) => {

        //       await Product.update({ quantity }, { where: { id }, transaction: t });

        //       return await Cart.destroy({ where: { id } }, { transaction: t });
        //     });

        //     console.log(result);
        //   } catch (err) {
        //     console.log(err);
        //   }
        // }

        // dataCustomer.Products.forEach(product => {
        //   const updatedQuantity = product.stock - product.Cart.quantity
        //   transx(product.id, updatedQuantity)
        // });

        res.status(200).json(dataCustomer)
        // return 
      })
      .catch((err) => {
        console.log(err);
        next(err);
      })
  }
}

module.exports = CartController;
