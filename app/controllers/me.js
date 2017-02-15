
var User = require('./../models').User,
    Oauth = require('./../models/oauth'),
    mailer = require('./../mailer'),
    character = require('./../randomImage').characters;

function parseUserObject (user) {
  return {
    id : user.id,
    email : user.email,
    displayname : user.displayname,
    firstname : user.firstname,
    lastname : user.lastname,
    company : user.company,
    owner : user.owner,
    verified : user.verified,
    loggedin : true
  };
}

function logMeOut (req, res, next) {
  Oauth.deleteAccessToken(req, function () {
    Oauth.deleteRefreshToken(req, function () {
      res.send(200);
    });
  });
}

/* Register user
============================= */
module.exports.register = function (req, res, next) {
  User.register({
      displayname : req.body.displayname,
      email : req.body.email,
      password : req.body.password
    }, function (err, user) {
    if (err) return next(err);
    User.saveEmailHash(req, user, function (err, user) {
      if(err) next();
      mailer.sendMail({
        templateName : 'welcome',
        subject : 'Welcome to webdesignwill.io'
      }, user);
      res.json(parseUserObject(user));
    });
  });
};

/* Send verification email
============================= */
module.exports.sendVerification = function (req, res, next) {
  User.findOne({email : req.body.email}, function (err, user) {
    if(err) next();
      mailer.sendMail({
        templateName : 'verify',
        subject : 'Webdesignwill.io email verification'
      }, {
        email_verification_link : user.email_verification.link,
        email : user.email
      }).done(function () {
      res.send(200);
    });
  });
};

/* Verify email
============================= */
module.exports.verify = function (req, res, next) {
  User.findOne({'email_verification.key' : req.query.key}, function (err, user) {
    if(err) next();
    if(user) {
      if(user.verified) {
        res.render('pages/index', {
          message : 'Hmm. This email has already been verified.',
          character : character()
        });
      }
      if(req.protocol === user.email_verification.protocol && req.get('host') === user.email_verification.host && req.query.key === user.email_verification.key) {
        user.verified = true;
        user.save(function (err, user) {
          if(err) next();
          res.render('pages/index', {
            message : 'Success! Your email has been successfully verified.',
            character : character()
          });
        });
      } else {
        res.render('pages/index', {
          message : "Uh oh. We couldn't verify that email address.",
          character : character()
        });
      }
    } else {
      res.render('pages/index', {
        character : character()
      });
    }
  });
};

/* See if the email exists
============================= */
module.exports.unique = function (req, res, next) {
  User.findOne({ email : req.body.email }, function (err, user) {
    if (err) res.send(err);
    var statusCode = user ? 401 : 200;
    res.send(statusCode);
  });
};

/* Get me as the user
============================= */
module.exports.me = function (req, res, next) {
  User.findById(req.user.id, function (err, user) {
    if (err) next();
    if(user) {
      res.json(parseUserObject(user));
    } else {
      res.send(404);
    }
  });
};

/* Delete me as a user
============================= */
module.exports.deleteMe = function (req, res, next) {
  User.findById(req.user.id, function (err, user) {
    User.findByIdAndRemove(user.id, function (err) {
      if (err) res.send(err);
      logMeOut(req, res, next);
    });
  });
};

/* Update me a user
============================= */
module.exports.putMe = function (req, res, next) {
  // findByIdAndUpdate
  User.findById(req.user.id, function (err, user) {
    if (err) res.send(err);

    for(var key in req.body) {
      user[key] = req.body[key];
    }
    user.save(function (err, user) {
      if (err) res.send(err);
      res.json(parseUserObject(user));
    });
  });
};

/* Log me out
============================= */
module.exports.logout = function (req, res, next) {
  logMeOut(req, res, next);
};
