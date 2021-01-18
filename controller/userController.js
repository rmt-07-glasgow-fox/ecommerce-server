const { User } = require('../models')

const { OAuth2Client } = require('google-auth-library');
const { genToken } = require('../helper/jwt')
const { comparePass } = require('../helper/bcrypt')

const { randomPass } = require('../helper/randomPass')

class UserController {
    static async register (req, res, next) {
        let newUser = {
            email : req.body.email,
            password : req.body.password,
            role : 'customer'
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

    static googleLogin(req, res, next) {
        const { id_token } = req.body
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
        
        let payload

        client.verifyIdToken({
            idToken : id_token,
            audience : process.env.GOOGLE_CLIENT_ID
        })
        .then(ticket => {
            payload = ticket.getPayload()
            return User.findOne({where : 
             { email : payload.email }
         })
        })
        .then(user => {
            if(user) {
                return user
            } else {
                return User.create(
                 { 
                     email : 'user@gmail.com' || payload.email,
                     password : randomPass()
                 })
            }
        })
        .then(user => {
            const access_token = getToken({
                id : user.id,
                email : user.email
            })
 
            res.status(200).json({
                access_token
            })
        })
        .catch(err => {
            next(err)
        })
    }

    static async getUser(req, res, next) {
        try {
            if(!req.loginUser.id) {
                next({ name : 'authError'})
            } else {
                const getData = await User.findOne(
                    {attributes : { exclude : ['password', 'createdAt', 'updatedAt']}},
                    {where : {id : req.loginUser.id}}
                    )

            if(!getData) {
                next( { name : 'notFound'})

            } else {
                res.status(200).json(getData)
            }
            }
            
        } catch (err) {
            next(err)
        }
    }

    static async editUser(req, res, next) {
        let idEdit

        let edittedUser = {
            email : req.body.email,
            password : req.body.password,
        }
        
        try {
            if(!req.loginUser.id) {
                next({name : 'authError'})
            } else {

                idEdit = req.loginUser.id

                const data = await User.update(edittedUser, {where :
                    { id : idEdit}
                })
                if(!data) {
                    next({ name : 'notFound'})
    
                } else {
                    res.status(200).json(data)
                }
            }
            
        } catch (err) {
            next(err)
        }
        
    }

    static async deleteUser( req, res , next) {
        let deleteId

        try {

            if(!req.loginUser.id) {
                next( { name : 'authError'})
            } else {
                deleteId = req.loginUser.id

                const data  = await User.destroy({where : {id : deleteId}})

                if(!data) {
                    next( {name : 'notFound' })
                } else {
                    res.status(200).json({
                        message : `User ${id} success to delete`
                    })
                }
            }
            

        } catch(err) {
            next(err)
        }
    }
}


module.exports = UserController