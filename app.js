const express = require("express")
const router = require("./routers")
const errorHandler = require("./middlewares/error")
const app = express()

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use("/", router)
app.use(errorHandler)

module.exports = app