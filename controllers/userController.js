const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class UserController{
    static async register(req, res){
        try {
            const opt = {
                email: req.body.email,
                password: req.body.password
            }

            const result = await User.create(opt)
            const response = {
                id: result.id,
                email: result.email
            }

            return res.status(201).json(response)
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    static async login(req, res){
        try {
           const opt = {
                email: req.body.email,
                password: req.body.password
            } 

            const result = await User.findOne({
                where: {
                    email: opt.email
                }
            })

            if(!result){
                return res.status(400).json({
                    message: 'Invalid email / password'
                })
            }

            const match = comparePassword(opt.password, result.password)
            // console.log(match, '<<match');
            if(match){
                const payload = {
                    id: result.id,
                    email: result.email,
                    role: result.role
                }

                const access_token = generateToken(payload)

                return res.status(200).json({
                    access_token
                })
            }else{
                console.log('asdasd')
                return res.status(400).json({
                    message: 'Invalid email / password'
                })
            }
        } catch (error) {
            // console.log(error, '<<err');
            return res.status(500).json({
                message: 'internal server error'
            })
        }
    }
}

module.exports = UserController