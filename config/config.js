const env = process.env.NODE_ENV || 'development';
const uppercased = env.toUpperCase();

if (env === 'development' || env === 'test') {
  require('dotenv').config()
}

const username = process.env['DB_USERNAME_' + uppercased]
const password = process.env['DB_PASSWORD_' + uppercased]
const database = process.env['DB_DATABASE_' + uppercased]
const host = process.env['DB_HOST_' + uppercased]
const dialect = process.env['DB_DIALECT_' + uppercased]

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
    "use_env_variable": "DATABASE_URL",
    "ssl": {
      "rejectUnauthorized": false
    }
  }
}
