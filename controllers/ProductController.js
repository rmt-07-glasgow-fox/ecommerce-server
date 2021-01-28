const { Product, sequelize } = require('../models')
const { Cart } = require('../models')
const { cekToken } = require('../helper/jwt')

class ProductController{
    static getProduct(req,res,next){
        Product.findAll({
            order: [
                ['id','DESC']
            ]
        })
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
        let statusCart

        Product.findOne({where: {id:idProduct}})
            .then(data => {
                temp = data
                return Cart.findOne({where: {ProductId: idProduct, UserId:user.id, Paid: 'Unpaid'} })
                .then(data => {
                    CartDataId = data.ProductId
                    statusCart = data.Paid
                })
                .catch(_ => {
                    console.log('error');
                })
            })
            .then(_ => {
                console.log(temp.id, 'ini id product');
                console.log(CartDataId, 'ini id producy juga');
                console.log(statusCart, 'ini status');
                if (temp.id == CartDataId && statusCart == 'Unpaid') {
                    res.status(201).json({msg: 'berhasil'})
                    return Cart.increment({'quantity':1, 'totalprice':temp.price}, {where: { ProductId: idProduct , UserId:user.id}}) 
                } else {
                    let newShopping = {
                        UserId: user.id,    
                        ProductId: idProduct,
                        quantity: 1,
                        totalprice: temp.price
                    }
                    return Cart.create(newShopping)
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
        Cart.findAll({
            where: {UserId: user.id, Paid: 'Unpaid'},
            order: [
                ['id','DESC']
            ],
            attributes: ['id','UserId','ProductId','Paid','quantity','totalprice','createdAt', 'updatedAt'],
            include: 'Product',
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            console.log(err);
            next(err)
        })
    }

    static getCartUserHistory (req, res, next) {
        let user = cekToken(req.headers.access_token)
        Cart.findAll({
            where: {UserId: user.id, Paid: 'Paid'},
            attributes: ['id','UserId','ProductId','Paid','quantity','totalprice','createdAt', 'updatedAt'],
            include: 'Product'
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            console.log(err);
            next(err)
        })
    }

    static minusCart (req, res, next) {
        let user = cekToken(req.headers.access_token)
        let idProduct = req.params.id

        Cart.findOne({
            where: {ProductId: idProduct, UserId:user.id, Paid: 'Unpaid'},
            include: [{ model: Product, attributes: { exclude: ['createdAt', 'updatedAt'] } }]
        })
        .then(data => {
            console.log(data.quantity, 'halo darisini');
            if (data.quantity > 1) {
                return Cart.decrement({'quantity': 1, 'totalprice': data.Product.price}, {where: { ProductId: idProduct, UserId:user.id, Paid: 'Unpaid'}})  
            } else if (data.quantity <= 1) {
                throw {
                    err
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

        Cart.findOne({
            where: {ProductId: idProduct, UserId:user.id, Paid: 'Unpaid'}, 
            include: [{ model: Product, attributes: { exclude: ['createdAt', 'updatedAt'] } }]
        })
        .then(data => {
            return Cart.increment({'quantity': 1, 'totalprice': data.Product.price}, {where: { ProductId: idProduct, UserId:user.id, Paid: 'Unpaid'}}) 
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
    static async checkout (req,res,next) {
        let user = cekToken(req.headers.access_token)
        const t = await sequelize.transaction()
        try {
            const UserId = user.id
            const cart = await Cart.findAll({
                where: {
                    UserId, Paid: 'Unpaid'
                }
            }, {
                transaction: t
            })
            for(const item of cart) {
                const product = await Product.findByPk(item.ProductId)
                if (item.quantity > product.stock) {
                    throw { msg: 'Tidak boleh lebi dari stok' }
                } else {
                    let stock = product.stock - item.quantity
                    await Product.update({stock}, {where: {id: item.ProductId}}, {transaction: t})
                    await Cart.update({ Paid: 'Paid' }, { where: { UserId, ProductId: item.ProductId, Paid: 'Unpaid' } })
                }
            }
            t.afterCommit(_ => {
                return res.status(200).json({ msg: 'Success Paid Product' })
            })
            await t.commit()
        } catch (err) {
          await t.rollback()
          next(err)
        }
    }
}

module.exports = {ProductController}