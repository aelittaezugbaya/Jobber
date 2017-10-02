const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();

/* GET home page. */
ROUTER.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.sendFile('index.html');
});

module.exports = ROUTER;
