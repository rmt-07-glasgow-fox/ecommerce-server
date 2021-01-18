const errorHandlers = ((err, req, res, next) => {
  if(err) {
    switch (err.name) {
      case 'len':
        res.status(400).json({ message: "Password at least 6 characters", errorMessage: err.message})
        break;
    
      default:
        res.status(500).json({message: "Internal Server Error"})
        break;
    }
  }
}) 

module.exports = errorHandlers