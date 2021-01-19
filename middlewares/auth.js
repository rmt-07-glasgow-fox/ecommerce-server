const { checkToken } = require('../helpers/jwt')
const { user } = require('../models')

class Auth {
    static authentication (req, res, next) {
        try {
            let decoded = checkToken(req.headers.access_token)
            // console.log( decoded);
            user.findOne({where: {
                email: decoded.email
            }})
            .then( data => {
                if(!data) {
                    res.status(401).json({message: 'Please Login First'})
                } else {
                    req.user = data
                    next()
                }
            })
            .catch( err => {
                res.status(500).json({message: err.message})
            })
        } 
        catch (err) { 
            res.status(500).json({message: err.message})
        }
    }

    static authorization (req, res, next) {
        const id = +req.params.id
        const userId = +req.user.id

        task.findByPk(id)
        .then(data => {
            if(!data){
                res.status(404).json({msg : 'Task Not Found'})
            } else if(userId !== data.UserId){
                res.status(403).json({msg : `You don't have access`})
            } else {
                next()
            }
        })
        .catch(err => {
            res.status(500).json({msg : err.message})
        })
    }
}

module.exports = Auth