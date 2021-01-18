const {Product} = require('../models/index')

class Controller {
    static create (req, res, next){
        let obj = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: +req.body.price,
            stock: +req.body.stock
        }
         //console.log(obj)
        Product.create(obj)
        .then(data =>{
            //console.log(data)
            return res.status(201).json(data)
        })
        .catch(err =>{
            //console.log(err)
            next(err)
        })
    }

    static showProduct(req, res, next){
        Product.findAll()
        .then(data =>{
            return res.status(200).json(data)
        })
        .catch(err =>{
            console.log(err)
            next(err)
        })
    }

    static update(req, res, next){
        let id = req.params.id
        let obj = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: +req.body.price,
            stock: +req.body.stock
        }

        Product.update(obj, {where: {id}, returning: true, plain: true})
        .then(data =>{
            return res.status(200).json(data[1])
        })
        .catch(err =>{
            next(err)
        })
    }
}

module.exports = Controller