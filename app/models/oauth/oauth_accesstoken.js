
var mongoose = require('mongoose');

var OAuthAccessTokensSchema = new mongoose.Schema({
  accessToken: {
    type: String,
    required: true,
    unique: true
  },
  clientId: String,
  userId: {
    type: String,
    required: true
  },
  expires: Date
});

module.exports.getAccessToken = function(bearerToken, callback) {
  OAuthAccessTokensModel.findOne({ accessToken: bearerToken }, callback);
};

module.exports.saveAccessToken = function(token, clientId, expires, userId, callback) {
  if (userId.id) {
    userId = userId.id;
  }
  var accessToken = new OAuthAccessTokensModel({
    accessToken: token,
    clientId: clientId,
    userId: userId,
    expires: expires
  });
  accessToken.save(callback);
};

module.exports.deleteAccessToken = function(req, callback) {
  OAuthAccessTokensModel.findOneAndRemove({ userId: req.user.id }, callback);
};

mongoose.model('oauth_accesstokens', OAuthAccessTokensSchema);
var OAuthAccessTokensModel = mongoose.model('oauth_accesstokens');