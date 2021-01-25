const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const routes = require('./routes')
const cors = require('cors')

const app = express()

const port = process.env.PORT || 3005

app.use(cors())

app.use(express.json())

app.use(express.urlencoded({
    extended: true
}))

app.use(routes)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

module.exports = app