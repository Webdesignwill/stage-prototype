
define([
  'Backbone',
  'App',
  'text!scripts/display/forms/templates/form.tpl'
], function (Backbone, App, template) {

  "use strict";

  var Register = Backbone.View.extend({

    initialize : function (options) {
      this.options = options;
      this.form = new App.Forms();
      this.render();
    },

    render : function () {
      this.$el.html(template);
      var self = this;
      this.form.init(App.get('Me'), {
        name : 'Register',
        action : 'register',
        validationModelName : 'RegisterModel',
        el : this.$el.find('form')
      }, self.done);
      return this;
    },

    done : function (result, data, status) {
      if(result) {
        return App.trigger('modal:open', {
          size : 'small',
          view : 'ThanksForRegisteringView'
        });
      } else {
        alert('There was a problem registering you as a user');
      }
    },

    close : function () {
      this.form.destroy();
    }

  });

  return Register;

});
