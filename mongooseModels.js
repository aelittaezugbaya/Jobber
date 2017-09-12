const mongoose = require('mongoose');

/*

Object List
 - Service
   ID
   UserOwnerID
   IsRequest
   Subject
   Category
   Location
   Status -> Open, Closed
   -
   Price
   -
   DateCreated
   Description

 - User
   ID
   Rating (Cached)
   FullName
   Email
   Password
   DateOfBirth
   Gender
   Description
   Status -> Active, Blocked, Deleted

 - Feedback
   ID
   UserSourceID
   UserReceiverID
   Comment
   Rating

*/

var serviceSchema = new mongoose.Schema({
  UserOwnerID: String,
  IsRequest: Boolean,
  Subject: String,
  Category: String,
  Location: {
    type: { type: String },
    coordinates: []
  },
  Gender: String,
  Description: String,
  Status: String
})
serviceSchema.index({ Location: '2dsphere' });
module.exports.Service = mongoose.model('Service',
    serviceSchema,
    'Service');

module.exports.User = mongoose.model('User',
    new mongoose.Schema({
      Rating: Number,
      FullName: String,
      Email: String,
      Password: String,
      DateOfBirth: Date,
      Gender: String,
      Description: String,
      Status: String
    }),
    'User');

module.exports.Feedback = mongoose.model('Feedback',
    new mongoose.Schema({
      UserSourceID: String,
      UserReceiverID: String,
      Comment: String,
      Rating: Number
    }),
    'Feedback');
