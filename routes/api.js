const express = require("express");

const router = express.Router();

// Import controller
var RecruitmentController = require("../controllers/RecruitmentController");
var UserController = require("../controllers/UserController");
var CourseController = require("../controllers/CourseController");
var MailController = require("../controllers/MailController");

var mobileRoute = require("./mobile");

router.use("/mobile", mobileRoute);

router.post("/recruitment", (req, res) => {
  new RecruitmentController()
    .store(req.body)
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => res.status(200).json(err));
});

router.post("/register", (req, res) => {
  var userController = new UserController();
  userController
    .store(req.body)
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => res.status(200).json(err));
});

router.post("/course", (req, res) => {
  new CourseController()
    .store(req.body)
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => res.status(200).json(err));
});

router.get("/course", (req, res) => {
  new CourseController()
    .index()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => res.status(200).json(err));
});

router.get("/user/:roll", (req, res) => {
  new UserController()
    .index(req.params.roll)
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json(err));
});

module.exports = router;
