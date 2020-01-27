const express = require("express");
const router = express.Router();

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

var DeviceController = require("../controllers/DeviceController");

router.get("/device/:devID", (req, res) => {
  var device = new DeviceController();
  device
    .index(req)
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;
