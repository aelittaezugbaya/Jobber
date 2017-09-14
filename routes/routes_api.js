const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const models = require('../mongooseModels');

/*
 API List
 - Service  |  Post                     | ID: Get - Put    | Location, Radius: Get
 * User     |  Post                     | ID: Get - Put    |
 * Feedback |  Post (Cache Update Hook) | ReceiverID: Get  |
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
  var newFeedback = models.Feedback({
    UserSourceID: req.body.UserSourceID,
    UserReceiverID: req.body.UserReceiverID,
    Comment: req.body.Comment,
    Rating: req.body.Rating
  });
  newFeedback.save(function(){
    // -- Set receiver user rating cache
    models.Feedback.find({ UserReceiverID: req.body.UserReceiverID}, function (err, feedback) {
      let total = 0;
      feedback.forEach(function(item, index){
        total += item.Rating;
      });
      let ave = total / feedback.length;
      console.log("Updating User Rating cache:");
      console.log("\tFeedback Count: " + feedback.length);
      console.log("\tFeedback Average: " + ave);
      models.User.findOneAndUpdate({ _id: req.body.UserReceiverID }, { $set: { Rating: ave }}, function(){
        console.log("User rating cache updated.");
      })
    })
  });
  // TODO: Return something useful after insert
  res.send('Ran');
});

// -- User - Get - ID
router.get('/user/:id', function(req, res, next) {
  models.User.find({ _id: req.params.id }, function (err, feedback) {
    res.send(feedback);
  })
});

// -- User - Put - ID
router.put('/user/:id', function(req, res, next) {
  models.User.update({
    _id: req.params.id
  },
  {
    Rating: req.body.Rating,
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

    res.send(user);
  });
});

// -- User - Post
router.post('/user', function(req, res, next) {
  var newUser = models.User({
    Rating: req.body.Rating,
    FullName: req.body.FullName,
    Email: req.body.Email,
    // TODO: Password Encryption
    Password: req.body.Password,
    DateOfBirth: req.body.DateOfBirth,
    Gender: req.body.Gender,
    Description: req.body.Description,
    Status: req.body.Status
  });
  newUser.save();
  // TODO: Return something useful after insert
  res.send('Ran');
});

// -- Service - Get
router.get('/service/:id', function(req, res, next) {
  // TODO Service GET
  models.Service.find({ _id: req.params.id }, function (err, service) {
    res.send(service);
  })
});

// -- Service - Put
router.put('/service/:id', function(req, res, next) {
  models.Service.update({
    _id: req.params.id
  },
  {
    UserOwnerID: req.body.UserOwnerID,
    IsRequest: req.body.IsRequest,
    Subject: req.body.Subject,
    Category: req.body.Category,
    Location: {
      type: { type: "Point" },
      coordinates: [ req.body.lon, req.body.lat ]
    },
    Gender: req.body.Gender,
    Description: req.body.Description,
    Status: req.body.Status
  }, function(err, service){
    if (err) throw err;

    res.send(service);
  });
});

// -- Service - Post
router.post('/service', function(req, res, next) {
  var newService = models.Service({
    UserOwnerID: req.body.UserOwnerID,
    IsRequest: req.body.IsRequest,
    Subject: req.body.Subject,
    Category: req.body.Category,
    Location: {
      type: { type: "Point" },
      coordinates: [ req.body.Lon, req.body.Lat ]
    },
    Gender: req.body.Gender,
    Description: req.body.Description,
    Status: req.body.Status
  })
  newService.save(funtion(err){
    console.log(err);
  });
  // TODO: Return something useful after insert
  res.send('Ran');
});

module.exports = router;
