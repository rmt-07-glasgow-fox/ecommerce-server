const { User } = require('../models')
const { checkPassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jsonwebtoken')

class userController {
    static register(req, res, next){
        const user = {
            email: req.body.email,
            password: req.body.password,
            role : 'user'
        }
        User.create(user)
        .then(user => {
            res.status(201).json(user)
        })
        .catch(err => {
            next(err)
        })
    }

    static login(req, res, next){
        const { email, password } = req.body
        User.findOne({
            where : {
                email
            }
        })
        .then(user => {
            if(user){
                if(checkPassword(password, user.password)){
                    const payload = {
                        id : user.id,
                        email : user.email,
                        role : user.role
                    }
                    const access_token = generateToken(payload)
                    res.status(200).json({access_token})
                } else {
                    next({name: "Incorrect Email / Password"})
                }
            } else {
                next({name: "Incorrect Email / Password"})
            }
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = userController