
define([],

function () {

  "use strict";

  var MailerModel = Backbone.Model.extend({

    urls : {
      contact : '/api/mail/contact'
    },

    contact : function (hash, done) {
      $.ajax({
        type : 'POST',
        context : this,
        url : this.urls.contact,
        contentType : 'application/x-www-form-urlencoded',
        data : {
          name: hash.name,
          contactEmail: hash.contactEmail,
          description: hash.description
        },
        success : function (data, status) {
          if(done) return done(true, data, status);
        },
        error : function (data, status) {
          if(done) return done(false, data, status);
        }
      });
    }

  });

  return MailerModel;

});
