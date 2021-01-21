module.exports = function (err, req, res, next){
    console.log(err);
    let status = err.status || 500
    let msg = err.msg || 'Internal Server Error'
    console.log('masuk error handler');
    if (err.name === 'SequelizeValidationError'){
        let errors = []
        err.errors.forEach(el => {
            if(el.message == "Validation isNumeric on stock failed"){
                errors.push('Please input numeric data')
            }else{
                errors.push(el.message)
            }       
        });
        status = 400
        msg = errors
    }else if (err.name ==='SequelizeUniqueConstraintError'){
        let errors = []
        err.errors.forEach(el =>{
            if(el.message == 'email must be unique'){
                errors.push('Email already exists')
            }
        })
        status = 400
        msg = errors
    }else if(err.name ==='Unauthorized'){
        msg = err.msg
        status = 401
    }else if(err.name ==='Authentication Failed'){
        msg = err.msg
        status = 401
    }else if(err.msg ==='Content Not Found'){
        msg = 'Not Found'
        status = 404
    }else if(err.msg ==='Product Not Found'){
        msg = err.msg
        status = 404
    }else if(err.msg =='Validation isNumeric on stock failed'){
        msg = 'Please input numeric data'
    }
    res.status(status).json({
        msg
    })
}