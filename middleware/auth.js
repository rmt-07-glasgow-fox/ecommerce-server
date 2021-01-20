const { decode } = require('../helpers/jwt')
const { User } = require('../models')

module.exports = {
    async authAdmin(req,res,next){
        try {
            let token = req.headers.access_token
            if (token) {
                let payload = decode(token)
                let result = await User.findOne({
                    where:{
                        email:payload.email
                    }
                })
                if(result){
                    if(result.role !== 'admin'){
                        next({name:'Forbidden', message:'You don\'t have access only admin'})
                    }else{
                        res.user = payload
                        next()
                    }
                }else{
                    next({name:'NotFound',message:'User not found'})
                }
            }else{
                next({name:'Unauthorized', message:'You must login first'})
            }
        } catch (error) {
            next(error)
        }

    }
}