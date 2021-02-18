const { Content, Cart } = require('../models')
const {format} = require('util');
const gc = require('../config/')
const bucket = gc.bucket('gardara_ecommerce')
const {Storage} = require('@google-cloud/storage');

class Controller {
    static getContent(req, res, next) {
        console.log('masuk getcontent')
        Content.findAll({
            order: [['name','ASC']]
        })
            .then(contents => {
                res.status(200).json(contents)
            })
            .catch(err => {
                next(err)
            })
    }

    static getOneContent(req, res, next) {
        Content.findOne({
            where: {
                id: +req.params.id
            }
        })
        .then(content => {
            res.status(200).json(content)
        })
        .catch(err => {
            next(err)
        })
    }

    static postContent(req, res, next) {
        console.log('masuk postContent')
        let temp = {}
        const { name, description, category, price, stock, tags, imageUrl} = req.body
        Content.create({
            name, description, category, price, stock, tags, imageUrl
        })
            .then(content => {
                console.log(content, "berhasil content create")
                temp = content
                Cart.create({
                    UserId: req.user.id,
                    ContentId: content.id
                })
            })
            .then(result => {
                res.status(201).json(temp)
            })
            .catch(err => {
                console.log(err.stack, 'GAGALLLL')
                next(err)
            })
    }

    static postContentImage(req, res, next) {
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
            console.log('image BERESS')
            res.status(200).json({ imageUrl: publicUrl })
          });
        
          blobStream.end(req.file.buffer);
    }

    static putContent(req, res, next) {
        const { name, description, category, price, stock, tags, imageUrl } = req.body
        Content.update({
            name, description, category, price, stock, tags, imageUrl
        }, {
            where: {
                id: +req.params.id
            }
        })
            .then(contents => {
                res.status(201).json({ message: "data updated" })
            })
            .catch(err => {
                next(err)
            })
    }

    static deleteContent(req, res, next) {
        Cart.destroy({
            where: {
                ContentId: +req.params.id
            }
        })
            .then(content => {
                Content.destroy({
                    where: {
                        id: +req.params.id
                    }
                })
            })
            .then(result => {
                res.status(200).json({ message: "data deleted" })
            })
            .catch(err => {
                next({name: "resourceNotFound"})
            })
    }
}

module.exports = Controller