const { request } = require("express");

const app = require('../app')
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Currently listening to post ${PORT}`)
})