module.exports = (err, req, res, next) => {
  if (err) {
    console.log(err);
    switch (err.name) {
      case `SequelizeValidationError`:
        res.status(400).json({ errors: err.errors.map((err) => err.message) });
        break;

      case `SequelizeUniqueConstraintError`:
        res.status(400).json({ errors: err.errors.map((err) => err.message) });
        break;

      case `SequelizeDatabaseError`:
        res.status(400).json({err});
        break;

      case `EmailDoesNotExist`:
        res.status(400).json({ errors: ["Email does not exist"] });
        break;

      case `EmailIsEmpty`:
        res.status(400).json({ errors: ["Email is required"] });
        break;

      case `PasswordIsEmpty`:
        res.status(400).json({ errors: ["Password is required"] });
        break;

      case `EmailPasswordIsEmpty`:
        res.status(400).json({ errors: ["Email and Password is required"] });
        break;

      case `WrongPassword`:
        res.status(400).json({ errors: ["Wrong password"] });
        break;

      case `Unauthorized`:
        res.status(403).json({ errors: ["Unauthorized"] });
        break;

      case `Authentificate`:
        res.status(401).json({ errors: ["Login first"] });
        break;

      case `NotFound`:
        res.status(404).json({ errors: [`${err.item} Not Found`] });
        break;

      default:
        break;
    }
  }
};
