const express = require('express');
const Sequelize = require('sequelize');

const sequelize = require('../config/db');

// Import Models
const user = require('../models/user');

// Import controllers
const MailController = require('./MailController')
const CourseController = require('./CourseController');

class UserController {
	constructor() {
		user.sync();
	}
	
	// Insert a new user into the db
	store(req) { 
		return new Promise((resolve,reject) => {
			var courseController = new CourseController();

			courseController.show(req.course)
			.then((result) => {
				if(result.data.course_seat > 0)
				{
					user.create({
						name: req.name,
						roll: req.roll,
						email: req.email,
						branch: req.branch,
						year: req.year,
						course: req.course,
						contact: req.contact
					})
					.then(() => {
						// Update course seat
						courseController.update(req.course)
						.catch(err => reject({ success: false, message: 'Course is filled up'}));

						// Send mail
						new MailController().sendUserRegistrationMail(req.email)
						.catch(err => reject({ success: false, message: err}));

						resolve({ success: true });
					})
					.catch((err) => {
						reject ({ success: false, message: err.errors[0].message });
					});
					
				}
				else 
				{
					reject({ success: false, message: 'Course is filled up'})
				}
			})
			.catch(err => reject({ success: false, message: err}));
			
		});
	}
}

module.exports = UserController;