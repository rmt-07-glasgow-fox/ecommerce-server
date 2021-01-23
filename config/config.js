const env = process.env.NODE_ENV || 'development'
const uppercaseEnv = env.toUpperCase()

if(env === 'development'|| env === 'test') require('dotenv').config()

const username = process.env['DB_USERNAME_' + uppercaseEnv]
const password = process.env['DB_PASSWORD_' + uppercaseEnv]
const database = process.env['DB_NAME_' + uppercaseEnv]
const host = process.env['DB_HOST_' + uppercaseEnv]
const dialect = process.env['DB_DIALECT_' + uppercaseEnv]

module.exports = {
  development: {
    username,
    password,
    database,
    host,
    dialect
  },
  test: {
    username,
    password,
    database,
    host,
    dialect
  },
  production: {
    use_env_variable: "DATABASE_URL"
  }
}
