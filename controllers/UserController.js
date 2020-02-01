const express = require("express");
const Sequelize = require("sequelize");

const sequelize = require("../config/db");

// Import Models
const user = require("../models/user");

// Import controllers
const MailController = require("./MailController");
const CourseController = require("./CourseController");

class UserController {
  constructor() {
    user.sync();
  }

  index(roll) {
    return new Promise((resolve, reject) => {
      user
        .findOne({
          where: {
            roll: roll
          },
          attributes: [
            "roll",
            "name",
            "gender",
            "email",
            "branch",
            "year",
            "course",
            "contact"
          ]
        })
        .then(result => {
          if (result != null) {
            var data = {
              roll: result.roll,
              name: result.name,
              gender: result.gender,
              email: result.email,
              branch: result.branch,
              year: result.year,
              course: result.course,
              contact: result.contact
            };
            resolve({
              status: 200,
              data: data,
              message: "Succesfully fetched details!"
            });
          } else {
            resolve({
              status: 404,
              data: null,
              message: "Roll Number doesn't exists!"
            });
          }
        })
        .catch(err =>
          reject({
            status: 500,
            data: err,
            message: "Internal Server Error!"
          })
        );
    });
  }
  // Insert a new user into the db
  store(req) {
    return new Promise((resolve, reject) => {
      var courseController = new CourseController();
      if (req.email.search("@kiit.ac.in") == -1) {
        reject({ success: false, message: "You must use kiit email" });
      } else {
        courseController
          .show(req.course)
          .then(result => {
            if (result.data.course_seat > 0) {
              user
                .create({
                  name: req.name,
                  roll: req.roll,
                  gender: req.gender,
                  email: req.email,
                  branch: req.branch,
                  year: req.year,
                  course: req.course,
                  contact: req.contact
                })
                .then(() => {
                  // Update course seat
                  courseController
                    .update(req.course)
                    .catch(err =>
                      reject({ success: false, message: "Course is filled up" })
                    );

                  // Send mail
                  new MailController()
                    .sendUserRegistrationMail(req.email, req.course)
                    .catch(err => reject({ success: false, message: err }));

                  resolve({ success: true });
                })
                .catch(err => {
                  console.log(err);
                  reject({ success: false, message: err.errors[0].message });
                });
            } else {
              reject({ success: false, message: "Course is filled up" });
            }
          })
          .catch(err => reject({ success: false, message: err }));
      }
    });
  }
}

module.exports = UserController;
