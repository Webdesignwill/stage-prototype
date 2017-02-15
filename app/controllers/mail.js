
var mailer = require('./../mailer'),
    config = require('../../config/config')();

module.exports.contact = function (req, res, next) {

  mailer.sendMail({
    templateName : 'contact',
    subject : 'Contact from Webdesignwill'
  },{
    email : config.mailer.company,
    name: req.body.name,
    contactEmail: req.body.contactEmail,
    description: req.body.description
  });

  res.json({
    name : req.body.name,
    email : req.body.contactEmail
  });

};
