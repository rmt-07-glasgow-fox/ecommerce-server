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
            let product = await Product.findAll({
                order: [['id']],
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                include: [{
                    model: Brand,
                    attributes: { exclude: ['createdAt', 'updatedAt'] }
                }]
            })

            return res.status(200).json(product)
        } catch (err) {
            return next(err)
        }
    }

    static async editProduct(req, res, next) {
        try {
            let idProduct = +req.params.idProduct

            console.log('>>> req.product', req.product)

            let name = req.body.name
            let image_url = req.body.image_url
            let price = +req.body.price
            let stock = +req.body.stock
            let BrandId = +req.body.BrandId

            let updateProduct = await Product.update({ name, image_url, price, stock, BrandId }, {
                where: { id: idProduct }
            })

            return res.status(200).json({ message: `Product id : ${idProduct} is updated` })
        } catch (err) {
            return next(err)
        }
    }

    static async deleteProduct(req, res, next) {
        try {
            let { id, name } = req.product
            console.log('>>> deleted product', req.product)

            let deleteProduct = await Product.destroy({ where: { id: id } })

            return res.status(200).json({ message: `${name} is deleted` })
        } catch (err) {
            return next(err)
        }
    }
}

module.exports = ProductController