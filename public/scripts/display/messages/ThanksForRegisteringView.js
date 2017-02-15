
define([
  'Backbone',
  'App',
  'text!scripts/display/messages/templates/thanksForRegistering.tpl'
], function (Bakbone, App, template) {

  "use strict";

  var ThanksForRegistering = Backbone.View.extend({

    events : {
      'click .resend-verification-email' : 'handler'
    },

    initialize : function () {
      this.render();
    },

    handler : function () {
      App.get('Me').sendVerification(this.done);
    },

    done : function (result, data, status) {
      if(result) {
        App.trigger('modal:close');
      } else {
        alert('There was a problem resending your email');
      }
    },

    render : function () {
      this.$el.html(template);
    },

    close : function () {
      this.$el.off();
      this.$el.empty();
    }

  });

  return ThanksForRegistering;

});