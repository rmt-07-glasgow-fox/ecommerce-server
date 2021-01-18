let errorHandlers = (err, req, res, next) => {
  let errors;
  if (err) {
    switch (err.name) {
      case "SequelizeValidationError":
        errors = err.errors.map(error => error.message);
        res.status(400).json({ errors });
        break;
      case "invalidLogin":
        res.status(401).json({ errors: 'Your Email or Password is invalid' });
        break;
      case "SequelizeUniqueConstraintError":
        errors = err.errors.map(error => error.message);
        res.status(409).json({ errors });
        break;
      default:
        res.status(500).json(err);
        break;
    };
  };
};

module.exports = errorHandlers;