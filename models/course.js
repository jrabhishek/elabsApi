const Sequelize = require('sequelize');
var sequelize = require('../config/db');

// Course model
var Course = sequelize.define('course',{
	course_id: {
		type: Sequelize.UUID,
		defaultValue: Sequelize.UUIDV4,
		allowNull: false,
		unique: true,
		primaryKey: true
	},
	course_name: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notNull: true
		},
		unique: true
	},
	course_seat: {
		type: Sequelize.INTEGER,
		allowNull: false,
		validate: {
			isInt: true,
			notNull: true
		},
		unique: false
	},
	course_description: {
		type: Sequelize.STRING,
		unique: false,
		allowNull: false
	}
});

module.exports = Course;