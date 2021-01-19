const { User } = require('../models')
const { generateToken } = require('../helpers/jwt')

class UserController {
    static login(req,res,next){
        User.findOne({where: {
            email: req.body.email
        }})
        .then(data => {
            if(data){
                const payload = {
                    id: data.id,
                    email: data.email
                }
                const access_token = generateToken(payload)
                if(req.body.password == data.password){
                    res.status(200).json({ access_token }) 
                } else {
                    throw {
                        status: 401,
                        message: "wrong email/password"
                    }
                }       
            } else {
                throw {
                    status: 401,
                    message: "email hasn't been registered"
                }
            }      
        })
        .catch(error => {
            next(error)
        })
    }
}

module.exports = UserController