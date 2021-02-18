const { Banner } = require('../models')
const {format} = require('util');
const gc = require('../config/')
const bucket = gc.bucket('gardara_ecommerce')
const {Storage} = require('@google-cloud/storage');

class Controller {
    static getBanner(req, res, next) {
        Banner.findAll({
            order: [['title','ASC']]
        })
            .then(banners => {
                res.status(200).json(banners)
            })
            .catch(err => {
                next(err)
            })

    }

    static getOneBanner(req, res, next) {
        Banner.findOne({
            where: {
                id: +req.params.id
            }
        })
        .then(banner => {
            res.status(200).json(banner)
        })
        .catch(err => {
            next(err)
        })
    }

    static postBanner(req, res, next) {
        const { title, status, imageUrl } = req.body
        Banner.create({
            title, status, imageUrl, UserId : req.user.id
        })
            .then(banner => {
                res.status(201).json(banner)
            })
            .catch(err => {
                next(err)
            })
    }

    static postBannerImage(req, res, next) {
        const storage = new Storage();
        if (!req.file) {
            res.status(400).send('No file uploaded.');
            return;
        }
          let dateTime = new Date().toJSON().split('-').join('').split(':').join('').slice(0, 15)
          req.file.originalname = dateTime + req.file.originalname 
          const blob = bucket.file(req.file.originalname);
          const blobStream = blob.createWriteStream();
        
          blobStream.on('error', err => {
            next(err);
          });
        
          blobStream.on('finish', () => {
            const publicUrl = format(
              `https://storage.googleapis.com/${bucket.name}/${blob.name}`
            );
            res.status(200).json({ imageUrl: publicUrl })
          });
        
          blobStream.end(req.file.buffer);
    }

    static putBanner(req, res, next) {
        const { title, status, imageUrl } = req.body
        Banner.update({
            title, status, imageUrl, UserId : req.user.id
        }, {
            where: {
                id: +req.params.id
            }
        })
            .then(banner => {
                res.status(201).json({ message: "data updated" })
            })
            .catch(err => {
                next(err)
            })
    }

    static deleteBanner(req, res, next) {
        Banner.destroy({
            where: {
                id: +req.params.id
            }
        })
            .then(banner => {
                res.status(200).json({ message: "data deleted" })
            })
            .catch(err => {
                next({name: "resourceNotFound"})
            })
    }
}

module.exports = Controller