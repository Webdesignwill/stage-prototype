
var express = require('express'),
      bodyParser = require('body-parser'),
      oauthModel = require('./../app/models/oauth'),
      oauth2server = require('oauth2-server');

module.exports = function (app, config) {
  app.set('showStackError', true);

  app.use(express.static(config.root + '/public'));

  app.enable("jsonp callback");
  app.use(bodyParser());

  app.set('view engine', 'ejs');

  app.oauth = oauth2server({
    model: oauthModel,
    grants: ['password', 'refresh_token'],
    refreshTokenLifetime : 3600
  });

  function redirectSec(req, res, next) {
    if (req.headers['x-forwarded-proto'] == 'http') {
        res.redirect('https://' + req.headers.host + req.path);
    } else {
        return next();
    }
  }

  app.use(redirectSec);
  app.use(app.oauth.errorHandler());

};