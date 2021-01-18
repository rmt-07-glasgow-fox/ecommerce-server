const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

// middlewares
app.use(express.static('assets'))
app.use('/', (req, res) => { res.send('Welcome to ecommerce server') })

app.listen(PORT, () => { console.log(`>>> SERVER RUNNING AT ${PORT}`) })