function errHandling(err, req, res, next){
    if(err){
        if(err.name === 'SequelizeValidationError'){
            let errors = err.errors.map(error => error.message)
            res.status(400).json({errors})
            //console.log(err)
        }else if(err.name === 'allRequired'){
            let obj = { errors : [`Email is required`,`Password is required`] }
            res.status(400).json(obj)
        }else if(err.name === 'notFoundEmail'){
            let obj = {
                errors : [`email/password is wrong`]
            }
            res.status(400).json(obj)
        }else if(err.name === 'notFoundPassword'){
            let obj = {
                errors : [`email/password is wrong`]
            }
            res.status(400).json(obj)
        } else if(err.name === `notFound`){
            let obj = {
                errors : [`resource not found`]
            }
            res.status(404).json(obj)
        } else if(err.name === `accessDenied`){
            let obj ={
                errors : ['no access for this action']
            }
            res.status(401).json(obj)
        } else if(err.name === `JsonWebTokenError`){
            let obj ={
                errors : ['jwt is not provided']
            }
            res.status(401).json(obj)
        } else if(err.name === `quantityBadRequest`){
            let obj ={
                errors : ['Quantity should lower than stock']
            }
            res.status(400).json(obj)
        } else if(err.name === `quantityBad`){
            let obj ={
                errors : ['Quantity minimum is 1']
            }
            res.status(400).json(obj)
        } else {
            res.status(500).json({msg: `error from the server`})
        }
    }
}

module.exports = errHandling