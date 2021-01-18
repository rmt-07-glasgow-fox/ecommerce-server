const { User } = require('../models')

class UserController {
    static login(req,res,next){
        User.findOne({where: {
            email: req.body.email
        }})
        .then(data => {
            if(data){
                if(req.body.password == data.password){
                    res.status(200).json({
                        id: data.id,
                        name: data.name, 
                        email: data.email,
                        role: data.role
                    }) 
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