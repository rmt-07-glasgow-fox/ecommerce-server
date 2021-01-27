const { compare } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const { User } = require('../models')

class AuthController {
    static async login (req,res,next){
        try {
            const {email,password} = req.body
            let result = await User.findOne({
                where:{
                    email
                }
            })
            if(result){
                if(compare(password,result.password)){
                    let payload = {
                        id: result.id,
                        email: result.email,
                        role: result.role
                    }
                    let access_token = generateToken(payload)
                    res.status(200).json({access_token})
                }else{
                    next({name:'BadRequest',message:'invalid email / password'})
                }
            }else{
                next({name:'BadRequest',message:'invalid email / password'})
            }
            
        } catch (error) {
            next(error)
        }
    }
    static async register (req,res,next){
        try {
            const data = req.body
            let result = await User.create(data)
            if(result){
                let response = {
                    id: result.id,
                    email: result.email
                }
                res.status(201).json(response)
            }            
        } catch (error) {
            next(error)
        }
    }
}

module.exports = AuthController