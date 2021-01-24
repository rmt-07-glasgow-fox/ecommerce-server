// require

// const { urlencoded, json } = require('body-parser')
// const { resolve } = require('path')
// const { uploader, cloudinaryConfig } = require('./config/cloudinaryConfig')
// const { multerUploads, dataUri } = require('./middlewares/multer')

const express = require('express')
const app = express()
const port = 7500
const userRoute = require('./routes/user-route')
const materialRoute = require('./routes/material-route')
const bannerRoute = require('./routes/banner-route')
const { errorHandle } = require('./middlewares/error-handling')
const cors = require('cors')

// setting
// app.use(express.static(resolve(__dirname, 'src/public')))
// app.use('*', cloudinaryConfig)
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// routing
// app.get('/*', (req, res) => res.sendFile(resolve(__dirname, '../public/index.html')));
// app.post('/upload', multerUploads, (req, res) => {
//     if (req.file) {
//         const file = dataUri(req).content;
//         return uploader.upload(file).then((result) => {
//             const image = result.url;
//             return res.status(200).json({
//                 messge: 'Your image has been uploded successfully to cloudinary',
//                 data: {
//                     image
//                 }
//             })
//         }).catch((err) => res.status(400).json({
//             messge: 'someting went wrong while processing your request',
//             data: {
//                 err
//             }
//         }))
//     }
// })
app.use(userRoute)
app.use(materialRoute)
app.use(bannerRoute)
app.use(errorHandle)

module.exports = app