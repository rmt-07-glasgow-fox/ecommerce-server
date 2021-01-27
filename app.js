const express = require("express")
const app = express()
const router = require("./routers")
const cors = require("cors")
const errorHandler = require("./middlewares/errorHandler")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended:false }))

app.use(router)
app.use(errorHandler)


module.exports = app