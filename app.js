if(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'){
    require('dotenv').config()
  }

const express = require('express')
// const cors = require('cors')
const app = express()
const user = require('./routers/user')
const product = require('./routers/product')
const { authenticate } = require('./middleware/auth')
const errorHandler = require('./middleware/errorhandler')
const port  = 3000

app.use(express.urlencoded({ extended:true }))
app.use(express.json())
// app.use(cors())

app.get('/', (req, res) => {
    res.send('hello app')
})
app.use(user)
app.use(authenticate)
app.use(product)
app.use(errorHandler)
// app.listen(port, () => {
//   console.log('connected')
// })

module.exports = app