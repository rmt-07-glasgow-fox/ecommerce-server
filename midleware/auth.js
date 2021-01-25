const {decodeToken} = require('../helper/jwt')
const {User} = require('../models/index')

function authentication(req,res,next){
    let user = decodeToken(req.headers.accesstoken)
    req.loginUser = user
    User.findByPk(user.id)
    .then(data=>{
        if (data) {
            next()
        } else {
            res.status(401).json({message: `Invalid Authentication`})
        }
    })
    .catch(err=>{
        next(err)
    })
}

function authorization(req,res,next) {
    if ( req.loginUser.role == 'admin') {
        next()
    } else {
        res.status(401).json({message: `Invalid Authentication`})
    }
}

module.exports = {authentication,authorization}