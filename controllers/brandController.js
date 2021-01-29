const { Brand, Product } = require('../models')

class BrandController {
    static async showAllBrand(req, res, next) {
        try {
            let allBrands = await Brand.findAll({
                order: [['id']],
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                include: [{
                    model: Product,
                    attributes: { exclude: ['createdAt', 'updatedAt'] }
                }]
            })

            return res.status(200).json(allBrands)
        } catch (err) {
            return next(err)
        }
    }

    static async addBrand(req, res, next) {
        try {
            let { name, image_url } = req.body
            console.log(req.body)

            let newBrand = await Brand.create({ name, image_url })
            let response = {
                id: newBrand.id,
                name: newBrand.name,
                image_url: newBrand.image_url,
            }

            return res.status(201).json(response)
        } catch (err) {
            return next(err)
        }
    }
}

module.exports = BrandController