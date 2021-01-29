const { Product, Category } = require('../models');
const { fetchOneProduct, updatedProduct } = require('../helpers/controllersHelper')

module.exports = class ProductController {
    static async fetchProducts(req, res, next) {
        try {
            let products = await Product.findAll({
                order: [['id', 'ASC']],
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                include: {
                    model: Category,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }
                }
            })
            res.status(200).json(products);
        } catch (error) {
            next(err);
        }
    }

    static async fetchProduct(req, res, next) {
        try {
            let id = req.params.id;
            let product = await fetchOneProduct(id)

            if (!product) throw new Error('ProductNotFound')
            else res.status(200).json(product);
        } catch (error) {
            next(error)
        }
    }
    
    static async createProduct(req, res, next) {
        try {
            let newProduct = {
                name: req.body.name,
                image_url: req.body.image_url,
                price: +req.body.price,
                stock: +req.body.stock,
                categoryId: +req.body.categoryId,
                description: req.body.description
            }

            let product = await Product.create(newProduct)
            let fetchProduct = await fetchOneProduct(product.id)

            res.status(201).json(fetchProduct)
        } catch (err) {
            next(err)
        }
    } 

    static async updateProduct(req, res, next) {
        try {
            let productId = req.params.id;
            let editProduct = {
                name: req.body.name,
                image_url: req.body.image_url,
                price: +req.body.price,
                stock: +req.body.stock,
                categoryId: +req.body.categoryId,
                description: req.body.description
            };
            let [updated] = await updatedProduct(editProduct, productId)
            let fetchProduct = await fetchOneProduct(productId)

            if (!updated) throw new Error ('ProductNotFound')
            else res.status(200).json(fetchProduct)
        } catch (error) {
            next(error)
        }
    }

    static async updateStock(req, res, next) {
        try {
            let productId = req.params.id;
            let updatedStock = { stock: +req.body.stock }
            let [updated] = await updatedProduct(updatedStock, productId)
            let fetchProduct = await fetchOneProduct(productId)

            if (!updated) throw new Error('ProductNotFound')
            else res.status(200).json(fetchProduct)
        } catch (error) {
            next (error)
        }
    }

    static async updatePrice(req, res, next) {
        try {
            let productId = req.params.id;
            let updatedPrice = { price: +req.body.price }
            let [ updated ] = await updatedProduct(updatedPrice, productId)
            let fetchProduct = await fetchOneProduct(productId)

            if (!updated) throw new Error('ProductNotFound')
            else res.status(200).json(fetchProduct)
        } catch (error) {
            next(error)
        }
    }

    static async updateStatus (req, res, next) {
        try {
            let id = req.params.id;
            let updatedStatus = { status: req.body.status }
            let [updated] = await updatedProduct(updatedStatus, id)
            let fetchProduct = await fetchOneProduct(id)

            if (!updated) throw new Error('ProductNotFound')
            else res.status(200).json(fetchProduct)
        } catch (error) {
            next(error)
        }
    }

    static async deleteProduct(req, res, next) {
        try {
            let id = req.params.id;
            let fetchProduct = await fetchOneProduct(id)
            if (!fetchProduct) throw new Error('ProductNotFound');
            
            await Product.destroy({where: {id}})
            res.status(200).json({
                deletedProduct: fetchProduct,
                message: 'Product has been deleted'
            })
        } catch (error) {
            next(error)
        }
    }
}