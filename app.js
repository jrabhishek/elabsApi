const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Initiate express
const app = express();

const apiRouter = require('./routes/api');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Handle Routes
app.use('/api', apiRouter);

const port = process.env.PORT || 5000;
app.listen(port,() => {});