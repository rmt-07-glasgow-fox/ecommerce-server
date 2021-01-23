const env = process.env.NODE_ENV || 'development';
const upperCaseEnv = env.toUpperCase();

if (env === 'development' || env === 'test') require('dotenv').config();

const username = process.env[ 'DB_USERNAME_' + upperCaseEnv ];
const password = process.env['DB_PASSWORD_' + upperCaseEnv];
const database = process.env['DB_NAME_' + upperCaseEnv];
const host = process.env['DB_HOST_' + upperCaseEnv];
const dialect = process.env['DB_DIALECT_' + upperCaseEnv];

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
		"username": "yppdhujxisxkjn",
		"password": "371ee09837336f084f1668ecffd7efd3d08aa7fc3d6f4617cded14792980fa62",
		"database": "d8e6unl36gckt0",
		"host": "ec2-54-85-13-135.compute-1.amazonaws.com",
		"dialect": "postgres"
	}
}
