const express = require('express')
const cors = require('cors')
const routes = require('./routes')
const { errorHandler } = require('./middlewares/error_handler')
const port = process.env.PORT || 3000

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', routes)
app.use(errorHandler)


app.listen(port, () => {
    console.log(`app running on ${port}`)
})

module.exports = app
