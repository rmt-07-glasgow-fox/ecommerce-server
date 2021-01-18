function errorHandler(err, req, res, next) {
  switch (err.name) {
    case "SequelizeValidationError":
      res.status(400).json(err);
      break;

    case "SequelizeUniqueConstraintError":
      res.status(400).json(err);
      break;

    case "NoEmail":
      res.status(400).json({
        errors: ["Email is required"],
      });
      break;

    case "NoPassword":
      res.status(400).json({
        errors: ["Password is required"],
      });
      break;

    case "InvalidCredentials":
      res.status(400).json({
        errors: ["Invalid email/password"],
      });
      break;

    default:
      res.status(500).json(err);
      break;
  }
}

module.exports = errorHandler;
