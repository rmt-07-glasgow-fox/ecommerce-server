const errHandlers = (err, req, res, next) => {
    if(err) {
        switch (err.name) {
            case "SequelizeValidationError":
                const errors = err.errors.map(error => error.message)
                return res.status(400).json({errors});
             case "SequelizeUniqueConstraintError":
                 return res.status(400).json( {
                     message: err.message,
                     column: err.path
                 })
             case "unauthorized":
                 return res.status(401).json({
                    message: "You not Unauthorized"
                 });
             case "notLogin":
                 return res.status(401).json({
                     message: "You Must login First"
                 });
             case "wrongInput":
                 return res.status(401).json({
                     message: "Invalid Email / Password"
                 });
             case "resourceNotFound":
                 return res.status(404).json({
                     message: "Data Not Found"
                 });
             default:
                 return res.status(500).json({message: 'Your Internal Server Is not Connect / Error'})
        }
    }
}

module.exports = errHandlers