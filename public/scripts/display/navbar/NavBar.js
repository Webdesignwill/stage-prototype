
define([
  'Backbone',
  'App',
  'NavItem',
  'handlebars'
], function (Backbone, App, NavItem, handlebars) {

  "use strict";

  var NavBar = Backbone.View.extend({

    initialize : function () {
      this.sitemap = App.get('Sitemap');
      this.render();
    },

    render : function () {

      var item,
            $ul = $('<ul class="clearfix text-center" />');

      this.sitemap.each(function (model, index, array) {
        item = new NavItem({
          model : model
        });
        $ul.append(item.el);
      });


      this.$el.html($ul);
      return this;
    }

  });

  return NavBar;

});