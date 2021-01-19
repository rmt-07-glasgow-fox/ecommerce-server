const express = require('express')
const app = express()
const routes = require('./routes')

app.use(express.urlencoded({extended : false}))
app.use(express.json())

app.use(routes)
app.use(function(err, req, res, next){
    if(err.errors){
        const errors = err.errors.map(error => error.message)
        res.status(400).json({
            errors
        })
    } else if(err.name === "Incorrect Email / Password"){
        res.status(401).json({message : "Incorrect Email / Password"})
    } else if(err.name === "Do not have access"){
        res.status(401).json({message : "Do not have access"})
    } else if(err.name === "Login Required"){
        res.status(403).json({message : "Login Required"})
    } else if(err.name === "Not found"){
        res.status(404).json({message : "Not found"})
    } else {
        res.status(500).json({message : "Internal Server Error"})
    }
})

module.exports = app