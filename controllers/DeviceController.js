const device = require("../models/device");
const authKeyGenerator = require("../helper/authKeyGenerator");
const UserController = require("./UserController");
const CourseController = require("./CourseController");
class DeviceController {
  constructor() {
    device.sync();
  }

  index(req) {
    return new Promise((resolve, reject) => {
      var devID = req.params.devID;
      device
        .findOne({
          where: {
            devID: devID
          },
          attributes: ["roll", "authKey"]
        })
        .then(result => {
          if (result != null) {
            var authKey = result.authKey;
            var course_id = authKey.substring(22);
            var newAuthKey = authKeyGenerator.generateAuthKey(course_id);
            var roll = result.roll;
            var fcmToken = req.header("fcmToken");
            device
              .update(
                {
                  authKey: newAuthKey,
                  fcmToken: fcmToken
                },
                {
                  where: {
                    roll: roll
                  }
                }
              )
              .then(() => {
                var user = new UserController();
                user
                  .index(roll)
                  .then(res => {
                    if (res.status === 200) {
                      resolve({
                        status: 200,
                        message: "Successfully generated authKey!",
                        data: {
                          authKey: newAuthKey,
                          student: res.data
                        }
                      });
                    }
                  })
                  .catch(err =>
                    reject({
                      status: 500,
                      message: "Internal Server Error!",
                      data: null
                    })
                  );
              })
              .catch(err =>
                reject({
                  status: 500,
                  message: "Internal Server Error!",
                  data: err
                })
              );
          } else {
            resolve({
              status: 404,
              message: "Device ID not found!",
              data: null
            });
          }
        })
        .catch(err =>
          reject({
            status: 500,
            message: "Internal Server Error!",
            data: err
          })
        );
    });
  }

  store(req) {
    return new Promise((resolve, reject) => {
      var roll = req.body.roll;
      var devID = req.body.devID;
      var fcmToken = req.body.fcmToken;
      var user = new UserController();
      user
        .index(roll)
        .then(result => {
          if (result.status == 200) {
            var registered_course = result.data.course;
            var courseController = new CourseController();
            courseController
              .show(registered_course)
              .then(res => {
                if (res.success) {
                  var course_id = res.data.course_id.substring(2,4);
                  device
                    .create({
                      roll: roll,
                      fcmToken: fcmToken,
                      devID: devID,
                      authKey: authKeyGenerator.generateAuthKey(course_id)
                    })
                    .then(() => {
                      resolve({
                        status: 200,
                        message:
                          "Successfully registered and generated Auth Key!",
                        data: {
                          authKey: authKey,
                          student: result.data
                        }
                      });
                    })
                    .catch(err =>
                      reject({
                        status: 500,
                        message: "Internal Server Error!",
                        data: err
                      })
                    );
                }
              })
              .catch(err =>
                reject({
                  status: 500,
                  message: "Internal Server Error!",
                  data: err
                })
              );
          } else
            resolve({
              status: 404,
              message: "Roll Number not registered!",
              data: null
            });
        })
        .catch(err =>
          reject({
            status: 500,
            message: "Internal Server Error!",
            data: err
          })
        );
    });
  }
  verify(req) {
    return new Promise((resolve, reject) => {
      var roll = req.roll;
      var authKey = req.authKey;
      console.log(roll, authKey);
      device
        .findOne({
          where: {
            roll: roll
          },
          attributes: ["authKey", "fcmToken"]
        })
        .then(result => {
          if (result != null) {
            if (authKey == result.authKey) {
              resolve({
                status: 200,
                message: "Succesfully Verified AuthKey",
                data: {
                  fcmToken: result.fcmToken
                }
              });
            } else {
              resolve({
                status: 404,
                message: "Auth Key not valid",
                data: null
              });
            }
          } else {
            resolve({
              status: 404,
              message: "Device not registered!",
              data: null
            });
          }
        })
        .catch(err => {
          reject({
            status: 500,
            message: "Internal Server Error!",
            data: null
          });
        });
    });
  }
}

module.exports = DeviceController;
