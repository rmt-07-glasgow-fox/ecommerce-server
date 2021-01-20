const errorHandler = (err, req, res, next) => {
  if (err) {
    let errors = []

    switch (err.name) {
      case 'AuthError':
        errors.push('Wrong email / password')
        res.status(401).json({ errors })
        break
      case 'BadRequest':
        errors.push('Email / password must be filled')
        res.status(400).json({ errors })
        break
      case 'ResourceNotFound':
        errors.push('Not found')
        res.status(404).json({ errors })
        break
      case 'NoCredentials':
        errors.push('Not authorised')
        res.status(401).json({ errors })
        break
      default:
        errors = err.errors.map(error => error.message)
        res.status(400).json({
          errors
        })
        break
    }
  }
}

module.exports = errorHandler
