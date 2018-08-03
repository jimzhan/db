const path = require('path')

module.exports = {
  development: {
    dialect: 'sqlite',
    storage: path.resolve(__dirname, '..', 'db.sqlite'),
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialectOptions: {
      ssl: {}
    }
  },
}