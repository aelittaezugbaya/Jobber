const MONGOOSE = require('mongoose');
const MODELS = require('../mongooseModels');
const ASYNC = require('async');

// --
module.exports = function()
{
  return {
    // -- Get Data from DB
    GetDataML : function(id, lat, lon, callback) {
      // -- Get User Object
      let userObject;

      new Promise(function(resolve, reject) {
        MODELS.User.find({ _id: id }, function (err, user) {
          if(err)
            reject("Error finding User with ID " + i + ".");
          resolve(user);
        })
      }).then(function(user){
        let newObject = { parameters: [GetAge(user[0].DateOfBirth), GetGender(user[0].Gender), lat, lon] }
        let otherObjects = [];
        let categories = [];

        // -- Get Service Information
        let i = 0;
        MODELS.Service.find({}, function (err, service) {
          ASYNC.whilst(
            function() { return i < service.length; },
            function (callback) {
              MODELS.User.find({ _id: service[0].UserOwnerID }, function (err, item) {
                otherObjects.push({ parameters: [GetAge(item[0].DateOfBirth), GetGender(item[0].Gender), service[0].Location.coordinates[0], service[0].Location.coordinates[1]], category: service[0].Category});
                categories.indexOf(service[0].Category) === -1 ? categories.push(service[0].Category) : console.log("Category already in array.");
                i++;
                callback(null);
              });
            },
            function(err) {
              let limits = [
                [10, 80], [0, 1], [-90, 90], [-180, 180]
              ]
              let weights = [
                1, 0.5, 10, 10
              ]
              // -- call calculation function for categories
              callback(null, Calculate(newObject, otherObjects, limits, weights, categories));
            }
          );
        });
      }).catch(function(reason){
        console.log("Server error: " + reason);
      })
    }
  }
}();

// -- Returns string of most suitable category
let Calculate = function (newObject, otherObjects, limits, weights, categories) {
  console.log("Calculating");
  /*

  IMPORTANT:
    The newObject is the user which needs to have a category predicted for.
    The otherObjects are the database list of objects which already have a category assigned.

    The data will be passed in by paramters. The following assignments are for dummy purposes only.

  NORMALIZATION OF DATA:
    The data must be normalized. This means changed so each paramter has the correct weight.
    For example, currently, gender only increases the distance between nodes by 1. Aka, the object can
    only be 0 or 1 for gender, meaning the distance on the gender plane is only 1 at max. However
    the distance for age ranges from 0 to potentially around 70 or so. This means age could have 70x
    more of an effect on the calculation than gender, simply because the numbers are further apart.
    The solution to this is to normalize the values to all be roughly between 0 and 1 for example.

  */

  // -- Example Data (Usually passed as parameters)
  /*
  newObject = { parameters: [22, 1, 50, 27] }
  otherObjects = [
    // age , gender, lat, lon
    { parameters: [18, 0, 49, 26], category: "HouseWork" },
    { parameters: [11, 0, 49, 23], category: "HouseWork" },
    { parameters: [32, 1, 56, 26], category: "Beauty" },
    { parameters: [23, 1, 50, 22], category: "Beauty" }
  ]
  limits = [
    [10, 80], [0, 1], [-90, 90], [-180, 180]
  ]
  weights = [
    2, 0.5, 10, 10
  ]
  categories = [
    "HouseWork", "Beauty", "AnimalCare"
  ]
  */

  // -- Get normalized parameter values of newObject
  let newObjectNormalizedParameters = [newObject.parameters.length];
  for (let p = 0; p < newObject.parameters.length; p++)
  {
    newObjectNormalizedParameters[p] = (newObject.parameters[p] - limits[p][0]) / (limits[p][1] - limits[p][0]);
  }

  // -- Init score array
  let scores = new Array(categories.length).fill(0);

  // -- Get Distances to Other objects
  for (let i = 0; i < otherObjects.length; i++)
  {
    let object = otherObjects[i];

    // - Get normalized parameter values
    let normalizedParameters = [object.parameters.length];
    for (let p = 0; p < object.parameters.length; p++)
    {
      normalizedParameters[p] = (object.parameters[p] - limits[p][0]) / (limits[p][1] - limits[p][0]);
    }

    // - Get Distance to Object
    let squareDistance = 0;
    // - Add square difference for each axis
    let debugAxisDifference = [normalizedParameters.length];
    for (let p = 0; p < normalizedParameters.length; p++)
    {
      let difference = (newObjectNormalizedParameters[p] - normalizedParameters[p]) * weights[p];
      if (difference > 1)
      {
        difference = 1;
      }
      if (difference < -1)
      {
        difference = -1;
      }
      let square = difference * difference;
      squareDistance += square;
      debugAxisDifference[p] = difference;
    }
    let distance = Math.sqrt(squareDistance);

    // - Add score to relevant category
    let index = categories.indexOf(object.category);
    let score = (Math.sqrt(normalizedParameters.length) - distance);
    scores[index] += score;

    // - Debug print
    console.log("------------------------------------------");
    console.log("Score: " + parseFloat(score).toFixed(4));
    let debugStr = "Distance: " + parseFloat(distance).toFixed(4) + " :: ";
    for (let p = 0; p < debugAxisDifference.length; p++)
    {
      debugStr += "[" + parseFloat(debugAxisDifference[p]).toFixed(4) + "] ";
    }
    console.log(debugStr);
    console.log("------------------------------------------");
  }

  let winnerIndex = 0;
  for (let c = 0; c < scores.length; c++)
  {
    if(scores[c] > scores[winnerIndex])
      winnerIndex = c;
    console.log(categories[c] + ": " + scores[c]);
  }

  console.log("Calculated Category: " + categories[winnerIndex]);
  return categories[winnerIndex];
}

let GetAge = function (dateOfBirth) {
  // -- Calculate Age of user birth date
  let ageDifMs = Date.now() - dateOfBirth.getTime();
  let ageDate = new Date(ageDifMs);
  return (Math.abs(ageDate.getUTCFullYear() - 1970)).toString();
}

let GetGender = function(gender) {
  // -- Get gender variable (0= Male, 1= Female)
  if(gender === "male")
    return '0';
  else
    return '1';
}
