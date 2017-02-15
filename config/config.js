
var path = require('path'),
    rootPath = path.normalize(__dirname + '/..');

var clientCredentials = {
  clientId : 'webdeisngwillisnthebsueinwhhqybb',
  clientSecret : 'whennyouthingkthstawebdeisngwilisalmostdonethenaoyuknwowhatjqkinureokwiamznjcnkn'
};

var mailer = {
  company : 'will@webdesignwill.io',
  service: 'GandiMail',
  secure: false,
  port: 587,
  user: 'transport@webdesignwill.io',
  hello: 'hello@webdesignwill.io',
  pass: 'aWxvdmV0aGViZXN0dGhpbmdzaW5saWZl'
};

var config = {
  development : {
    ip : '127.0.0.1',
    port : 5000,
    db : 'mongodb://127.0.0.1:27017/webdesignwill',
    root : rootPath,
    clientId : clientCredentials.clientId,
    clientSecret : clientCredentials.clientSecret,
    mailer : mailer,
    phantom_executable : '/usr/local/bin/phantomjs'
  },
  production : {
    ip : process.env.OPENSHIFT_NODEJS_IP,
    port : process.env.OPENSHIFT_NODEJS_PORT,
    db : process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" + process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" + process.env.OPENSHIFT_MONGODB_DB_HOST + ':' + process.env.OPENSHIFT_MONGODB_DB_PORT + '/' + process.env.OPENSHIFT_APP_NAME,
    root : rootPath,
    clientId : clientCredentials.clientId,
    clientSecret : clientCredentials.clientSecret,
    mailer : mailer,
    phantom_executable : process.env.OPENSHIFT_DATA_DIR + "/phantomjs-1.6.1-linux-x86_64-dynamic/bin/phantomjs"
  }
};

module.exports = function () {
  var env = process.env.NODE_ENV || 'development';
  return config[env];
};
