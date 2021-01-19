const {User, Product} = require('../models/index')
const {cekToken} = require('../helpers/jwt')

function authenticate(req, res, next){
    try {
        //console.log(`masuk try`)
        let decoded = cekToken(req.headers.access_token)
        User.findOne({where: {email: decoded.email}})
        .then(data =>{
            if(!data){
                next({name: `notFound`})
            } else {
                //console.log(data)
                req.user = {
                    id: data.id,
                    email: data.email,
                    role: data.role
                }
                next()
            }
        })
        .catch(err =>{

            next(err)
        })
    } catch (err) {
        //console.log(err)
        next({name: `JsonWebTokenError`})
    }
}

function authorize (req, res, next){
    // Product.findOne({where: {id: req.params.id}})
    // .then(data=>{
    //     //console.log(data)
    //     if(!data){
    //         next({name: `notFound`})
    //     }else if(data.userId !== req.user.role){
    //         next({name: `accessDenied`})
    //     }else {
    //         next()
    //     }
    // })
    if(req.user.role !== 'admin'){
        next({name:`accessDenied`})
    }
    next()
}

module.exports = {
    authenticate,
    authorize
}