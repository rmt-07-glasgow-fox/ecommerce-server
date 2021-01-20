const { Product } = require('../models')

class ProductController {
    static async create(req,res,next){
        try {
            let data = req.body
            let result = await Product.create(data)
            if(result) res.status(201).json(result)
            
        } catch (error) {
            next(error)
        }
    }

    static async get(req,res,next){
        try {
            let result = await Product.findAll()
            res.status(200).json(result)            
        } catch (error) {
            next(error)
        }
    }

    static async update(req,res,next){
        try {
            let data = req.body
            let result = await Product.update(data,{
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
            let result = await Product.destroy({
                where:{
                    id: req.params.id
                }
            })
            if(result){
                res.status(200).json({message:'delete product success'})
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ProductController