const env = process.env.NODE_ENV || 'development';
const uppercasedENV = env.toUpperCase();

if (env === 'development' || env === 'test') {
  require('dotenv').config();
}

const username = process.env['DB_USERNAME_' + uppercasedENV];
const password = process.env['DB_PASSWORD_' + uppercasedENV];
const database = process.env['DB_NAME_' + uppercasedENV];
const host = process.env['DB_HOST_' + uppercasedENV];
const dialect = process.env['DB_DIALECT_' + uppercasedENV];

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
    "dialectOptions": {
      "ssl": {
        "rejectUnauthorized": false
      }
    }
  }
}
