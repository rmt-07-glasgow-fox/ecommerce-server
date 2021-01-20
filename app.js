const express = require("express")
const app = express()
const routes = require("./routes")

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(routes)

// app.use( function(err, req, res, next) {
//     console.log(err);
// })
module.exports = app
