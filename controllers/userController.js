const { comparePassword } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');
const { User } = require('../models')

class UserController {
    static registerUser(req, res, next) {
        let {email, password, role} = req.body
        User.create({
            email, password, role
        })
        .then(user => {
            const response = {
                id: user.id,
                email: user.email,
                role: user.role
            }
            return res.status(201).json(response);
        })
        .catch(err => {
            next(err)
        })
    }

    static loginUser(req, res, next) {
        let {email, password} = req.body
        User.findOne({where: {email}})
        .then(user => {
            if(!user){
                next({name: "wrongInput"})
            }
            const match = comparePassword(password, user.password)
            if(match){
                const payload = {
                    id: user.id,
                    email: user.email,
                    role: user.role
                }
                if (payload.role !== 'admin'){
                    next({name: "You Not a Admin"})
                } else {
                    const access_token = generateToken(payload)
                    return res.status(200).json({access_token});
                }
            }else {
                next({name: "wrongInput"})
            }
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = UserController