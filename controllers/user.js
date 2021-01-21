const { User } = require('../models/index')
const { comparePassword } = require('../helper/bcrypt')
const { generateToken } = require('../helper/jwt')

class userController {

    static register (req, res, next) {
        let obj = {
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        }
        User.create(obj)
        .then(user => {
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
}

module.exports = userController

