const env = process.env.NODE_ENV || "development";
const uppercasedEnv = env.toUpperCase();

env === "development" || env === "test" ? require("dotenv").config() : env;

const username = process.env["DB_USERNAME_" + uppercasedEnv];
const password = process.env["DB_PASSWORD_" + uppercasedEnv];
const database = process.env["DB_NAME_" + uppercasedEnv];
const host = process.env["DB_HOST_" + uppercasedEnv];
const dialect = process.env["DB_DIALECT_" + uppercasedEnv];

module.exports = {
  development: {
    username,
    password,
    database,
    host,
    dialect,
  },
  test: {
    username,
    password,
    database,
    host,
    dialect,
  },
  production: {
    username: "weyinliqynortm",
    password:
      "c5d970496929b306e0fb803f1eab53f21c360a10c1d05489fbd611a4fc4ddd62",
    database: "d4bktiepng7jcr",
    host: "ec2-52-2-6-71.compute-1.amazonaws.com",
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
