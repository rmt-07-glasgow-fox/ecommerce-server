const { User } = require('../models')
const { comparePass } = require('../helper/hash')
const { generateToken } = require('../helper/jwt')

class UserController{
    static addNew(req,res,next){
        if(!req.body.role){
            var temp = 'Customer'
        }
        const newUser = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: temp
            
        }
        User.create(newUser)
        .then(data => {
            res.status(201).json({ id: data.id, name: data.name, email: data.email})
        })
        .catch(err => {
            console.log(err);
            next(err)
        })
    } 
    static login(req,res,next){
        const {email,password} = req.body
        User.findOne({
            where:{
                email:email
            }
        })
        .then(data => {
            if (data.email != email) {
                res.status(401).json({
                    msg: 'Invalid Email/Password'
                })
            } 
            if (comparePass(password, data.password)) {
                const payload = {
                    id: data.id,
                    name: data.name,
                    email: data.email
                }
                const access_token = generateToken(payload)
                return res.status(200).json({
                    access_token : access_token
                })
            } else {
                next({
                    name: 'Invalid Email/Password'
                })
            }
        })
        .catch(err => { 
            next({name: 'Invalid Email/Password'})
        })
    }
}

module.exports = {UserController}