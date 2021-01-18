const { User } = require('../models')
const { comparePass } = require('../helper/hash')
const { generateToken } = require('../helper/jwt')

class UserController{
    static addNew(req,res,next){
        const {name, email, password} = req.body  
        User.create({name, email, password})
        .then(data => {
            res.status(201).json(data)
        })
        .catch(next)
    } 
    static login(req,res,next){
        const {email,password} = req.body
        User.findOne({
            where:{
                email:email
            }
        })
        .then(data => {
          res.status(200).json({id:data.id, name:data.name, email:data.email})
        })
        .catch(err => { 
            next({name: 'Invalid Email/Password'})
        })
    }
}

module.exports = {UserController}