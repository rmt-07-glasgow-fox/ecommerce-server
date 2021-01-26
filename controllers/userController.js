const {User} = require('../models')
const checkPassword = require('../helper/checkPassword')
const generateToken = require('../helper/generateToken')

class controller {
  static login(req, res, next){
    let body = req.body
    let dataUser = {
      email: body.email,
      password: body.password
    }
    User.findOne({where:{email: dataUser.email}})
    .then(data=>{
      if(!data){
        next({name: 'Email/password incorrect'})
      }else{
        let match = checkPassword(dataUser.password, data.password)
        if(!match){
          next({name: "Email/password incorrect"})
        }else{
          let payload = {id: data.id, email: data.email, username: data.username}
          let access_token =  generateToken(payload)
          res.status(200).json({
            id: data.id,
            email: data.email,
            username: data.username,
            access_token
          })
        }
      }
    })
    .catch(err=>{
      console.log(err)
      next(err)
    })
  }
}

module.exports = controller