const { readToken } = require('../helpers/token')
const { User, Product, Brand } = require('../models')

async function authenticate(req, res, next) {
    try {
        // check token
        let { access_token } = req.headers
        if (!access_token) { return next({ name: 401, message: 'access_token is required' }) }

        // read token
        let decodedToken = readToken(access_token)
        // console.log('>>> decodedToken : ', decodedToken)

        // check user
        let user = await User.findByPk(decodedToken.id)
        if (!user) { return next({ name: 404, message: 'User not found' }) }

        // add req.user = email, id, role
        req.user = {
            id: decodedToken.id,
            email: decodedToken.email,
            role: decodedToken.role
        }
        // console.log('Authentic req.user : ', req.user)

        next()

    } catch (err) {
        return next(err)
    }
}

async function authorizeAdminOnly(req, res, next) {
    try {
        // console.log(req.user)

        if (req.user.role !== 'admin') {
            console.log('you are not admin')
            return next({ name: 401, message: 'Admin only' })
        }

        if (req.user.role === 'admin') {
            console.log('>>> you are admin')
            return next()
        }
    } catch (err) {
        next(err)
    }
}

async function checkBrandId(req, res, next) {
    try {
        console.log('BrandId', req.body.BrandId)
        let IDBrand = +req.body.BrandId

        if (!IDBrand) { return next({ name: 400, message: 'BrandId should be integer' }) }

        let brand = await Brand.findByPk(IDBrand)
        console.log('>>> brand ', brand)
        if (!brand) {
            return next({ name: 404, message: 'BrandId not found' })
        }

        if (brand) {
            console.log('>>> brand is avail : ', IDBrand)
            return next()
        }

    } catch (err) {
        return next(err)
    }
}

async function checkProductId(req, res, next) {
    try {
        let IDproduct = +req.params.idProduct

        // check product
        let product = await Product.findByPk(IDproduct)

        if (!product) {
            return next({ name: 404, message: 'Product not found' })
        }

        if (product) {
            req.product = product
            console.log('>>> product is avail', product)
            return next()
        }

    } catch (err) {
        return next(err)
    }
}

module.exports = {
    authenticate, authorizeAdminOnly, checkBrandId, checkProductId
}