const env = process.env.NODE_ENV || "development"

if (env === 'development' || env === 'test') require('dotenv').config()

const username = process.env.DB_USERNAME
const password = process.env.DB_PASSWORD
const dialect = process.env.DB_DIALECT
const host = process.env.DB_HOST

module.exports = {
  development: {
    username,
    password,
    database: process.env.DB_NAME_DEV,
    host,
    dialect
  },
  test: {
    username,
    password,
    database: process.env.DB_NAME_TEST,
    host,
    dialect
  },
  production: {
    use_env_variable: "DATABASE_URL"
  }
}
