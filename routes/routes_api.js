const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const models = require('../mongooseModels');

/*
 API List
 - Service  |  Post                     | ID: Get - Put    | Location, Radius: Get
 - User     |  Post                     | ID: Get - Put    |
 - Feedback |  Post (Cache Update Hook) | ReceiverID: Get  |
*/

// -- Feedback - Get - ReceiverID
router.get('/feedback/:id', function(req, res, next) {
  models.Feedback.find({ UserReceiverID: req.params.id }, function (err, feedback) {
    if (err) return handleError(err);
    res.send(feedback);
  })
});

// -- Feedback - Post
router.post('/feedback', function(req, res, next) {
  // TODO: Get data from post body
  var newFeedback = models.Feedback({
    UserSourceID: "SendersID",
    UserReceiverID: "TargetID",
    Comment: "I dont like this guy, boohoo.",
    Rating: 2
  });
  newFeedback.save();
  // TODO: Return something useful after insert
  res.send('Ran');
});

// -- User - Get - ID
router.get('/user/:id', function(req, res, next) {
  models.User.find({ _id: req.params.id }, function (err, feedback) {
    if (err) return handleError(err);
    res.send(feedback);
  })
});

// -- User - Put - ID
router.put('/user/:id', function(req, res, next) {
  models.User.update({
    _id: req.params.Email
  },
  {
    Rating: req.body.rating,
    FullName: req.body.FullName,
    Email: req.body.Email,
    // TODO: Password Encryption
    Password: req.body.Password,
    DateOfBirth: req.body.DateOfBirth,
    Gender: req.body.Gender,
    Description: req.body.Description,
    Status: req.body.Status
  }, function(err, user){
    if (err) throw err;

    res.json(user);
  });
});
// -- User - Post
router.post('/user', function(req, res, next) {
  var newUser = models.User({
    Rating: req.body.rating,
    FullName: req.body.FullName,
    Email: req.body.Email,
    // TODO: Password Encryption
    Password: req.body.Password,
    DateOfBirth: req.body.DateOfBirth,
    Gender: req.body.Gender,
    Description: req.body.Description,
    Status: req.body.Status
  });
});

module.exports = router;
