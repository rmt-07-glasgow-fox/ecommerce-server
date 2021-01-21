const { Banner } = require('../models/index')

class bannerController {
    static insert(req, res, next) {
        let obj = {
            title:req.body.title,
            image_url:req.body.image_url,
            status:req.body.status,
        }
        Banner.create(obj)
        .then(data => res.status(201).json(data))
        .catch(err => {
            next(err)
        })
    }

    static update(req, res, next) {
        let id = +req.params.id
        let obj = {
            title:req.body.title,
            image_url:req.body.image_url,
            status:req.body.status,
        }
        Banner.update(obj,{
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
        let obj = { status:req.body.status }
        Banner.update(obj, {
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
            name: 'Banner Deleted' 
        }
        Banner.destroy({
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

module.exports = bannerController