const Sequelize = require('sequelize').Sequelize;

const sequelize = new Sequelize('node-complete', 'root', 'Sharda@23', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
