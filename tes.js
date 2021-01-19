const { hashPassword, checkPass } = require('./helper/bcrypt')
const { generateToken, verifyJWT } = require('./helper/jwt')

const data = {
    email: 'asdkjabsfa',
    password: '123456'
}
var hashPassword123 = hashPassword(data.password)


var result = checkPass(data.password, '$2b$10$dHifCjP5TLAKGS7vogHG3eOCj7i2jgIYRqhpW4P77FieuOJN9XnzG')
const tes = generateToken(data)

// console.log(process.env.SECRET_JWT)
console.log(verifyJWT(tes).email)
// console.log(hashPassword123)
// console.log(result)