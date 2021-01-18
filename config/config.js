const env = process.env.NODE_ENV || 'development'
// const uppercasedEnv = env.toUpperCase()

if (env === 'development' || env === 'test') require('dotenv').config()

// const username = process.env['DB_USERNAME' + uppercasedEnv]
// const password = process.env['DB_PASSWORD' + uppercasedEnv]
// const database = process.env['DB_NAME' + uppercasedEnv]
// const host = process.env['DB_HOST' + uppercasedEnv]
// const dialect = process.env['DB_DIALECT' + uppercasedEnv]


module.exports = {
  "development": {
    "username": process.env.DB_USERNAME_DEVELOPMENT,
    "password": process.env.DB_PASSWORD_DEVELOPMENT,
    "database": process.env.DB_NAME_DEVELOPMENT,
    "host": process.env.DB_HOST_DEVELOPMENT,
    "dialect": "postgres"
  },
  "test": {
    "username": process.env.DB_USERNAME_TEST,
    "password": process.env.DB_PASSWORD_TEST,
    "database": process.env.DB_NAME_TEST,
    "host": process.env.DB_HOST_TEST,
    "dialect": "postgres"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
