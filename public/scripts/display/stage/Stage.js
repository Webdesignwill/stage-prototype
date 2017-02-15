
define([
  'Backbone',
  'App',
  'utils',
  'underscore',
  'require',
  'Parallax',
  'text!scripts/display/stage/templates/stage.tpl'
], function (Backbone, App, utils, _, app_require, Parallax, template) {

  "use strict";

  var Stage = Backbone.View.extend({

    initialLoad : false,
    name : null,

    initialize : function () {

      var self = this;

      this.listenTo(App, 'change:page', function (event, data) {
        if(this.initialLoad) {
          this.name = data.name;
          return this.clearStage();
        }
        this.el.className = 'stage-' + data.name;
        this.initialLoad = true;
      }, this);

      this.render();
      utils.prefixEvent(this.timerEl, 'animationend', function (event) {
        self.animationHandler(event);
      });

    },

    setElements : function () {
      this.$stage = this.$el.find('.scene');
      this.timerEl = this.el.querySelector('li:first-child > div');
    },

    animationHandler : function (event) {
      this[event.animationName]();
    },

    fadeOut : function () {
      this.el.className = 'build-stage stage-' + this.name;
    },

    fadeIn : function () {
      this.$el.removeClass('clear-stage build-stage');
    },

    clearStage : function (data) {
      var self = this;
      this.$el.addClass('clear-stage');
    },

    render : function () {
      this.$el.html(template);
      this.setElements();
      this.parallax = new Parallax(this.$stage[0]);
      return this;
    }
  });

  return Stage;

});