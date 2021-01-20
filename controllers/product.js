const { Product } = require('../models')

class ProductController {
    static async getAll (req, res, next){
        try{
            const dataProduct = await Product.findAll()
            res.status(200).json(dataProduct)
        }
        catch(err){
            next(err)
        }
    }
    static async createProduct (req, res, next) {
        console.log(req.body, 'INI dari controller prducts')
        const payload = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        }
        try {
            const newProduct = await Product.create(payload)
            res.status(201).json(newProduct)
        }
        catch(err){
            console.log(err)
            next(err)
        }
    }
    static async getById(req, res, next) {
        const idProduct = req.params.id
        try{
            const product = await Product.findOne({where: {id: idProduct}})
            if(!product) {
                throw {
                    name: "productNotFound",
                    status: 404
                }
            }
            else {
                res.status(200).json(product)
            }
        }
        catch(err){
            next(err)
        }
    }
    static async editProduct (req, res, next) {
        const payload = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        }
        try{
            const product = await Product.update(payload, {where: {id: req.params.id}, returning: true})
            res.status(200).json(product[1][0])
        }
        catch(err){
            next(err)
        }
    }
    static async deleteProduct ( req, res, next) {
        try {
            const dataTask = await Product.destroy({where: {id: +req.params.id}});
            console.log(dataTask)
            res.status(200).json(`Product succes to delete`);
        } catch (error) {
            next(error)
        }
    }
}


module.exports = ProductController