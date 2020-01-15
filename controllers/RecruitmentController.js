const express = require('express');
const Sequelize = require('sequelize');

const sequelize = require('../config/db');

// Import Models
const recruitment = require('../models/recruitment');

// Import controllers
const MailController = require('./MailController')
const CourseController = require('./CourseController');

class RecruitmentControlller {
	constructor() {
		recruitment.sync();
	}
	
	// Insert a new user into the db
	store(req) { 
		return new Promise((resolve,reject) => {
			user.create({
				name: req.name,
				roll: req.roll,
				email: req.email,
				branch: req.branch,
				year: req.year,
				course: req.course,
				contact: req.contact
			}).then((result) => {
				
				// Send mail
				new MailController().sendUserRegistrationMail(req.email)
				.catch(err => reject({ success: false, message: err}));

				resolve({ success: true });

			})
			.catch(err => reject({ success: false, message: err}));
		});
	}
}

module.exports = RecruitmentControlller;