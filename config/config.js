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
    username: "jzdxtwsvjvwbyt",
    password:
      "04c63f3b50943f3d65962042b6d48dd5e3a59cff5a7edb6bc5667e75ab942f85",
    database: "d5jk9aahmv33b0",
    host: "ec2-52-206-44-27.compute-1.amazonaws.com",
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
