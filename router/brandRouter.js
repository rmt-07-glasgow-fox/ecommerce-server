const router = require('express').Router()

// import
const BrandController = require('../controllers/brandController')
const { authorizeAdminOnly } = require('../middleware/auth')

router.get('/', BrandController.showAllBrand)
router.post('/', authorizeAdminOnly, BrandController.addBrand)

module.exports = router