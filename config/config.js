if(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'){
  require('dotenv').config()
}

module.exports = {
  "development": {
    "username": process.env.DB_DEV_NAME,
    "password": process.env.DB_DEV_PASSWORD,
    "database": process.env.DB_DEV_DATABASE,
    "host": process.env.DB_DEV_HOST,
    "dialect": "postgres"
  },
  "test": {
    "username": process.env.DB_TEST_NAME,
    "password": process.env.DB_TEST_PASSWORD,
    "database": process.env.DB_TEST_DATABASE,
    "host": process.env.DB_TEST_HOST,
    "dialect": "postgres"
  },
  "production": {
    "username": process.env.DB_NAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "host": process.env.DB_HOST,
    "dialect": "postgres",
    "dialectOptions":{
      "ssl": {
        "rejectUnauthorized": false
      }
    }
  }
}