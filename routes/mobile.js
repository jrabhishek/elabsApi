const express = require("express");
const router = express.Router();
var DeviceController = require("../controllers/DeviceController");
var AttendanceController = require("../controllers/AttendanceController");
router.post("/device", (req, res) => {
  var device = new DeviceController();
  device
    .store(req)
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get("/device/:devID", (req, res) => {
  var device = new DeviceController();
  device
    .index(req)
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => res.status(500).json(err));
});

router.post("/attendance", (req, res) => {
  var attendance = new AttendanceController();
  attendance
    .store(req)
    .then(result => {
      if (result.status == 200) {
        res.status(200).json(result);
      }
    })
    .catch(err => [res.status(500).json(err)]);
});

router.get("/attendance/:roll", (req, res) => {
  var attendance = new AttendanceController();
  attendance
    .index(req)
    .then(data => res.json(data))
    .catch("fail!");
});
module.exports = router;
