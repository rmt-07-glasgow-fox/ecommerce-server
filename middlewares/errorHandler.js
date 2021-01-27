function errorHandler (err, req, res, next) {
    if(err) {
        // console.log(err)
        switch(err.name) {
            case 'Invalid Input':
                res.status(400).json({ message: 'Invalid Email/Password'})
                break;
            case 'Not Admin':
                res.status(401).json({ message: "Unauthorized"})
                break;
            case 'SequelizeUniqueConstraintError':
                res.status(400).json({ message: err.errors[0].message })
                break;
            case 'SequelizeValidationError': 
                let errors = []
                for (let i = 0; i < err.errors.length; i++) {
                    errors.push(err.errors[i].message)
                }
                res.status(400).json({ message: errors})
                break;
            case 'Not Found': 
                res.status(404).json({ message: 'Not Found'})
                break;
            case 'JsonWebTokenError':
                res.status(401).json({ message: 'You need to login first'})
                break;
            case 'Unauthorized':
                res.status(401).json({ message: "Unauthorized"})
                break;
        }
    }
}

module.exports = {
    errorHandler
}