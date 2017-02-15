
define([
  'Backbone',
  'App',
  'handlebars',
  'text!scripts/display/navbar/templates/navitem.tpl'
], function (Backbone, App, handlebars, template) {

  "use strict";

  var NavItem = Backbone.View.extend({

    tagName : 'li',

    initialize : function (options) {
      this.model = options.model;
      this.render();

      this.listenTo(App, 'change:page', function (event, data) {
        this.toggleActive(data);
      }, this);
    },

    toggleActive : function (data) {
      var action = data.name === this.model.get('name') ? 'addClass' : 'removeClass';
      this.$el[action]('active');
    },

    render : function () {
      var tpl = handlebars.compile(template);
      var compiled = tpl(this.model.attributes);

      this.$el.html(compiled);
      return this;
    }

  });

  return NavItem;

});