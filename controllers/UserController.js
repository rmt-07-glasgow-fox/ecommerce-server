const { User, Product, UserProduct } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const { Op } = require('sequelize')

module.exports = class UserController {
    static async register(req, res, next) {
        try {
            let newUser = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }

            let user = await User.create(newUser);
            let { id, name, email, role } = user;

            res.status(201).json({ id, name, email, role });
        } catch (error) {
            next(error)
        }
    }

    static async login(req, res, next) {
        try {
            let { email, password } = req.body
            let user = await User.findOne({ where: { email }})
            let isLogin = !user ? false : comparePassword(password, user.password)

            if (!isLogin) throw new Error ('InvalidEmailPassword');
            res.status(200).json({
                name: user.name,
                access_token: generateToken({ email: user.email })
            })
        } catch (error) {
            next(error)
        }
    }

    static async fetchUserProducts (req, res, next) {
        try {
            let UserId = req.user.id;
            let userProducts = await UserProduct.findAll({
                order: [['id','ASC']],
                where: { UserId },
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                include: {
                    model: Product,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }
                }
            })

            res.status(200).json(userProducts)
        } catch (err) {
            next(err)
        }
    }

    static async addToCart (req, res, next) {
        try {
            let ProductId = +req.body.ProductId;
            let UserId = req.user.id;
            let [ userProduct ] = await UserProduct.findOrCreate({
                where: { UserId, ProductId, 
                    [Op.or]: [
                        { paymentStatus: 'pending' }, 
                        { paymentStatus: 'empty' }
                    ] 
                }
            })

            let findWishlist = await UserProduct.findOne({
                where: { UserId, ProductId, paymentStatus: 'paid', wishlist: true }
            })

            if (findWishlist) updatedCart.wishlist = true
            
            let updatedCart = {
                quantity: req.body.quantity,
                totalPrice: req.body.totalPrice,
                paymentStatus: req.body.paymentStatus,
                invoice: req.body.invoice
            }

            updatedCart.quantity += userProduct.quantity
            updatedCart.totalPrice += userProduct.totalPrice

            await UserProduct.update(updatedCart, {
                where: { UserId, ProductId, 
                    [Op.or]: [
                        {paymentStatus: 'pending'},
                        {paymentStatus: 'empty'}
                    ]
                },
            })
            let findUserProduct = await UserProduct.findOne({
                where: {id: userProduct.id},
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                include: {
                    model: Product,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }
                }
            })
            res.status(200).json(findUserProduct) 
        } catch (err) {
            console.log(err)
            next(err)
        }  
    }

    static async buyProduct (req, res, next) {
        try {
            let newBuyer = {
                UserId: req.user.id,
                ProductId: req.body.ProductId,
                quantity: req.body.quantity,
                totalPrice: req.body.totalPrice,
                invoice: req.body.invoice,
                paymentStatus: req.body.paymentStatus
            } 

            let buyerProduct = await UserProduct.create(newBuyer)
            await UserProduct.update(newBuyer, { where: { id: buyerProduct.id }})
            let findUserProduct = await UserProduct.findOne({
                where: { id: buyerProduct.id },
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                include: {
                    model: Product,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }
                }
            })
            res.status(200).json(findUserProduct)
        } catch (err) {
            next (err)
        }
    }

    static async addWishlist (req, res, next) {
        try {
            let ProductId = req.body.ProductId;
            let UserId = req.user.id;
            let updateWishlist = { wishlist: req.body.wishlist };

            await UserProduct.findOrCreate({
                where: { UserId, ProductId }
            })
            
            await UserProduct.update(updateWishlist, {
                where: { 
                    UserId, 
                    ProductId
                }
            })
            res.status(200).json({
                message: 'Wishlist has been changed'
            })
        } catch (err) {
            next(err)
        }
    }

    static async updateCart (req, res, next) {
        try {
            let ProductId = req.body.ProductId;
            let UserId = req.user.id;
            let updatedCart = {
                quantity: req.body.quantity,
                totalPrice: req.body.totalPrice,
                paymentStatus: req.body.paymentStatus,
                invoice: req.body.invoice
            }

            let findUserProduct = await UserProduct.findOne({
                where: {UserId, ProductId, paymentStatus: 'pending'}
            })

            updatedCart.quantity += findUserProduct.quantity
            updatedCart.totalPrice += findUserProduct.totalPrice

            await UserProduct.update(updatedCart, {
                where: { UserId, ProductId, paymentStatus: 'pending' },
            })

            let userProduct = await UserProduct.findOne({
                where: { id: findUserProduct.id },
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                include: {
                    model: Product,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }
                }
            })
            res.status(200).json(userProduct)
        } catch (err) {
            console.log(err)
            next(err)
        }
        
    }

    static async deleteProduct (req, res, next) {
        try {
            let id = req.params.id

            await UserProduct.destroy({
                where: { id }
            })
            res.status(200).json({
                message: 'User product has been deleted'
            })
        } catch (err) {
            next(err)
        }
    }
}