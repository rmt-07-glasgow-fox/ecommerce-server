let errorHandlers = (err, req, res, next) => {
  let errors;
  if (err) {
    switch (err.name) {
      case "SequelizeValidationError":
        errors = err.errors.map(error => error.message);
        res.status(400).json({ errors });
        break;
      case "SequelizeForeignKeyConstraintError":
        res.status(400).json({ errors: ['Please insert you category!'] });
        break;
      case "notEnoughStock":
        res.status(400).json({ errors: ['Maximum stock exceeded!'] });
        break;
      case "invalidLogin":
        res.status(401).json({ errors: 'Your Email or Password is invalid' });
        break;
      case "JsonWebTokenError":
        res.status(401).json({ errors: 'Please login first!' });
        break;
      case "unauthenticate":
        res.status(401).json({ errors: 'Please login first!' });
        break;
      case "unauthorize":
        res.status(401).json({ errors: 'You don\'t have authorization to do this task.' });
        break;
      case "unauthorizeAdmin":
        res.status(401).json({ errors: 'Staff only, keep out!' });
        break;
      case "isAdmin":
        res.status(401).json({ errors: 'Admin account cannot login from here!' });
        break;
      case "notFound":
        res.status(404).json({ errors: 'Your request is not found.' });
        break;
      case "productNotFound":
        res.status(404).json({ errors: 'Product is not found.' });
        break;
      case "categoryNotFound":
        res.status(404).json({ errors: 'Category is not found.' });
        break;
      case "bannerNotFound":
        res.status(404).json({ errors: 'Banner is not found.' });
        break;
      case "cartNotFound":
        res.status(404).json({ errors: 'Your product in cart is not found.' });
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