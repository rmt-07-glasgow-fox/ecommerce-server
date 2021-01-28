const { Cart, Product, User, sequelize } = require('../models')

class CartController {
	static async addEditCart (req, res, next) {
    const payload = {
      UserId: req.user.id,
      ProductId: req.params.ProductId,
      status: false,
      quantity: req.user.quantity
    }
    console.log(payload);
    try {
      const theCart = await Cart.findOne({
        where: {
          UserId: payload.UserId,
          ProductId: payload.ProductId,
          status: false
        }
      })
      console.log(theCart, payload);
      const theProduct = await Product.findByPk(payload.ProductId)
      // const theUser = await User.findByPk(payload.UserId)
      // console.log(theProduct.stock)
      
      //tambah kondisi kalau udah ada quantity sebelom nya
      if(theProduct.quantity === 0){
        throw { status: 401, message: 'out of stock'}
      }
      
      
      if(!theCart){
        console.log('masuk if');
        const newCart = await Cart.create(payload)
        res.status(201).json(newCart)
      }else {
        console.log('masuk else');
        if((theProduct.stock - theCart.quantity - payload.quantity) < 0){ 
          const fixQuantity = await Cart.update({quantity: theProduct.stock},{
            where: {
              id: theCart.id,
              status: false
            }
          })
          // console.log(fixQuantity);
          throw { status: 401, message: 'out of stock'}
        }else {
          const updateCart = await Cart.update({quantity: theCart.quantity + payload.quantity},{
            where: {
              id: theCart.id,
              status: false
            },
            returning: true
          })
          // console.log(updateCart[1][0].quantity, theCart.id, 'ini');
          if(updateCart[1][0].quantity <= 0){
            const deleteCart = await Cart.destroy({ where: { id: theCart.id }})
            console.log('masuk');
            res.status(200).json({message: 'successfully delete a cart'})
          }else{
            res.status(200).json(updateCart)
          }
        }
      }
    } catch (error) {
      next(error)
    }
	}
}

module.exports = CartController;