const express = require('express');
const app = express()

const routers = require('./routes')

app.use(express.urlencoded({ extended:false }))
app.use(express.json())

app.use(routers)

app.use((err, req, res, next) => {
    const errors = err.errors.map(error => error.message)
    res.status(400).json({
        errors
    });
})

module.exports = app