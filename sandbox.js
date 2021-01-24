let jwt = require('jsonwebtoken');
const SECRET_KEY = "phitonthel"

function generateToken(payload) {
  let token = jwt.sign(payload, SECRET_KEY);
  return token
}

function checkToken(token) {
  let decoded = jwt.verify(token, SECRET_KEY);
  return decoded
}

let admin = {
  id: 10,
  email: "admin@mail.com",
  role: "admin"
}
let customer = {
  id: 20,
  email: "customer@mail.com",
  role: "customer"
}
let adminToken, customerToken, ProductId

adminToken = generateToken(admin)
customerToken = generateToken(customer)

console.log(adminToken);
console.log(customerToken);