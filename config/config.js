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
    username: "lifzzuhnuzzydj",
    password:
      "db4e4cdd98c749e60d2b77cee7885b39ab9f08165244156825c64b660148d861",
    database: "df2mnao6ggm6j1",
    host: "ec2-54-172-219-218.compute-1.amazonaws.com",
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
