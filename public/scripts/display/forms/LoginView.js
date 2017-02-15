
define([
  'Backbone',
  'App',
  'text!scripts/display/forms/templates/form.tpl'
], function (Backbone, App, template) {

  "use strict";

  var Login = Backbone.View.extend({

    initialize : function (options) {
      this.options = options;
      this.form = new App.Forms();
      this.render();
    },

    render : function () {
      this.$el.html(template);
      var self = this;
      this.form.init(App.get('Me'), {
        name : 'Login',
        action : 'login',
        validationModelName : 'LoginModel',
        el : this.$el.find('form')
      }, self.done);
      return this;
    },

    done : function (result, data, status) {
      if(result) {
        if(!data.verified) {
          return App.trigger('modal:open', {
            size : 'small',
            view : 'VerifyReminderView'
          });
        }
        App.trigger('modal:close');
      } else {
        alert('There was a problem logging you in');
      }
    },

    close : function () {
      this.form.destroy();
    }

  });

  return Login;

});
