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
    username: "cicsturatdnyuy",
    password:
      "f475f6c5cf149e0efb0e8c6725c2bad8003cc6897f252a5ab3f63ad8707c008e",
    database: "d28em7e9bggge0",
    host: "ec2-54-205-248-255.compute-1.amazonaws.com",
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
