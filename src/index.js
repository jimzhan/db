const path = require('path')
const Sequelize = require('sequelize')
const Database = require('./db');

const storage = path.resolve(__dirname, '..', 'db.sqlite')

const db = new Database({
  storage,
  dialect: 'sqlite',
})

const User = db.define('user', {
  username: Sequelize.STRING,
  birthday: Sequelize.DATE
});

db.sync()
  .then(() => User.create({
    username: 'janedoe',
    birthday: new Date(1980, 6, 20)
  }))
  .then(jane => {
    console.log(jane.toJSON());
  });
