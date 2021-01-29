const {Product} = require('../models/index')

class ProductCon {
    static add(req,res,next){
        Product.create(req.body)
        .then(data=>{
            res.status(201).json({
                id:data.id,
                name:data.name,
                imageUrl:data.imageUrl,
                price:data.price,
                stock:data.stock,
                category:data.category
            })
        })
        .catch(err=>{
            next(err)
        })
    }

    static put(req,res,next){
        let id = req.params.id

        Product.update(req.body,{where:{id}})
        .then(data=>{
            return Product.findByPk(id)
        })
        .then(data=>{
            res.status(200).json({
                id:data.id,
                name:data.name,
                imageUrl:data.imageUrl,
                price:data.price,
                stock:data.stock,
                category:data.category
            })
        })
        .catch(err=>{
            next(err)
        })
    }

    static delete(req,res,next){
        let id = req.params.id

        Product.destroy({where:{id}})
        .then(data=>{
            if (data==1) {
                res.status(200).json({message:'Deleted successfully'})
            } else {
                next({name: 'notFound'})
            }
        })
        .catch(err=>{
            next(err)
        })
    }

    static findAll(req,res,next){
        Product.findAll({order: [[ 'createdAt', 'DESC' ]]})
        .then(data=>{
            if (data) {
                res.status(200).json({data})
            } else {
                next({name: 'notFound'})
            }
        })
        .catch(err=>{
            next(err)
        })
    }

    static findOne(req,res,next){
        let id = req.params.id
        Product.findOne({where:{id}})
        .then(data=>{
            if (data) {
                res.status(200).json({
                    id:data.id,
                    name:data.name,
                    imageUrl:data.imageUrl,
                    price:data.price,
                    stock:data.stock,
                    category:data.category
                })
            } else {
                next({name: 'notFound'})
            }
        })
        .catch(err=>{
            next(err)
        })
    }
}

module.exports = ProductCon