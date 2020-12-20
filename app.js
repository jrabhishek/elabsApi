const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const logger = require("morgan");
const dotenv = require("dotenv").config({ path: __dirname + "/.env" });
// Initiate express
const app = express();

const apiRouter = require("./routes/api");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(logger("dev"));
// Handle Routes
app.use("/api", apiRouter);

// const port = process.env.PORT || 3000;
// app.listen(port, () => {});
module.exports = app;
