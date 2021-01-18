const env = process.env.NODE_ENV || 'development'
// const uppercasedEnv = env.toUpperCase()

if (env === 'development' || env === 'test') require('dotenv').config()

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
