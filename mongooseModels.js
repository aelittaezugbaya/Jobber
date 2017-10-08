const MONGOOSE = require('mongoose');

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
   PreferredCategory

 - Feedback
   ID
   UserSourceID
   UserReceiverID
   Comment
   Rating

*/

// -- Service Object
let serviceSchema = new MONGOOSE.Schema({
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
module.exports.Service = MONGOOSE.model('Service',
    serviceSchema,
    'Service');

// -- User Object
module.exports.User = MONGOOSE.model('User',
    new MONGOOSE.Schema({
      Rating: Number,
      FullName: String,
      Email: String,
      Hash: String,
      Salt: String,
      DateOfBirth: Date,
      Gender: String,
      Status: String,
      PreferredCategory: String
    }),
    'User');

// -- Feedback Object
module.exports.Feedback = MONGOOSE.model('Feedback',
    new MONGOOSE.Schema({
      UserSourceID: String,
      UserReceiverID: String,
      Comment: String,
      Rating: Number
    }),
    'Feedback');
