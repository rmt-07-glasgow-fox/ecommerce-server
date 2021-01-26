const {User} = require('../models')
const checkToken = require('../helper/checkToken')

async function authentication (req, res, next) {
    try{
        let decoded = checkToken(req.headers.access_token)
        let find = await User.findOne({where:{email:decoded.email}})
        if(!find){
            next({name:'Forbidden'})
        }else{
            req.user = find
            next()
        }
    }catch(err){
        next({name:'Forbidden'})
    }   
}
module.exports = authentication