const { Cart } = require('../models')

class CartController {
    static async create(req,res,next){
        try {
            let data = req.body
            data.UserId = req.user.id
            let result = await Cart.create(data)
            if(result) res.status(201).json(result)
            
        } catch (error) {
            next(error)
        }
    }

    static async get(req,res,next){
        try {
            let result = await Cart.findAll({
                where:{
                    UserId: req.user.id
                }
            })
            // console.log(result);
            res.status(200).json(result)            
        } catch (error) {
            next(error)
        }
    }

    static async update(req,res,next){
        try {
            let data = req.body
            let result = await Cart.update(data,{
                where:{
                    UserId: req.user.id,
                    ProductId: req.params.id
                },
                returning:true,
                validate: false
            })
            if (result){
                res.status(200).json(result[1][0])
            }
        } catch (error) {
            next(error)
        }
    }

    static async delete(req,res,next){
        try {
            let options = {}
            
            if (req.params.id === 'all'){
                options = {
                    where:{
                        UserId: req.user.id
                    }
                }
            } else {
                options = {
                    where:{
                        ProductId: req.params.id,
                        UserId: req.user.id
                    }
                }
            }
            let result = await Cart.destroy(options)
            if(result){
                res.status(200).json({message:'delete product success'})
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = CartController