
var nodemailer = require('nodemailer'),
    deferred = require('deferred'),
    path = require('path'),
    templatesDir = path.resolve(__dirname, '..', 'views/mailer');
    emailTemplates = require('email-templates');
    config = require('./../config/config')();

module.exports.sendMail = function (options, locals) {

  var def = deferred();

  emailTemplates(templatesDir, function (err, template) {

    var transporter = nodemailer.createTransport({
      service: config.mailer.service,
      secure: config.mailer.secure,
      port: config.mailer.port,
      auth: {
        user: config.mailer.user,
        pass: config.mailer.pass
      }
    });

    template(options.templateName, locals, function (err, html, text) {
      transporter.sendMail({
        from: config.mailer.hello,
        to: locals.email,
        subject: options.subject,
        html : html,
        text : text,
      }, function (error, res) {
        def.resolve();
      });
    });

  });

  return def.promise;

};
