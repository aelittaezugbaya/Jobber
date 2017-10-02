const CHAI = require('chai');
const EXPECT = CHAI.expect;
const ML = require('../ml/ml_cluster');

require('dotenv').config()
const MONGOOSE = require('mongoose');
MONGOOSE.connect('mongodb://' + process.env.mongo_user + ':' + process.env.mongo_pass + '@ds133054.mlab.com:33054/jobber');
const MODELS = require('../mongooseModels');

describe('MachineLearningTest', function() {
  it('Calculate should return a String with a category.', function() {

    let newObject = { parameters: [23, 1, 50, 27] }
    let otherObjects = [
      // age , gender, lat, lon
      { parameters: [23, 1, 49, 26], category: "HouseWork" },
      { parameters: [11, 0, 0, 0], category: "HouseWork" },
      { parameters: [11, 0, 0, 0], category: "Beauty" },
      { parameters: [23, 1, -34, 129], category: "Beauty" }
    ]
    let limits = [
      [10, 80], [0, 1], [-90, 90], [-180, 180]
    ]
    let weights = [
      1, 0.5, 10, 10
    ]
    let categories = [
      "HouseWork", "Beauty", "AnimalCare"
    ]

    let result = ML.Calculate(newObject, otherObjects, limits, weights, categories);

    EXPECT(result).to.equal("HouseWork");
  });
});

describe('GetUserTest', function() {
  it('Test that we can get a user.', async function() {
    let user = await MODELS.User.findOne({ _id: "59c6796e21cc7a18b276bc22" });
    EXPECT(user.Email).to.equal("sergey@gmail.com");
  });
});

describe('GetServiceTest', function() {
  it('Test that we can get a service.', async function() {
    let service = await MODELS.Service.findOne({ _id: "59ba40426d3bfd0274f0e0b7" });
    EXPECT(service.Category).to.equal("Dog walking");
  });
});

describe('GetFeedbackTest', function() {
  it('Test that we can get a feedback.', async function() {
    let feedback = await MODELS.Feedback.findOne({ _id: "59ce8582d3b60b3938a61345" });
    EXPECT(feedback.Rating).to.equal(5);
  });
});

describe('CountFeedbackTest', function() {
  it('Test that the correct number of feedback items is returned.', async function() {
    let feedbacks = await MODELS.Feedback.find({ UserReceiverID: "59c6796e21cc7a18b276bc22" });
    EXPECT(feedbacks.length).to.equal(5);
  });
});

