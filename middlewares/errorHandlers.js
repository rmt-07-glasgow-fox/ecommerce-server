const errorHandlers = (err, req, res, next) => {
  let statusCode = 500
  let message = 'Internal Server Error!'
  switch (err.name) {
      case 'SequelizeValidationError':
          let errMsg = err.errors.map(err => err.message)
          statusCode = 400
          message = errMsg
          break;
      case 'SequelizeDatabaseError':
          statusCode = 400
          message = err.message
          break;
      case 'SequelizeUniqueConstraintError':
          statusCode = 400
          message = `${err.errors[0].value} already exists`
          break;
      case 'SequelizeForeignKeyConstraintError':
          statusCode = 400
          message = `Failed! Foreign key not exist`
          break;
      case 'NotFoundError':
          statusCode = 404
          message = 'Product Not Found'
          break;
      case 'ForbiddenError':
          statusCode = 403
          message = 'You dont have access!'
          break;
      case 'UnauthorizedError':
          statusCode = 401
          message = 'Please, login first!'
          break;
      case 'CustomError':
          statusCode = err.statusCode
          message = err.message
          break
      default:
          let errMsgs = err.errors && err.errors.map(err => err.message) || 'Something is wrong!'
          err.errors && (statusCode = 400, message = errMsgs) //other error
          break;
  }

  statusCode === 500 && console.log(err.stack)
  res.status(statusCode).json({ message })
}

module.exports = { errorHandlers }