const { Cart } = require('../models')

class CartController {
    static async create(req,res,next){
        try {
            let data = req.body
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
                },
                include:{model:'Product'}
            })
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
                    id: req.params.id
                },
                returning:true
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
            let result = await Cart.destroy({
                where:{
                    id: req.params.id
                }
            })
            if(result){
                res.status(200).json({message:'delete cart success'})
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = CartController