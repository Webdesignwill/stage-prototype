
define([

],

function () {

  "use strict";

  var RegisterModel = Backbone.Model.extend({

    validation : {
      email : [{
        required : true,
        msg : 'Please enter you email'
      },{
        pattern : 'email',
        msg : 'Please enter a valid email'
      },{
        unique : '/api/me/unique',
        msg : 'This email is already registered'
      }],
      displayname : [{
        required : true,
        msg : 'Please provide a display name'
      }],
      password : [{
        required : true,
        msg : 'Please enter your password'
      },{
        rangeLength : [5, 14],
        msg : 'Your password must be between 5 and 14 characters'
      }]
    }
  });

  return RegisterModel;

});
