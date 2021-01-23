function errorHandler (err, req, res, next) {
    let status = 500;
	let message = 'Internal Server Error';
	// console.log(err);
	// console.log(err.name);

	if (err.name === 'SequelizeValidationError') {
		status = 400;
		message = [];
		err.errors.forEach((el) => {
			message.push(el.message);
		});
	} else if (err.name === 'SequelizeUniqueConstraintError') {
		status = 400;
		message = 'This Email has been Taken, try another one';
	} else if (err.name === 'InvalidEmailOrPassword') {
		status = 401;
		message = 'Invalid email or password';
	} else if (err.name === 'NotAdmin') {
		status = 401;
		message = 'Only Admin Who Have Authorization for this Action';
	} else if (err.name === 'NotLoginYet') {
		status = 401;
		message = 'Please Login First';
	} else if (err.name === 'JsonWebTokenError') {
		status = 401;
		message = 'Invalid Email Or Password';
	} else if (err.name === 'EmailOrPasswordCannotBeNull') {
		status = 400;
		message = 'Email or Password is required';
	} else if (err.name === 'ProductNotFound') {
		status = 404;
		message = 'Product Not Found';
	} else if (err.name === 'StockCannotBeNull') {
		status = 400;
		message = 'Stock Cannot be Empty';
	} else if (err.name === 'StockCannotLessThanZero') {
		status = 400;
		message = 'Stock cannot Less Than Zero';
	} else if (err.name === 'PriceCannotLessThanZero') {
		status = 400;
		message = 'Price cannot Less Than Zero';
	}
	res.status(status).json({
		message: message,
	});
}

module.exports = {errorHandler}