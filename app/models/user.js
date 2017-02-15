
var mongoose = require('mongoose'),
      bcrypt = require('bcrypt-nodejs');

var OAuthUsersSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  verified : {
    type : Boolean,
    default : false
  },
  owner : {
    type : Boolean,
    default : false
  },
  displayname : {
    type : String,
    default : 'Display name'
  },
  firstname: {
    type : String,
    default : 'First name'
  },
  lastname: {
    type : String,
    default : 'Last name'
  },
  company: {
    type : String,
    default : 'Company name'
  },
  email_verification : {
    key : String,
    protocol : String,
    host : String,
    link : String
  },
  hashed_password: {
    type: String,
    required: true
  },
  password_reset_token: {
    // type: String,
    // unique: true
  },
  reset_token_expires: Date
});

function hash(string) {
  var salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(string, salt);
}

OAuthUsersSchema.statics.saveEmailHash = function (req, user, callback) {
  // TODO Exprire this key after 14 days or something
  user.email_verification.key = hash(user.email + user.password);
  user.email_verification.host = req.get('host');
  user.email_verification.protocol = req.protocol;
  user.email_verification.link = user.email_verification.protocol + '://' + user.email_verification.host + '/verify?key=' + user.email_verification.key;

  user.save(callback);
};

OAuthUsersSchema.statics.register = function (fields, callback) {
  fields.hashed_password = hash(fields.password);
  delete fields.password;
  var user = new OAuthUsersModel(fields);
  user.save(callback);
};

OAuthUsersSchema.statics.getUser = function (email, password, callback) {
  OAuthUsersModel.findOne({ email : email }, function (err, user) {
    if (err || !user) return callback(err, user);
    callback(null, bcrypt.compareSync(password, user.hashed_password) ? user : null);
  });
};

mongoose.model('users', OAuthUsersSchema);
var OAuthUsersModel = mongoose.model('users');
module.exports = OAuthUsersModel;