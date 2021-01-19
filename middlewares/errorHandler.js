function errorHandler(err, req, res, next) {
  if(err) {
    const errMessages = {
      errors: []
    }
    switch (err.name) {
      case 'SequelizeUniqueConstraintError':
        err.errors.forEach(el => {
          errMessages.errors.push(el.message)
        })
        res.status(400).json(errMessages)
        break
      case 'SequelizeValidationError':
        err.errors.forEach(el => {
          errMessages.errors.push(el.message)
        })
        res.status(400).json(errMessages)
        console.log(errMessages)
        break
      case 'invalidEmailPassword':
        errMessages.errors.push('Invalid email or password')
        res.status(401).json(errMessages)
        break
      case 'needAccess':
        errMessages.errors.push('You dont have access')
        res.status(401).json(errMessages)
        break
      case 'needLogin':
        errMessages.errors.push('Please login first')
        res.status(401).json(errMessages)
        break
      case 'notFound':
        errMessages.errors.push('Error data not found')
        res.status(404).json(errMessages)
        break
      default:
        errMessages.errors.push('Internal Server Error')
        res.status(500).json(errMessages)
        break
    }
  }
}

module.exports = errorHandler