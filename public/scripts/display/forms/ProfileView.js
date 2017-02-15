
define([
  'Backbone',
  'App',
  'text!scripts/display/forms/templates/form.tpl'
], function (Backbone, App, template) {

  "use strict";

  var Profile = Backbone.View.extend({

    initialize : function (options) {
      this.options = options;
      this.form = new App.Forms();
      this.render();
    },

    render : function () {
      this.$el.html(template);
      var self = this;
      this.form.init(App.get('Me'), {
        name : 'Profile',
        action : 'put',
        validationModelName : 'ProfileModel',
        el : this.$el.find('form')
      }, self.done);
      return this;
    },

    done : function (result, data, status) {
      if(result) {
        App.trigger('modal:close');
      } else {
        alert('The was a problem updating your profile');
      }
    },

    close : function () {
      this.form.destroy();
    }

  });

  return Profile;

});