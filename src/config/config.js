const dotenv = require('dotenv');
dotenv.config();

const username = process.env.NAME;
const password = process.env.PASSWORD;
const database = process.env.DATABASE;
const host = process.env.HOST;
const env = process.env.NODE_ENV;

const config = {
  dev: {
    env: env,
    db: {
      username,
      password,
      database,
      host,
    },
  },
  staging: {},
  prod: {},
};

module.exports = config[env];
