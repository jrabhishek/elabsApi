const attendance = require("../models/attendance");
const DeviceController = require("../controllers/DeviceController");
const axios = require("axios");
const sequelize = require("../config/db");
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
                      if (++count === array.length)
                        resolve({
                          status: 200,
                          message: "Attendance Marked!",
                          data: null
                        });
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
      device
        .verify({
          roll: roll,
          authKey: authKey
        })
        .then();
    });
  }
}

module.exports = AttendanceController;
