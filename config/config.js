const env = process.env.NODE_ENV || 'development'
const uppercasedEnv = env.toUpperCase()

if (env == 'development' || env == 'test') { require('dotenv').config() }
const username = process.env['DB_USERNAME_' +uppercasedEnv]
const password = process.env['DB_PASSWORD_' +uppercasedEnv]
const database = process.env['DB_NAME_' +uppercasedEnv]
const host = process.env['DB_HOST_' +uppercasedEnv]
const dialect = process.env['DB_DIALECT_' +uppercasedEnv]

module.exports = {
  "development": {
    "username": "postgres",
    "password": "postgres",
    "database": "ecommers-DEV",
    "host": "localhost",
    "dialect": "postgres"
  },
  "test": {
    "username": "postgres",
    "password": "postgres",
    "database": "ecommers-test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "use_env_variable": "DATABASE_URL"
  }
}
