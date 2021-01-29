const express = require ('express')
const app = express ()
const router = require ('./routes/indexRouter')
const errorHandlers = require ('./middlewares/errorHandlers')

app.use (express.urlencoded ({extended: false}))

app.use (express.json ())

app.use ('/', router)

app.use (errorHandlers)


module.exports = app