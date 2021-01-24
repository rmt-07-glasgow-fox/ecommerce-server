const { User, Product } = require ('../../models/index')
const { checkPassword } =  require ('../../helpers/bcrypt')
const { generateToken } = require ('../../helpers/jwt')

function clearProducts () {
  if (process.env.NODE_ENV === 'test') {
    return Product.destroy({where: {} })
  }
}

function createDummy () {
  if (process.env.NODE_ENV === 'test') {
    const obj = {
      id: 777,
      name: 'test dummy name',
      image_url: 'test dummy url',
      price: 7777.77,
      stock: 777
    }

    return Product.findOrCreate ({
      where: {
        id: 777
      },
      default: obj
    })
    
  }
}

async function login (email, password) {
  if (process.env.NODE_ENV === 'test') {
    try {
      let data = await User.findOne ({
        where: {
          email
        }
      })
      if (!data) {
        return ({message: 'Invalid email / password'})
      } else {
        let checked = checkPassword (password, data.password)
        if (!checked) {
          return ({message: 'Invalid email / password'})
        } else {
          const payload = {
            id: data.id,
            email: data.email,
            role: data.role
          }
          const access_token = generateToken (payload)
          return access_token
        }
      }
    } catch (err) {
      return (err, 'error login helper')
    }
  }
}

// if (process.env.NODE_ENV === 'test') {
// login ()
//   .then (data => {
//     console.log (data)
//   })

// }
module.exports = {
  clearProducts,
  createDummy,
  login
}