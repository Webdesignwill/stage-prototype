
var Controllers = require('./../app/controllers');

module.exports = function (app) {

  app.get('/', Controllers.Root);

  app.get('/verify', Controllers.Me.verify);

  app.post('/api/oauth/token', app.oauth.grant());

  app.post('/api/mail/contact', Controllers.Mail.contact);

  app.post('/api/me/sendVerification', Controllers.Me.sendVerification);
  app.post('/api/me/unique', Controllers.Me.unique);
  app.post('/api/me/register', Controllers.Me.register);
  app.get('/api/me', app.oauth.authorise(), Controllers.Me.me);
  app.delete('/api/me', app.oauth.authorise(), Controllers.Me.deleteMe);
  app.put('/api/me', app.oauth.authorise(), Controllers.Me.putMe);
  app.post('/api/me/logout', app.oauth.authorise(), Controllers.Me.logout);

  app.get('/api/users/all', app.oauth.authorise(), Controllers.Users.all);
};
