const e = require('express');
const { Cart, Product, sequelize } = require('../models')

class CartController {
	static async addEditCart (req, res, next) {
		const payload = {
			UserId: req.loggedInUser.id,
			ProductId: req.body.productId,
			quantity: +req.body.quantity,
			status: false
		}
		console.log(payload);

		try {
			const inCart = await Cart.findOne({
				where: {
					UserId: payload.UserId,
					ProductId: payload.ProductId,
					status: false
				}
			})
			console.log(inCart, payload)

			const inProduct = await Product.findByPk(payload, ProductId)

			if(inProduct.quantity === 0) {
				throw { status: 401, message: 'out of stock'}
			}

			if(!inCart) {
				const newCart = await Cart.create(payload)
				res.status(201).json(newCart)
			}
			else {
				if ((inProduct.stock - inCart.quantity - payload.quantity) < 0) {
					const fixQuantity = await Cart.update({ quantity: inProduct.stock }, {
						where: {
							id: inCart.id,
							status: false
						}
					})
					throw { status: 401, message: 'out of stock' }
				}
				else {
					const updateCart = await Cart.update({ quantity: inCart.quantity + payload.quantity }, {
						where: {
							id: inCart.id,
							status: false
						},
						returning: true
					})
					if(updateCart[1][0].quantity <= 0) {
						const deleteCart = await Cart.destroy({ where: { id: inCart.id }})
						res.status(200).json({ message: 'successfully delete a cart' })
					}
					else {
						res.status(200).json(updateCart)
					}
				}
			}
		}
		catch (error) {
			next(error)
		}
	}

	static async fetch (req, res, next) {
		try {
			let totalPrice = 0
			const carts = await Cart.findAll({
				where: {
					UserId: req.loggedInUser.id,
					status: false
				},
				include: [ Product ],
				order: [[ 'createdAt', 'ASC' ]]
			})

			carts.forEach(el => {
				totalPrice += el.quantity * el.Product.price
			});
			res.status(200).json({ totalPrice, carts })
		}
		catch (error) {
			next(error)
		}
	}

	static async fetchHistory (req, res, next) {
		try {
			let totalPrice = 0
			const carts = await Cart.findAll({
				where: {
					UserId: req.loggedInUser.id,
					status: true
				},
				include: [ Product ],
				order: [[ 'updateddAt', 'ASC' ]]
			})

			res.status(200).json(carts)
		}
		catch (error) {
			next(error)
		}
	}

	static async delete (req, res, next) {
		try {
			const CartId = req.body.cartId
			const deleteCart = await Cart.destroy({ where : {id: CartId, UserId: req.loggedInUser.id}})
      res.status(200).json({message: 'succesfully deleted an item'})
		}
		catch (error) {
			next(error)
		}
	}

	static async checkout (req, res, next) {
		const t = await sequelize.transaction()
		try {
			const checkoutCarts = await Cart.findAll({
				where: {
					UserID: req.loggedInUser.id,
					status: false
				},
				include: [ Product ]
			})
			const errors = []
			const execute = []
			const fixQuantity = []

			checkoutCarts.forEach(el => {
				if (el.quantity <= el.Product.stock) {
					execute.push(Product.update({ stock: el.Product.stock - el.quantity }, { where: { id: el.Product.id }, returning: true, transaction: t}))
					execute.push(Cart.update({ status:true }, { where: { id: el.id }, returning: true, transaction: t }))
				}
				else {
					errors.push(`failed to buy ${el.Product.name}`)
					fixQuantity.push(Cart.update({ quantity: el.Product.stock }, {
						where: {
							id: el.id,
							status: false
						}
					}))
				}
			})
			const result = await Promise.all(execute)
			if(errors.length > 0) {
				const foo = await Promise.all(fixQuantity)
				throw { status: 400, message: errors }
			}
			await t.commit()
			res.status(200).json({ success: result })
		}
		catch (error) {
			await t.rollback();
			next(error)
		}
	}
}

module.exports = CartController;