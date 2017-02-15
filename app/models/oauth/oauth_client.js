
var env = process.env.NODE_ENV || 'development',
      config = require('./../../../config/config')(),
      mongoose = require('mongoose');

var OAuthClientsSchema = new mongoose.Schema({
  clientId: {
    type : String,
    default : config.clientId
  },
  clientSecret: {
    type : String,
    default : config.clientSecret
  },
  redirectUri: {
    type : String,
    default : '/oauth/redirect'
  }
});

OAuthClientsSchema.statics.getClient = function (clientId, clientSecret, callback) {
  var params = { clientId : clientId };
  if (clientSecret !== null) {
    params.clientSecret = clientSecret;
  }
  OAuthClientsModel.findOne(params, callback);
};

OAuthClientsSchema.statics.grantTypeAllowed = function (clientId, grantType, callback) {
  if (grantType === 'password') {
    return callback(false, config.clientId.indexOf(clientId) >= 0);
  }
  callback(false, true);
};

mongoose.model('oauth_clients', OAuthClientsSchema);
var OAuthClientsModel = mongoose.model('oauth_clients');
module.exports = OAuthClientsModel;

/* FIRST TIME ONLY */
OAuthClientsModel.findOne(function (err, oauthClient) {
  if(!oauthClient) OAuthClientsModel.create({});
});