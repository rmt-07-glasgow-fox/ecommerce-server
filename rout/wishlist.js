const routs = require('express').Router({ mergeParams: true })
const wishlist = require('../controllers/wishlist')

routs.post('/wishlist', wishlist.add)
routs.delete('/wishlist', wishlist.delete)
routs.get('/wishlist', wishlist.findAll)

module.exports = routs 