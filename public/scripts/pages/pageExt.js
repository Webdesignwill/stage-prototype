
define([
  'Backbone',
  'utils'
], function (Backbone, utils) {

  "use strict";

  Backbone.Page = Backbone.View.extend({

    constructor : function () {
      Backbone.View.prototype.constructor.apply(this, arguments);
    },

    open : function () {
      var self = this;

      function animationHandler () {
        utils.removeEvent(self.el, 'animationend');
        self.$el.removeClass('fade-in');
      }

      utils.prefixEvent(this.el, 'animationend', animationHandler);
      this.$el.addClass('fade-in');
    },

    close : function (done) {

      var $def = $.Deferred(),
            self = this;

      function animationHandler () {
        if(self.form) {
          self.form.destroy();
          delete self.form;
        }

        utils.removeEvent(self.el, 'animationend');

        self.stopListening();
        self.$el.off().remove();

        $def.resolve();
      }

      utils.prefixEvent(this.el, 'animationend', animationHandler);
      this.$el.addClass('fade-out');

      return $def;

    }
  });
});