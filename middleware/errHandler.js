function errHandler (err, req, res, next) {
    if(err) {
        let errMsg
        switch (err.name) {
            case 'SequelizeValidationError':
                errMsg = err.errors.map(el => {
                    return { message : el.message }
                })
                res.status(400).json(errMsg)
                break

            case "SequelizeConstraintError":
                errMsg = err.errors.map(el => {
                    return { message : el.message }
                })
                res.status(400).json(errMsg)
                break

            case "SequelizeUniqueConstraintError":
                errMsg = err.errors.map(el => {
                    return { message : el.message }
                })
                res.status(400).json(errMsg)
                break
        
            case "notFound":
                errMsg = { message  : "Error Not found" }
                res.status(404).json(errMsg)
                break
        
            case "authError":
                errMsg = { message : "Invalid email / password" }
                res.status(401).json(errMsg)
                break

            case 'JsonWebTokenError':
                errMsg = {
                    err : 'json Web Token error',
                    message  : 'Please login first'}
                res.status(401).json(errMsg)
                break

            default:
                errMsg = { message : "Error in internal server"}
                res.status(500).json(errMsg)
                break
        }
    }
}

module.exports = errHandler