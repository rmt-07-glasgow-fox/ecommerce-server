module.exports = {
    errHandler : (err,req,res,next)=>{

        console.log(err.name,'>>>>>>');
        console.log(err);

        let StatusCode = 500
        let message = 'Internal Server Error'

        switch (err.name) {
            case 'SequelizeValidationError':
                statusCode = 400
                message = err.errors[0].message
                break;
            case 'SequelizeDatabaseError':
                if(err.parent.code === '23502'){
                    statusCode = 400
                    message = err.errors[0].message
                }            
                break;
            case "SequelizeUniqueConstraintError":
                statusCode = 400
                message = `${err.errors[0].value} sudah ada`
                break;
            case 'SequelizeForeignKeyConstraintError': 
                statusCode = 400
                message = `ForeignKey error!` 
                break;
            case 'BadRequest':
                statusCode = 400
                message = err.message
            case 'NotFound':
                statusCode = 404
                message = err.message
                break;
            case 'Forbidden':
                statusCode = 403
                message = err.message
                break
            case 'Unauthorized':
                statusCode = 401
                message = err.message
                break
            case 'JsonWebTokenError':
                statusCode = 401
                message = err.message
                break
        }
        res.status(StatusCode).json({message})
    }
}