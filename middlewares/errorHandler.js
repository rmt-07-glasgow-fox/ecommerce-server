const errorHandler = (err, req, res, next) => {
  if (err) {
    switch (err.name) {
      case 'SequelizeValidationError':
        const outputErr = []
        err.errors.forEach(errors => {
          outputErr.push(errors.message)
        })

        res.status(400).json({
          message: outputErr.join(', ')
        })
        break;
    
      default:
        res.status(500).json({
          message: 'Internal server error'
        })
        break;
    }
  }
}

module.exports = errorHandler