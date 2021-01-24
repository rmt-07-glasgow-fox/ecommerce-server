const env = process.env.NODE_ENV || 'development'
const uppercasedEnv = env.toUpperCase()

if (env == 'development' || env == 'test') {
  require('dotenv').config()
}

const username = process.env['DB_USERNAME_' + uppercasedEnv]
const password = process.env['DB_PASSWORD_' + uppercasedEnv]
const database = process.env['DB_NAME_' + uppercasedEnv]
const host = process.env['DB_HOST_' + uppercasedEnv]
const dialect = process.env['DB_DIALECT_' + uppercasedEnv]

module.exports = {
  development: {
    username,
    password,
    database,
    host,
    dialect,
  },
  test: {
    username,
    password,
    database,
    host,
    dialect,
  },
  production: {
    DATABASE_URL: 'postgres://zzmfdrrskqclxu:0bb71a8d793fe60e0a1b14cb516a1e402edf1d837805a8bf59939dc1015da93b@ec2-54-236-122-55.compute-1.amazonaws.com:5432/da6ae8eiclbm01'
  }
}
