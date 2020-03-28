const express = require("express");
const Sequelize = require("sequelize");

const sequelize = require("../config/db");

// Import Models
const course = require("../models/course");

class CourseController {
  constructor() {
    course.sync();
  }

  index() {
    return new Promise((resolve, reject) => {
      course
        .findAll({
          attributes: [
            "course_id",
            "course_name",
            "course_seat",
            "course_description"
          ]
        })
        .then(result => {
          resolve({ success: true, data: result });
        })
        .catch(err => reject({ success: false, message: err }));
    });
  }
  show(course_name) {
    return new Promise((resolve, reject) => {
      course
        .findOne({
          where: {
            course_name: course_name
          },
          attributes: [
            "course_id",
            "course_name",
            "course_seat",
            "course_description"
          ]
        })
        .then(result => {
          resolve({ success: true, data: result });
        })
        .catch(err => {
          reject({ success: false });
        });
    });
  }

  // Insert a new recruitment into the db
  store(req) {
    return new Promise((resolve, reject) => {
      course
        .create({
          course_name: req.course_name,
          course_seat: req.course_seat,
          course_description: req.course_description
        })
        .then(result => {
          resolve({ success: true });
        })
        .catch(err => {
          reject({ success: false, message: err });
        });
    });
  }

  // Update
  update(course_name) {
    return new Promise((resolve, reject) => {
      this.show(course_name)
        .then(result => {
          if (result.data.course_seat > 0) {
            course.update(
              {
                course_seat: result.data.course_seat - 1
              },
              {
                where: {
                  course_name: course_name
                }
              }
            );
            // resolve ({ success: true });
          } else {
            reject({ success: false, message: "Course is already filled up" });
          }
        })
        .catch(err => {
          return { success: false, message: err };
        });
    });
  }
}

module.exports = CourseController;
