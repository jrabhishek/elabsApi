const Sequelize = require('sequelize');
var sequelize = require('../config/db');

// User model
var Recruitment = sequelize.define('recruitment',{
	id: {
		type: Sequelize.UUID,
		defaultValue: Sequelize.UUIDV4,
		allowNull: false,
		unique: true,
		primaryKey: true
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			is: ["^[a-z]+$",'i'],
			notNull: true
		},
		unique: false
	},
	roll: {
		type: Sequelize.INTEGER,
		allowNull: false,
		validate: {
			isInt: true,
			notNull: true
		},
		unique: true
	},
	email: {
		type: Sequelize.STRING,
		validate: {
			isEmail: true
		},
		unique: true
	},
	branch: {
		type: Sequelize.STRING,
		unique: false,
		allowNull: false
	},
	year: {
		type: Sequelize.STRING,
		unique: false,
		allowNull: false
	},
	course: {
		type: Sequelize.STRING,
		unique: false,
		allowNull: false
	},
	contact: {
		type: Sequelize.BIGINT,
		unique: true,
		allowNull: false,
		validate: {
			isInt: true,
			len: [10]
		}
	}
});

module.exports = Recruitment;