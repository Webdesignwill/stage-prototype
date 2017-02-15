
define([
  'Backbone',
  'App',
  'ModalView',
  'NavBar',
  'Stage',
  'text!scripts/display/body/templates/body.tpl'
], function (Backbone, App, ModalView, NavBar, Stage, template) {

  "use strict";

  var Body = Backbone.View.extend({

    el : 'body',

    initialize : function () {

      this.listenTo(App, 'change:status', function (app, prop) {
        if(prop === 'ready') {
          this.$el.removeClass('loading');
        }
      }, this);

      this.render();
      this.setElements();
      this.renderPageComponents();

      this.toggleClass(App.get('Me').get('loggedin'), 'loggedin');
    },

    /* Utility */
    toggleClass : function (att, cls) {
      this.$el[att ? 'addClass' : 'removeClass'](cls);
    },

    setElements : function () {
      this.$modal = this.$el.find('#modal');
      this.$appContent = this.$el.find('#app-content');
      this.$stage = this.$el.find('#stage');
      this.$navbar = this.$el.find('#navbar');
    },

    renderPageComponents : function () {

      new ModalView({
        el : this.$modal
      });

      new Stage({
        el : this.$stage
      });

      new NavBar({
        el : this.$navbar
      });

    },

    render : function () {
      this.$el.find('.app').html(template);
      return this;
    }
  });

  return new Body();

});
