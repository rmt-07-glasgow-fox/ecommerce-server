const { Product, Brand } = require('../models')

class ProductController {
    static async addProduct(req, res, next) {
        try {
            let { name, image_url, price, stock, BrandId } = req.body
            console.log('>>> req.body : ', req.body)

            let newProduct = {
                name: name,
                image_url: image_url,
                price: +price,
                stock: +stock,
                BrandId: +BrandId
            }
            console.log('>>> newProduct', newProduct)

            let insertProduct = await Product.create(newProduct)
            let response = {
                id: insertProduct.id,
                name: insertProduct.name,
                image_url: insertProduct.image_url,
                price: insertProduct.price,
                stock: insertProduct.stock,
                BrandId: insertProduct.BrandId
            }

            return res.status(201).json(response)
        } catch (err) {
            return next(err)
        }
    }

    static async showProduct(req, res, next) {
        try {
            let product = await Brand.findAll({
                order: [['id']],
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                include: [{
                    model: Product,
                    attributes: { exclude: ['createdAt', 'updatedAt'] }
                }]
            })

            res.status(200).json(product)
        } catch (err) {
            return next(err)
        }
    }

    static async editProduct(req, res, next) {
        try {
            res.status(200).json(req.body)
        } catch (err) {
            return next(err)
        }
    }

    static async deleteProduct(req, res, next) {
        try {
            res.status(200).json(req.body)
        } catch (err) {
            return next(err)
        }
    }
}

module.exports = ProductController