const { Banner } = require('../models')

module.exports = async (req, res, next) => {
  const id = req.params.id

  try {
      const product = await Banner.findOne({
          where: {
              id
          }
      })

      if (!product) {
          throw {
              status: 404,
              message: `Error Not Found`
          }
      } else {
          next()
      }
  } catch (error) {
      next(error)
  }
}