const express = require("express")
const app = express()

const routes = require("./routes")

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(routes)

app.use((err, req, res, next) => {
    if (err.name == "SequelizeValidationError") {

        const errors = err.errors.map(err => err.message)
        res.status(400).json({ errors })
    } else{
        res.status(err.code).json({message: err.message})
    }
})

module.exports = app