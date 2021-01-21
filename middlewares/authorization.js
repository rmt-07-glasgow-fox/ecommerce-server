const { User } = require('../models/index')

async function authorization(req, res, next) {
    console.log(req.loggedInUser);
    const { id } = req.loggedInUser
    console.log(id);
    try {
        console.log(id);
      let user = await User.findOne({
          where:{
            id
          }
      })
      console.log(user);
      if (user.email === "admin@mail.com"){
        next()
      }
      else {
        throw { name : "Unauthorized" , msg : "Not Authorize to do that", status : 401}
      }
    } catch (error) {
      next(error)
    }
}
module.exports= authorization