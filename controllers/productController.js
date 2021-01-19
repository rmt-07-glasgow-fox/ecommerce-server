const { Product } = require('../models')

class ProductController {
    static async addProduct(req, res, next) {
        try {
            // let { } = req.body

            res.status(200).json(req.body)
        } catch (err) {
            res.status(500).json(err)
        }
    }

    static async showProduct(req, res, next) {
        try {
            res.status(200).json(req.body)
        } catch (err) {
            res.status(500).json(err)
        }
    }

    static async editProduct(req, res, next) {
        try {
            res.status(200).json(req.body)
        } catch (err) {
            res.status(500).json(err)
        }
    }

    static async deleteProduct(req, res, next) {
        try {
            res.status(200).json(req.body)
        } catch (err) {
            res.status(500).json(err)
        }
    }
}

module.exports = ProductController