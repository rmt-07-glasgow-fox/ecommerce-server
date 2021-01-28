const { User, Product, Wishlist, Cart } = require('../models/index')
const { comparePassword } = require('../helper/bcrypt')
const { generateToken } = require('../helper/jwt')
const { sendEmail } = require('../helper/nodemailer')

class userController {

    static register (req, res, next) {
        let obj = {
            email: req.body.email,
            password: req.body.password,
            role: req.body.role || "costumer"
        }
        User.create(obj)
        .then(user => {
            // send email here
            sendEmail(user.email)
            const response = {
                id: user.id,
                email: user.email,
                role: user.role
            }
            res.status(200).json(response)
        })
        .catch(err => {
                next(err)
        })
    }

    static async login (req, res, next) {
        // console.log(req.body);
        try {
            let obj = {
                email: req.body.email,
                password: req.body.password
            }
            // console.log(obj);
            const user = await User.findOne({
                where: { 
                    email: req.body.email 
                }
            })
            // console.log(user);
            if (!user) {
                return next({
                    name: "invalid email / password" 
                })
            }
            const match = comparePassword(obj.password, user.password)
            // console.log(match);
            if (match) {
                const payload = {
                    id: user.id,
                    email: user.email,
                    role: user.role
                }
                const access_token = generateToken(payload)
                return res.status(200).json({
                    access_token: access_token
                })
            } else {
                return next({
                    name: "invalid email / password" 
                })
            }

        } catch (error) {
            return next(error)
        }
    }

    static getInfo (req, res, next) {
        console.log('here');
        User.findAll({
            where: {
                id: +req.user.id
            },
            include: [
                {
                    model: Product,
                    through: Wishlist,
                    as: 'itemonwishlist',
                    attributes: ['id','userId','isBought','quantity','createdAt','updatedAt']
                },
                {
                    model: Product,
                    through: Cart,
                    as: 'itemoncart',
                    attributes: ['id','userId','isBought','quantity','createdAt','updatedAt']
                }
            ],
            attributes: ['email']
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            console.log(err);
            next(err)
        })
    }
}

module.exports = userController

