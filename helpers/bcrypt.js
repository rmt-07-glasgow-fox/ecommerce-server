const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)

module.exports = {
    hash : (password)=>{
        return bcrypt.hashSync(password,salt)
    },
    compare : (password,hashed)=>{
        return bcrypt.compareSync(password,hashed)
    }
}