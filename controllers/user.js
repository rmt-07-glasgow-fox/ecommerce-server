const {User} = require('../models/index')
const {compare} = require('../helper/bcrypt')
const {generateToken} = require('../helper/jwt')

class UserCon{
    static register(req,res,next){
        User.create(req.body)
        .then(data=>{
            res.status(201).json({
                id:data.id,
                firstname:data.firstname,
                lastname:data.lastname,
                email:data.email,
                role: data.role
            })
        })
        .catch(err=>{
            next(err)
        })
    }

    static login(req,res,next){
        let password = req.body.password
        let email = req.body.email

        if (email == '') {
            next({name:'emptyEmail'})
        } 
        if(password == ''){
            next({name:'emptyPassword'})
        }
        console.log(email+' '+password);
        
        User.findOne({where:{email}})
        .then(data=>{
            if (data) {
                let hash = data.password
                if (compare(password,hash)) {
                    let user = {
                        id:data.id,email:data.email
                    }
                    let accesstoken = generateToken(user)
                    res.status(200).json({accesstoken})
                } else {
                    next({name:'invalidLogin'})
                }
            }else{
                next({name:'invalidLogin'})
            }
        })
        .catch(err=>{
            next(err)
        })
    }
}

module.exports = UserCon