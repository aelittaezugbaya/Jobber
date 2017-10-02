const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const MONGOOSE = require('mongoose');
const MODELS = require('../mongooseModels');
const ASYNC = require('async');

const CRYPTO = require('crypto');
const JWT = require('jsonwebtoken');

const ML = require('../ml/ml_cluster');

/*
 API List
 * Middleware
 * Register          |  Post
 * Login             |  Post
 * Service           |  Post                     | ID: Get - Put    | Location, Radius: Get
 * User              |  Post                     | ID: Get - Put    |
 * Feedback          |  Post (Cache Update Hook) | ReceiverID: Get  |
*/

// -- Get Category ML
ROUTER.get('/auth/ml/:id/:lat/:lon', function(req, res, next) {

  // -- Get Data from DB

  // -- Get User Object
  let userObject;

  new Promise(function(resolve, reject) {
    MODELS.User.find({ _id: req.params.id }, function (err, user) {
      if(err)
        reject("Error finding User with ID " + req.params.id + ".");
      resolve(user);
    })
  }).then(function(user){
    let newObject = { parameters: [ML.GetAge(user[0].DateOfBirth), ML.GetGender(user[0].Gender), req.params.lat, req.params.lon] }
    let otherObjects = [];
    let categories = [];

    // -- Get Service Information
    let i = 0;
    MODELS.Service.find({}, function (err, service) {               
      ASYNC.whilst(
        function() { return i < service.length; },
        function (callback) {
          MODELS.User.find({ _id: service[0].UserOwnerID }, function (err, item) {
            otherObjects.push({ parameters: [ML.GetAge(item[0].DateOfBirth), ML.GetGender(item[0].Gender), service[0].Location.coordinates[0], service[0].Location.coordinates[1]], category: service[0].Category});
            categories.indexOf(service[0].Category) === -1 ? categories.push(service[0].Category) : console.log("Category already in array.");
            i++;
            callback(null);
          });
        },
        function(err) {   
          console.log(otherObjects[0]);
          console.log(otherObjects[1]);
          console.log(otherObjects[2]);
          
          let limits = [
            [10, 80], [0, 1], [-90, 90], [-180, 180]
          ]
          let weights = [
            1, 0.5, 10, 10
          ]
      
          ML.Calculate(newObject, otherObjects, limits, weights, categories);
          res.send();
        }
      );
    });
  }).catch(function(reason){
    console.log("Server error: " + reason);
    res.status(500);
    res.send(reason);
  })
});

// -- Middleware (token check)
ROUTER.all(/^(?!.*\/auth).*/, function(req, res, next) {
  console.log("API requested");

  let decoded = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);

  next();
})

// -- User - Post - Registration
ROUTER.post('/auth/register', function(req, res, next) {
  new Promise(function(resolve, reject) {
    let salt = CRYPTO.randomBytes(16).toString('hex');
    let hash = CRYPTO.pbkdf2Sync(req.body.Password, salt, 1000, 64, 'sha1').toString('hex');
    // TODO User name check in FRONTEND!

    var newUser = MODELS.User({
      Rating: 0,
      FullName: req.body.FullName,
      Email: req.body.Email,
      Description: "Hello, I am " + req.body.FullName + ".",
      Hash: hash,
      Salt: salt,
      DateOfBirth: req.body.DateOfBirth,
      Gender: req.body.Gender,
      Status: "Active",
    });
    newUser.save(function(err, user) {
      let n = ML.GetDataML(user._id, req.body.lat, req.body.lon);
      console.log("CAT:" + n);
      newUser.set({ PreferredCategory: n});
      newUser.save();
    });

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
ROUTER.post('/auth/login', function(req, res, next) {
  new Promise(function(resolve, reject) {
    MODELS.User.find({ Email: req.body.Email}, function(err, user) {
      if(err)
        return reject("Error finding User with Email " + req.params.Email + ".");
      return resolve(user);
    })
  }).then(function(user){
    let hash = CRYPTO.pbkdf2Sync(req.body.Password, user[0].Salt, 1000, 64, 'sha1').toString('hex');
    if(hash !== user[0].Hash) {
      console.log("Authentication error");

      res.status("Authentication error");
      res.status(401);
      res.send();
      return;
    }

    let expiry = new Date();
    // TODO increase expiration
    expiry.setMinutes(expiry.getMinutes() + 30);

    let jwttoken = JWT.sign({
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
ROUTER.get('/feedback/:UserReceiverID', function(req, res, next) {
  new Promise(function(resolve, reject) {
    MODELS.Feedback.find({ UserReceiverID: req.params.UserReceiverID }, function (err, feedback) {
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
ROUTER.post('/feedback', function(req, res, next) {
  var newFeedback = MODELS.Feedback({
    UserSourceID: req.body.UserSourceID,
    UserReceiverID: req.body.UserReceiverID,
    Comment: req.body.Comment,
    Rating: req.body.Rating
  });
  newFeedback.save(function(){
    // -- Set receiver user rating cache
    MODELS.Feedback.find({ UserReceiverID: req.body.UserReceiverID}, function (err, feedback) {
      let total = 0;
      feedback.forEach(function(item, index){
        total += item.Rating;
      });
      let ave = total / feedback.length;
      console.log("Updating User Rating cache:");
      console.log("\tFeedback Count: " + feedback.length);
      console.log("\tFeedback Average: " + ave);
      MODELS.User.findOneAndUpdate({ _id: req.body.UserReceiverID }, { $set: { Rating: ave }}, function(){
        console.log("User rating cache updated.");
      })
    })
  });
  // TODO: Return something useful after insert
  res.send('Ran');
});

// -- User - Get - ID
ROUTER.get('/user/:id', function(req, res, next) {
  new Promise(function(resolve, reject) {
    MDOELS.User.find({ _id: req.params.id }, function (err, user) {
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
ROUTER.put('/user/:id', function(req, res, next) {
  MODELS.User.update({
    _id: req.params.id
  },
  {
    FullName: req.body.FullName,
    DateOfBirth: req.body.DateOfBirth,
    Gender: req.body.Gender,
    Description: req.body.Description
  }, function(err, user){
    if (err) throw err;

    res.send(user);
  });
});

// -- Service - Get
ROUTER.get('/service/:id', function(req, res, next) {
  new Promise(function(resolve, reject) {
    MODELS.Service.find({ _id: req.params.id }, function (err, service) {
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
ROUTER.put('/service/:id', function(req, res, next) {
  MODELS.Service.update({
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
ROUTER.post('/service', function(req, res, next) {
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
ROUTER.get('/service/:lat/:lon/:radius', function(req, res, next) {
  new Promise(function(resolve, reject) {
    MODELS.Service.find({Location: {
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

module.exports = ROUTER;
