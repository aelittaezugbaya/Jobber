const express = require('express');
const ROUTER = express.Router();

/* GET home page. */
ROUTER.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.sendFile('index.html');
});

module.exports = ROUTER;
