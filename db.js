const Sequelize = require('sequelize');
const sequelize = new Sequelize('espectro', 'root', '12Alexsandro34', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;