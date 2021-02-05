const { Category } = require('../models/index')

class categoryController {
    static findAll(req, res, next) {
        Category.findAll({
            order: [['createdAt','asc']]
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }
    static insert(req, res, next) {
        let obj = {
            name:req.body.name,
        }
        Category.create(obj)
        .then(data => res.status(201).json(data))
        .catch(err => {
            next(err)
        })
    }

    static update(req, res, next) {
        let id = +req.params.id
        let obj = {
            name:req.body.name,
        }
        Category.update(obj,{
            where: {
                id
            },
            returning: true
        })
        .then((data) => {
            if(data[0]) {
                res.status(200).json(data[1])
            } else {
                next({
                    name: "ResourceNotFound" 
                })
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static patch(req, res, next) {
        let id = +req.params.id
        let obj = { name:req.body.name }
        Category.update(obj, {
            where: {
                id
            },
            returning: true
        })
        .then((data) => {
            if(data[0]){
                res.status(200).json(data[1])
            } else {
                next({
                    name: "ResourceNotFound" 
                })
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static delete(req, res, next) {
        let id = +req.params.id
        let deleted = {
            name: 'Category Deleted' 
        }
        Category.destroy({
            where: {
                id
            }
        })
        .then((data) => {
            if(data === 1) {
                res.status(200).json(deleted)
            } else {
                next({
                    name: "ResourceNotFound" 
                })
            }
        })
        .catch(() =>  {
            next(err)
        })
    }
}

module.exports = categoryController