const env = process.env.NODE_ENV || 'development';
const uppercasedEnv = env.toUpperCase();

if (env === 'development' || env === 'test') require('dotenv').config()

const username = process.env['DB_USERNAME_' + uppercasedEnv];
const password = process.env['DB_PASSWORD_' + uppercasedEnv];
const database = process.env['DB_NAME_' + uppercasedEnv];
const host = process.env['DB_HOST_' + uppercasedEnv];
const dialect = process.env['DB_DIALECT_' + uppercasedEnv]

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
    dialect,
  },
  "production": {
    "username": "bvebbxddldhhmy",
    "password": "066e51a175c1f76a3a13bf66d1df94e34b1dda1efc500802d8bdafc143e86c74",
    "database": "d4d8q4cp5asf2d",
    "host": "ec2-54-225-18-166.compute-1.amazonaws.com",
    "dialect": "postgres",
    "dialectOptions": {
      "ssl": {
          "require" : true,
          "rejectUnauthorized" : false
       }
    }
  }
}
