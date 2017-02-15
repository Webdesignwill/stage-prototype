
define([

],

function () {

  "use strict";

  var ContactModel = Backbone.Model.extend({

    validation : {
      name : [{
        required : true,
        msg : 'Please enter your name'
      }],
      contactEmail : [{
        required : true,
        msg : 'Please enter your email'
      },{
        pattern : 'email',
        msg : 'Please enter a valid email'
      }],
      description : [{
        required : true,
        msg : 'Please let us know about your project'
      }]
    }
  });

  return ContactModel;

});
