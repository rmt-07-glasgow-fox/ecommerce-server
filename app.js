// if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
//   require('dotenv').config()
// }

const express = require('express')
const { errorHandlers } = require('./middlewares/errorHandlers')
const cors = require('cors')
const app = express()
// const PORT = 3000 || process.env.PORT
const router = require('./routes')

// load cors
app.use(cors())

// using body parser
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// load index routes
app.use(router)

// error handler middlerwares
app.use(errorHandlers)

// app.listen?
// app.listen(PORT, () => {
//   console.log('App running well on PORT', PORT);
// })

module.exports = app