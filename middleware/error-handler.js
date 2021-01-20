
function errorHandler(err, req, res, next){
      if (err){
            switch(err.name){
                  case 'SequelizeValidationErrors':

                        res.status(400).json(err)
                        break
                  case 'SourceNotFound':
                        res.status(404).json({message: "Not found"})
                        break
                  case 'JsonWebTokenError':
                        res.status(401).json({message: "you have no permission"})
                        break
                  case 'Unauthorize':
                        res.status(401).json({message: "you have no permission"})
                        break
                  default:
                        res.status(500).json({message: "broken inside"})

            }
      }
}

module.exports = errorHandler