const { product, cart } = require('../models')
const { checkToken } = require('../helpers/jwt')

class ProductController {
    static getall(req, res, next) {
        let idUser = req.user.id
        console.log(idUser);

        product.findAll()
            .then(dataProduct => {
                res.status(200).json(dataProduct)
            })
            .catch(err => {
                res.status(500).json({ message: 'Internal server error' })
            })
    }

    static create(req, res, next) {
        let newProduct = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: +req.body.price,
            stock: +req.body.stock
        }

        product.create(newProduct)
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                console.log(err);
                if (err.name === 'SequelizeValidationError') {
                    let errors = err.errors.map(err => err.message)
                    res.status(401).json(errors)
                } else {
                    res.status(500).json({ message: 'Internal server error' })
                }
            })
    }

    static update(req, res, next) {
        let id = +req.params.id
        let updateProduct = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: +req.body.price,
            stock: +req.body.stock
        }
        product.update(updateProduct, {
            where: {
                id
            }
        })
            .then(data => {
                res.status(200).json({ message: 'Product is updated' })
            })
            .catch(err => {
                if (err.name === 'SequelizeValidationError') {
                    let errors = err.errors.map(err => err.message)
                    res.status(401).json(errors)
                } else {
                    res.status(500).json({ message: 'Internal server error' })
                }
            })
    }

    static delete(req, res, next) {
        let id = +req.params.id
        product.destroy({
            where: {
                id
            }
        })
            .then(data => {
                res.status(200).json({ message: 'Product has been deleted' })
            })
            .catch(err => {
                res.status(500).json({ message: 'Internal server error' })
            })
    }

    static addToCart(req, res, next){
        let UserId = checkToken(req.headers.access_token).id
        let ProductId = +req.params.id

        // res.send('Masuuuukk pak eko')

        cart.findOne({ where: {
            ProductId: ProductId,
            UserId: UserId
            }
        })
            .then( cartData => {
                console.log('masuk sini');
                res.send( cartData)
                if (!cartData) {
                    let newCart = {
                        ProductId,
                        UserId,
                        quantity: 1,
                        status: 'unpaid'
                    }
                    return cart.create(newCart)
                    .then( cartdata => {
                        res.send(cartdata)
                    }) 

                }
            })
            .catch (err => {
                console.log('masuk sini cuuuyyy');
                console.log(err.stack);
            })
    } 
}

module.exports = ProductController