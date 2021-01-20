const { Cart } = require('../models')

async function authorization(req, res, next){
    try {
        console.log(req.loggedInUser.id, '<<<<< user Login')
        const cart = await Cart.findOne({where: {id: req.params.id}})
        // console.log(task)
        // console.log(req.loggedInUser)   
        console.log(cart, "<<<< cart")
        if(cart){
            if(cart.UserId === req.loggedInUser.id){
                next()
            }
            else{
                throw {status: 401, name: "noAuthorized"}
            }
        }
        else{
            throw {
                status: 404,
                name: "idNotFound"
            }
        }
    } catch (error) {
        next(error)
    }
}
module.exports = authorization