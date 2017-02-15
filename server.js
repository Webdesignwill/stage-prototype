
var express = require('express'),
      debug = require('debug')('webdesignwill');

var config = require('./config/config')(),
      mongoose = require('mongoose'),
      http = require('http');

// Database
var db = mongoose.connect(config.db);

var app = express(),
      server = http.createServer(app);

// settings
require('./config/express')(app, config);
require('./config/routes')(app);

server.listen(config.port, config.ip, function () {
  console.log('IP : ' + config.ip + ' PORT ' + config.port);
});

// expose app
exports = module.exports = app;