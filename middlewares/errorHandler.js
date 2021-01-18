module.exports = (err, req, res, next) => {
    if(err.status){
        const message = {
            message: err.message
        }
        res.status(err.status).json(message)
    } else if (err.name == "SequelizeValidationError") {
        const dataError = []
        for (let i = 0 ; i < err.errors.length; i++){
            dataError.push(err.errors[i].message)
        }
        res.status(400).json({message: dataError})
    } else if (err.name == "SequelizeUniqueConstraintError") {
        res.status(400).json({message: 'email already registered'})
    } else {
        res.status(500).json({message: 'internal server error'})
    }
}
