const Sequelize = require("sequelize");
var sequelize = require("../config/db");

var Attendance = sequelize.define("attendance", {
  index: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },

  roll: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      len: {
        args: 7,
        msg: "Enter a valid Roll Number"
      }
    },
    unique: false
  }
});

module.exports = Attendance;
