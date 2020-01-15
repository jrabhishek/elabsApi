const Sequelize = require('sequelize');
const sequelize = new Sequelize('kiitelabs_db', 'root', '', {
	host: 'localhost',
	dialect: 'mysql'
});

module.exports = sequelize;