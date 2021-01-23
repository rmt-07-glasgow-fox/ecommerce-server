const { Product } = require('../models')
const { cekToken } = require('../helper/jwt')

class ProductController{
    static getProduct(req,res,next){
        Product.findAll()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }
    static getOneProduct(req,res,next){
        Product.findByPk(req.params.id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }
    static addProduct(req, res, next){
        let temp = cekToken(req.headers.access_token)
        const newProduct = {
            name: req.body.name,
            description: req.body.description,
            image_url: req.body.image_url,
            condition: req.body.condition,
            price: req.body.price,
            stock: req.body.stock,
            UserId: temp.id
        }
        Product.create(newProduct)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            next(err)
        })
    }
    static deleteProduct(req,res,next){
        Product.destroy({
            where: {
                id:req.params.id
            }
        })
        .then(() => {
            res.status(200).json({message: 'Product has been deleted'})
        })
        .catch(err => {
            next(err)
        })
    }
    static editProduct(req,res,next){
        const newProduct = {
            name: req.body.name,
            description: req.body.description,
            image_url: req.body.image_url,
            condition: req.body.condition,
            price: req.body.price,
            stock: req.body.stock
        }
        Product.update(newProduct, {
            where:{
                id: req.params.id
            }
        })
        .then(data => {
            res.status(200).json({ message: 'Product has been updated' })
        })
        .catch(err => {
            next(err)
        })
    }
    static editOne(req,res,next){
        const newProduct = {
            condition: req.body.condition
        }
        Product.update(newProduct, {
            where:{
                id: req.params.id
            }
        })
        .then(data => {
            res.status(200).json({ message: 'Product has been updated' })
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = {ProductController}