const {User} = require('../models/index')
const {compare} = require('../helpers/bcrypt')
const {genToken} = require('../helpers/jwt')

class Controller{
    static login (req, res, next){
        let obj = {
            email: req.body.email,
            password: req.body.password
        }
        if(!obj.email && !obj.password){
            //console.log(`masukkk sini`)
            next({name: `allRequired`})
        }
        User.findOne({where: {email: obj.email}})
        .then(data =>{
            if(!data){
                next({name: `notFoundEmail`})
            }else {
                let match = compare(obj.password, data.password)

                if(match){
                    let payload = {
                        id: data.id,
                        email: data.email
                    }
                    let access_token = genToken(payload)
                    return res.status(200).json({
                        access_token
                    })
                }else {
                    next({name : `notFoundPassword`})
                }
            }
        })
        .catch(err =>{
            next(err)
        })
    }
}

module.exports = Controller