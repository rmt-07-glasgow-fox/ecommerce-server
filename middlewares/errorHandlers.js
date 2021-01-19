const errorHandlers = ((err, req, res, next) => {
  if(err) {
    switch (err.name) {
      case 'len':
        res.status(400).json({ message: "Password at least 6 characters", errorMessage: err.message})
        break;
      case 'isEmail': 
        res.status(400).json({message: 'Invalid Email / Password', errorMessage: err.message})
        break;
      case 'roleNotEmpty':
        res.status(400).json({message: 'Role is required', errorMessage: err.message})
        break
      case 'invalidEmailOrPassword': 
        res.status(400).json({message: 'Invalid Email or Password', errorMessage: err.message})
        break
      case 'name': 
        res.status(400).json({message: 'Name is required', errorMessage: err.message})
        break
      case 'price': 
        res.status(400).json({message: 'cannot be less than zero or a negative number', errorMessage: err.message})
        break
      case 'stock': 
        res.status(400).json({message: 'cannot be less than zero or a negative number', errorMessage: err.message})
        break
      default:
        res.status(500).json({message: "Internal Server Error"})
        break;
    }
  }
}) 

module.exports = errorHandlers