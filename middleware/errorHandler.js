module.exports = (err, req, res, next) => {
  if (err.status) {
    return res.status(err.status).json({message: err.message})
  } else if (err.name === `SequelizeValidationError`) {
    return res.status(400).json({message: err.errors[0].message})
  } else { 
    // const errors = err.errors.map((error) => error.message)
    // return res.status(400).json({errors})
  }
}