require("dotenv").config();

const environment = process.env.NODE_ENV || "dev";

const suffix = {
  prod: "",
  production: "",
  dev: "-dev",
  development: "-dev",
  test: "-test",
};

const options = {
  host: process.env.HOSTNAME || process.env.MYSQL_HOST || "localhost",
  port: process.env.MYSQL_PORT || "3306",
  database: `${process.env.MYSQL_DB_NAME || "lol-explorer"}${
    suffix[environment] || suffix.dev
  }`,
  username: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "password",
  dialect: "mysql",
  dialectOptions: {
    timezone: "Z",
  },
  logging: false,
};

module.exports = {
  development: {
    ...options,
  },
  test: {
    ...options,
  },
  production: {
    ...options,
  },
};
