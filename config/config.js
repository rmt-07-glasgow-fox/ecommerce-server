const env = process.env.NODE_ENV || 'development'
const upperCasedEnv = env.toUpperCase()

if (env ==== 'development' || env === 'test') { require('dotenv').config() }

// .env
// DB_USERNAME_DEVELOPMENT
// DB_USERNAME_TEST

const username = process.env['DB_USERNAME_' + upperCasedEnv]
const password = process.env['DB_PASSWORD_' + upperCasedEnv]
const database = process.env['DB_NAME_' + upperCasedEnv]
const host = process.env['DB_HOST_' + upperCasedEnv]
const dialect = process.env['DB_DIALECT' + upperCasedEnv]

module.exports = {
  "development": {
    username,
    password,
    database,
    host,
    dialect
  },
  "test": {
    username,
    password,
    database,
    host,
    dialect
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
