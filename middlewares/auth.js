const { checkToken } = require ('../helpers/jwt')
const { User, Product } = require ('../models/index')

async function authenticate (req, res, next) {
  try {
    let decoded = checkToken (req.headers.access_token)

    let data = await User.findOne ({
      where: {
        email: decoded.email
      }
    })
    if (!data) {
      res.status (403).json ({message: 'Please login first'})
    } else if (data.role !== 'admin') {
      next ({name: 'Unauthorized access'})
    } else {
      req.user = data.id
      next ()
    }
  } catch (err) {
    next (err)
  }
}

async function authorize (req, res, next) {
  try {
    const targetId = +req.params.id
    let data = await Product.findByPk (targetId)
    if (data.UserId !== req.user) {
      res.status (401).json ({message: 'Unauthorized'})
    } else if (req.user === 1 || data.UserId === req.user) {
      next()
    }
  } catch (err) {
    next (err)
  }
}

module.exports = {
  authenticate,
  authorize
}