const attendance = require("../models/attendance");
const DeviceController = require("../controllers/DeviceController");
const axios = require("axios");
const sequelize = require("../config/db");
const path = require("path");
const fs = require("fs");
class AttendanceController {
  constructor() {
    attendance.sync();
  }

  store(req) {
    return new Promise((resolve, reject) => {
      var data = req.body.data;
      var device = new DeviceController();
      var count = 0;
      data.forEach((user, index, array) => {
        device
          .verify(user)
          .then(result => {
            if (result.status == 200) {
              attendance
                .create({
                  roll: user.roll
                })
                .then(() => {
                  console.log(result.data.fcmToken);
                  axios({
                    method: "post",
                    url: "https://fcm.googleapis.com/fcm/send",
                    data: {
                      to: result.data.fcmToken,
                      data: {
                        type: "acknowledgement",
                        message: "Attendance has been successfully marked!"
                      }
                    },
                    headers: {
                      "Content-Type": "application/json",
                      Authorization:
                        "key=AAAAucMfnY8:APA91bHDhrReMoSaMuspCozRaTGHcaIMbT5GWvsAqbvBvAK9cN2mTsexdaIQRcw0xQWieYWI1UHlCfCgGCXgP0dg3eToN2iRpnCvSRnvayDHenp7Kxe9D5q1a-slBnGW7RoppoBe_odI"
                    }
                  })
                    .then(response => {
                      console.log(response.status);
                      if (++count === array.length) {
                        var days = fs.readFileSync(
                          path.join(__dirname, "../helper/day.txt"),
                          "utf8"
                        );
                        if (days.length == 0)
                          fs.writeFileSync(
                            path.join(__dirname, "../helper/day.txt"),
                            +new Date()
                          );
                        if (days.indexOf(",") == -1) {
                          if (parseInt(+new Date()) - parseInt(days) > 60000) {
                            fs.appendFileSync(
                              path.join(__dirname, "../helper/day.txt"),
                              "," + +new Date()
                            );
                          }
                        } else {
                          var ar = [];
                          ar = days.split(",");
                          if (
                            parseInt(+new Date()) -
                              parseInt(ar[ar.length - 1]) >=
                            10000
                          ) {
                            fs.appendFileSync(
                              path.join(__dirname, "../helper/day.txt"),
                              "," + +new Date()
                            );
                          }
                        }
                        console.log(days.split(" ").length);
                        resolve({
                          status: 200,
                          message: "Attendance Marked!",
                          data: null
                        });
                      }
                    })
                    .catch(err => console.log(err));
                })
                .catch(err => {
                  console.log("Error!");
                  reject({
                    status: 500,
                    message: "Attendance Not Marked!",
                    data: err
                  });
                });
            } else {
              reject(result);
            }
          })
          .catch(err => [
            reject({
              status: 500,
              message: "Internal Server Error",
              data: err
            })
          ]);
      });
    });
  }

  index(req) {
    return new Promise((resolve, reject) => {
      var roll = req.params.roll;
      var authKey = req.header("Authorization");
      var device = new DeviceController();
      device
        .verify({
          roll: roll,
          authKey: authKey
        })
        .then(result => {
          if (result.status == 200) {
            sequelize
              .query(
                `SELECT UNIX_TIMESTAMP(createdAt) FROM attendances WHERE roll=${roll} GROUP BY UNIX_TIMESTAMP(createdAt)`,
                {
                  raw: true
                }
              )
              .then(function(data) {
                var student_days = [];
                data[0].forEach(day => {
                  student_days.push(String(day["UNIX_TIMESTAMP(createdAt)"]));
                });

                var total_days = fs.readFileSync(
                  path.join(__dirname, "../helper/day.txt"),
                  "utf8"
                );
                if (total_days.length === 0) total_days = [];
                else if (total_days.indexOf(",") == -1) total_days = total_days;
                else {
                  total_days = total_days.split(",");
                  console.log(total_days);
                }
                var history = {
                  student_days: student_days,
                  total_days: total_days
                };
                resolve({
                  status: 200,
                  message: "Student History Successfully fetched!",
                  data: history
                });
              })
              .catch(err => reject(err));
          } else resolve(result);
        })
        .catch(err =>
          reject({
            status: 500,
            message: "Internal Server Error",
            data: null
          })
        );
    });
  }
}

module.exports = AttendanceController;
