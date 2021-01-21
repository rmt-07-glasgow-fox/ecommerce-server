errorHandler = (err,req,res,next) => {
  console.log(err);
  if(err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
    let errors = [];
    for (let i = 0; i < err.errors.length; i++) {
      errors.push(err.errors[i].message)
    }
    res.status(400).json({message: errors});
  }
  else if (err.status) res.status(err.status).json({message: err.message});
  else res.status(500).json({message: "internal server error"});
}

module.exports = errorHandler;