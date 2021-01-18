function errorHandler (err, req, res, next) {
    if(err) {
        switch(err.name) {
            case 'Invalid Input':
                res.status(400).json({ message: 'Invalid Email/Password'})
                break;
        }
    }
}

module.exports = {
    errorHandler
}