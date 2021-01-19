function errorHandler(err, req, res, next) {
    if (err) {
        if (err.name === 'SequelizeValidationError'){
            let errorMessage = err.errors.map(err => err.message)
            return res.status(400).json({errors: errorMessage})
        } else if (err.name === 'undefined') {
            return res.status(404).json({msg: 'Data is undefined'})
        } else if (err.name === 'access_token') {
            return res.status(400).json({msg: 'Require access_token'})
        } else if (err.name === 'customer') {
            return res.status(403).json({msg: 'Admin only'})
        } else if (err.name === 'failLogin') {
            return res.status(400).json({msg: 'email or password is undefined'})
        }
    } else {
        res.status(500).json({
            msg: 'internal server error'
        })
    }
}

module.exports = errorHandler