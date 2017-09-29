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
   Price
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
   Status -> Active, Blocked, Deleted

 - Feedback
   ID
   UserSourceID
   UserReceiverID
   Comment
   Rating

*/

// -- Service Object
var serviceSchema = new mongoose.Schema({
  UserOwnerID: String,
  IsRequest: Boolean,
  Subject: String,
  Category: String,
  Location: { type: { type: String }, coordinates: [Number]},
  Gender: String,
  Description: String,
  Price: Number,
  Status: String,
  DateCreated: Date
});

serviceSchema.index({ Location: '2dsphere' });
module.exports.Service = mongoose.model('Service',
    serviceSchema,
    'Service');

// -- User Object
module.exports.User = mongoose.model('User',
    new mongoose.Schema({
      Rating: Number,
      FullName: String,
      Email: String,
      Description: String,
      Hash: String,
      Salt: String,
      DateOfBirth: Date,
      Gender: String,
      Status: String
    }),
    'User');

// -- Feedback Object
module.exports.Feedback = mongoose.model('Feedback',
    new mongoose.Schema({
      UserSourceID: String,
      UserReceiverID: String,
      Comment: String,
      Rating: Number
    }),
    'Feedback');
