const { User } = require('../models')

const { genToken } = require('../helper/jwt')
const { comparePass } = require('../helper/bcrypt')


class UserController {
    static async register (req, res, next) {
        let newUser = {
            email : req.body.email,
            password : req.body.password,
            role : "customer"
        }

        try {   
            const user = await User.create(newUser) 

            res.status(201).json({
                id : user.id,
                email : user.email
            })
        } catch (err) {
            next(err)
        }
    }


    static async login (req, res ,next) {
        let em = req.body.email
        let pass = req.body.password

        if(!em || !pass) next({ name : 'notFill'})

        try {
            const  user = await User.findOne( { where  : 
                { email : em }
            })
            let compare  = comparePass(pass, user.password)

            if(!user) {
                next( { name : 'authError' })
            } else {
                if(compare) {
                    const access_token = genToken({
                        id : user.id,
                        email : user.email
                    })

                    res.status(200).json({
                        access_token
                    })
                } else {
                    next( { name : 'authError'})
                }
            }

        } catch (err) {
            next(err)
        }
    }

}


module.exports = UserController