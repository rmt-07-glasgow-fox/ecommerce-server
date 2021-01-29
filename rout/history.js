const routs = require('express').Router()
const history = require('../controllers/history')

routs.get('/history',history.findAll)

module.exports = routs