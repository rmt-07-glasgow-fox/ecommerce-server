const { verifyToken } = require('../helper/jwt')

const { User, Product } = require('../models')

async function auth (req, res, next) {

    const { access_token } = req.headers

    try {

        if( !access_token ) {
            next({ name : 'authError'} ) 
        } else {
            const decoded = verifyToken(access_token)

            req.loginUser = decoded

            console.log(req.loginUser)

            const data = await User.findOne({ where :
                { id : decoded.id }
            })

            if(data) {
                // console.log(data)
                next()
            } else {
                next({name : 'authError'})
            }
        }

    } catch (err) {
        next(err)
    }
}

async function author (req, res, next) {

    let id = +req.params.id

    try {
        const prod = await Product.findByPk(id)

        if(prod) {
            if(prod.UserId == req.loginUser.id) {
                next()

            } else {
                next( { name : 'authError' })
            }
        } else {
            
            next({ name : 'notFound' })
        }

    } catch (err) {
        next(err)
    }
}

module.exports = {
    auth, author
}