if (process.env.NODE_ENV === 'development'){
  require('dotenv').config()
}
const express = require('express')
const app = express()
const routes = require('./routes/index')
const PORT = process.env.PORT || 3000
const { errorHandlers } = require('./middlewares/errorHandler')
const cors = require('cors')
const bodyParser = require('body-parser');

app.use(cors())

app.use(express.urlencoded({ extended: true }))

app.use(bodyParser.json());

app.use(express.json())

app.use(routes)

app.use(errorHandlers)

app.listen(PORT, () => {
    console.log(`Connected on Port ${PORT}`)
})

module.exports = app