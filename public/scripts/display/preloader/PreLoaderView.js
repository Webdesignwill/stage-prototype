
define([
  'Backbone',
  'App',
  'Preloader'
], function (Backbone, App, Preloader) {

  "use strict";

  var PreLoaderView = Backbone.View.extend({

    el : $('.preloader'),

    initialize : function () {
      var self = this;
      this.ready = false;

      var timeoutLength = 3000;

      function clearPreloader () {
        self.$el.fadeOut('slow', function () {
          self.stopListening(); self.$el.off(); self.$el.remove();
        });
      }

      function testClearPreloader () {
        if(self.ready) {
          clearInterval(self.timer);
          clearPreloader();
        }
      }

      setTimeout(function () {
        self.ready = true;
      }, timeoutLength);

      $.when(Preloader.loadImages('preload')).then(function () {
        self.timer = setInterval(function () {
          testClearPreloader();
        }, 200);
      });
    }

  });

  return PreLoaderView;

});