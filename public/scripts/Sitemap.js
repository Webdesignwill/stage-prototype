
define([
  'Backbone',
  'App',
  'PageModel'
],

function (Backbone, App, PageModel) {

  "use strict";

  var Sitemap = Backbone.Collection.extend({

    model : PageModel,

    initialize : function () {
      this.listenTo(this, 'add', function (page) {
        console.log('%c Page ' + page.get('title') + ' added ', 'background: #222222; color: #00FF00;');
      }, this);
    },

    parse : function (model) {
      return model;
    }
  });

  return new Sitemap();

});