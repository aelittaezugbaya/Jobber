const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const models = require('../mongooseModels');

const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const ml = require('../ml/ml_cluster');

/*
 API List
 * Middleware
 * Register          |  Post
 * Login             |  Post
 * Service           |  Post                     | ID: Get - Put    | Location, Radius: Get
 * User              |  Post                     | ID: Get - Put    |
 * Feedback          |  Post (Cache Update Hook) | ReceiverID: Get  |
*/

// -- Dummy Get Category ML
router.get('/auth/ml', function(req, res, next) {
  ml.Calculate();
  res.send();
});

// -- Middleware (token check)
router.all(/^(?!.*\/auth).*/, function(req, res, next) {
  console.log("API requested");

  let decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);

  next();
})

// -- User - Post - Registration
router.post('/auth/register', function(req, res, next) {
  new Promise(function(resolve, reject) {
    let salt = crypto.randomBytes(16).toString('hex');
    let hash = crypto.pbkdf2Sync(req.body.Password, salt, 1000, 64, 'sha1').toString('hex');
    // TODO User name check in FRONTEND!

    var newUser = models.User({
      Rating: 0,
      FullName: req.body.FullName,
      Email: req.body.Email,
      Hash: hash,
      Salt: salt,
      DateOfBirth: req.body.DateOfBirth,
      Gender: req.body.Gender,
      Status: "Active"
    });
    newUser.save();

    return resolve(newUser);
  }).then(function(newUser){
    res.send("Ran");
  }).catch(function(reason){
    console.log("Server error: " + reason);
    res.status(500);
    res.status(reason);
  })
});

// -- User - Post - Login
router.post('/auth/login', function(req, res, next) {
  new Promise(function(resolve, reject) {
    models.User.find({ Email: req.body.Email}, function(err, user) {
      if(err)
        return reject("Error finding User with Email " + req.params.Email + ".");
      return resolve(user);
    })
  }).then(function(user){
    let hash = crypto.pbkdf2Sync(req.body.Password, user[0].Salt, 1000, 64, 'sha1').toString('hex');
    if(hash !== user[0].Hash) {
      console.log("Authentication error");

      res.status("Authentication error");
      res.status(401);
      res.send();
      return;
    }

    let expiry = new Date();
    // TODO increase expiration
    expiry.setMinutes(expiry.getMinutes() + 1);

    let jwttoken = jwt.sign({
      _id: user[0]._id,
      Email: user[0].Email,
      FullName: user[0].FullName,
      exp: parseInt(expiry.getTime() / 1000)
    }, process.env.JWT_SECRET);

    res.send(jwttoken);
  }).catch(function(reason) {
    console.log("Server error: " + reason);
    res.status(500);
    res.status(reason);
  })
})

// -- Feedback - Get - UserReceiverID
router.get('/feedback/:UserReceiverID', function(req, res, next) {
  new Promise(function(resolve, reject) {
    models.Feedback.find({ UserReceiverID: req.params.UserReceiverID }, function (err, feedback) {
      if (err)
        return reject("Error finding Feedback with UserReceiverID " + req.params.UserReceiverID + ".");
      return resolve(feedback);
    })
  }).then(function(feedback){
      res.send(feedback);
  }).catch(function(reason){
    console.log("Server error: " + reason);
    res.status(500);
    res.status(reason);
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
  new Promise(function(resolve, reject) {
    models.User.find({ _id: req.params.id }, function (err, user) {
      if(err)
        return reject("Error finding User with ID " + req.params.id + ".");
      return resolve(user);
    })
  }).then(function(user){
    res.send(user);
  }).catch(function(reason){
    console.log("Server error: " + reason);
    res.status(500);
    res.send(reason);
  })
});

// -- User - Put - ID
router.put('/user/:id', function(req, res, next) {
  models.User.update({
    _id: req.params.id
  },
  {
    FullName: req.body.FullName,
    DateOfBirth: req.body.DateOfBirth,
    Gender: req.body.Gender
  }, function(err, user){
    if (err) throw err;

    res.send(user);
  });
});

// -- Service - Get
router.get('/service/:id', function(req, res, next) {
  new Promise(function(resolve, reject) {
    models.Service.find({ _id: req.params.id }, function (err, service) {
      if(err)
        return reject("Error finding Service with ID " + req.params.id + ".");
      return resolve(service);
    })
  }).then(function(service){
    res.send(service);
  }).catch(function(reason){
    console.log("Server error: " + reason);
    res.status(500);
    res.send(reason);
  });
});

// -- Service - Put - ID
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
      type: "Point",
      coordinates: [ req.body.Lon, req.body.Lat ]
    },
    Gender: req.body.Gender,
    Description: req.body.Description,
    Price: req.body.Price
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
      type: "Point",
      coordinates: [ req.body.Lon, req.body.Lat ]
    },
    Gender: req.body.Gender,
    Description: req.body.Description,
    Price: req.body.Price,
    Status: "Open",
    DateCreated: new Date()
  })
  newService.save(function(err){
    console.log(err);
  });
  // TODO: Return something useful after insert
  res.send('Ran');
});

// -- Service - get radius services
router.get('/service/:lat/:lon/:radius', function(req, res, next) {
  new Promise(function(resolve, reject) {
    models.Service.find({Location: {
      $near: {
        $geometry: {
           type: "Point" ,
           coordinates: [ req.params.lon ,req.params.lat ]
        },
        $maxDistance: req.params.radius,
        $minDistance: 0
      }
    }}, function (err, service) {
      if(err)
        return reject("Error finding coordinate.");
      return resolve(service);
    })
  }).then(function(service) {
    res.send(service);
  }).catch(function(reason){
    console.log("Server error: " + reason);
    res.status(500);
    res.send(reason);
  })
});

module.exports = router;
