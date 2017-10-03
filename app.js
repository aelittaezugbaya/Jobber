require('dotenv').config()
const EXPRESS = require('express');
const PATH = require('path');
const FAVICON = require('serve-favicon');
const LOGGER = require('morgan');
const COOKIE_PARSER = require('cookie-parser');
const BODY_PARSER = require('body-parser');

const MONGOOSE = require('mongoose');
MONGOOSE.connect('mongodb://' + process.env.mongo_user + ':' + process.env.mongo_pass + '@ds133054.mlab.com:33054/jobber');

const ROUTES_INDEX = require('./routes/routes_index');
const ROUTES_API = require('./routes/routes_api');

const APP = EXPRESS();

//app.use(FAVICON(PATH.join(__dirname, 'public', 'favicon.ico')));
APP.use(LOGGER('dev'));
APP.use(BODY_PARSER.json());
APP.use(BODY_PARSER.urlencoded({ extended: false }));
APP.use(COOKIE_PARSER());
APP.use(EXPRESS.static(PATH.join(__dirname, 'public')));

APP.use('/', ROUTES_INDEX);
APP.use('/api', ROUTES_API);

// -- Catch Error
APP.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// -- Error Handler
APP.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = APP.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.send('Error: ' + err.message);
});

module.exports = APP;
