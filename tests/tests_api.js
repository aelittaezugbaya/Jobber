const CHAI = require('chai');
const EXPECT = chai.expect;
const ML = require('../ml/ml_cluster');

describe('API_MachineLearning', function() {
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

    expect(result).to.equal("");
  });
});
