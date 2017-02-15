
define([
  'Backbone',
  'App',
  'require',
  'handlebars'
], function (Backbone, App, app_require, handlebars) {

  "use strict";

  var DefaultPage = Backbone.Page.extend({

    className : 'page',

    initialize : function (options) {
      this.deferred = $.Deferred();
      this.model = options.model;
      this.$container = options.$container;
      this.$el.addClass(options.id);
      this.loadTemplate();
    },

    loadTemplate : function () {
      var self = this;
      app_require(['text!templates/page/' + this.model.get('template') + '.tpl'], function (template) {
        self.render(template);
      });
    },

    render : function (template) {

      var renderObject = {
        user : App.get('Me').attributes,
        page : this.model.attributes
      };

      var tpl = handlebars.compile(template);
      var compiled = tpl(renderObject);

      this.$el.html(compiled);
      this.$container.html(this.el);

      this.deferred.resolve();

      return this;
    },

    ready : function () {
      return this.deferred;
    }

  });

  return DefaultPage;

});