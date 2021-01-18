const { } = require('../models')

class ProductController {
    static async createProduct(req, res, next) {
        try {
            res.status(200).json(req.body)
        } catch (err) {
            res.status(500).json(err)
        }
    }

    static async readProduct(req, res, next) {
        try {
            res.status(200).json(req.body)
        } catch (err) {
            res.status(500).json(err)
        }
    }

    static async updateProduct(req, res, next) {
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