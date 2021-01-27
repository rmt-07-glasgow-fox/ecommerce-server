const { Product } = require('../models')
const { Cart } = require('../models')
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
    static addToCart(req, res, next) {
        let user = cekToken(req.headers.access_token)
        let idProduct = req.params.id
        let temp
        let CartDataId
        
        Product.findOne({where: {id:idProduct}})
            .then(data => {
                console.log('romi');
                temp = data
                return Cart.findOne({where: {ProductId: idProduct, UserId:user.id} })
                .then(data => {
                    CartDataId = data.ProductId
                    console.log(data.ProductId, 'ini ketemu');
                })
                .catch(_ => {
                    let newShopping = {
                        UserId: user.id,    
                        ProductId: idProduct,
                        quantity: 1,
                        totalprice: temp.price
                    }
                    return Cart.create(newShopping)
                })
            })
            .then(_ => {
                console.log(temp.id, 'ini id product');
                console.log(CartDataId, 'ini id producy juga');
                if (temp.id == CartDataId) {
                    res.status(201).json({msg: 'berhasil'})
                    return Cart.increment({'quantity':1, 'totalprice':temp.price}, {where: { ProductId: idProduct }}) 
                }
            })
            .then(_ => {
                res.status(201).json({msg: 'berhasil'})
            })
            .catch(err => {
                console.log(err)
                next(err)
            })
    }
    static getCartUser (req, res, next) {
        let user = cekToken(req.headers.access_token)
        Cart.findAll({where: { UserId: user.id}})
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    static minusCart (req, res, next) {
        let user = cekToken(req.headers.access_token)
        let idProduct = req.params.id

        Cart.findOne({where: {ProductId: idProduct, UserId:user.id} })
        .then(data => {
            if (data.quantity > 0) {
                if (data.quantity == 1) {
                    priceTemp = data.totalprice
                    return Cart.decrement({'quantity': 1, 'totalprice': priceTemp}, {where: { ProductId: idProduct }}) 
                } else if (data.quantity > 1) {
                    let priceTemp = (data.totalprice/data.quantity)
                    console.log(priceTemp);
                    return Cart.decrement({'quantity': 1, 'totalprice': priceTemp}, {where: { ProductId: idProduct }}) 
                }
            }
        })
        .then(_ => {
            res.status(200).json({ msg: 'berhasil' })
        })
        .catch(err => {
            next(err)
        })

    }
    static plusCart (req,res,next) {
        let user = cekToken(req.headers.access_token)
        let idProduct = req.params.id

        Cart.findOne({where: {ProductId: idProduct, UserId:user.id} })
        .then(data => {
            if (data.quantity > 0) {
                if (data.quantity == 1) {
                    let priceTemp = data.totalprice
                    return Cart.increment({'quantity': 1, 'totalprice': priceTemp}, {where: { ProductId: idProduct }}) 
                } else if (data.quantity > 1) {
                    let priceTemp = (data.totalprice/data.quantity)
                    return Cart.increment({'quantity': 1, 'totalprice': priceTemp}, {where: { ProductId: idProduct }}) 
                }
            }
        })
        .then(_ => {
            res.status(200).json({ msg: 'berhasil' })
        })
        .catch(err => {
            next(err)
        })
    }
    static destroyCart (req,res,next) {
        let idCart = req.params.id
        Cart.destroy({where: {id: idCart}})
        .then(_ => {
            res.status(200).json({ msg: 'berhasil' })
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = {ProductController}