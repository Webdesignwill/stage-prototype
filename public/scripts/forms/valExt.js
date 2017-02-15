
define([

], function () {

  "use strict";

  _.extend(Backbone.Model.prototype, Backbone.Validation.mixin);

  _.extend(Backbone.Validation.patterns, {
    currency: /^[$\-\s]*[\d\,]*?([\.]\d{0,2})?\s*$/
  });

  _.extend(Backbone.Validation.validators, {

    unique : function (value, attr, customValue, model) {

      var req = {},
          reqProps = {};

      req[attr] = value;

      if(!this.required(value, attr, customValue, model)) {
          reqProps.type = 'POST';
          reqProps.async = false;
          reqProps.context = this;
          reqProps.url = customValue;
          reqProps.contentType = 'application/x-www-form-urlencoded';
          reqProps.data = req;
        }
        return $.ajax(reqProps).status === 200 ? false : true;
      }
    });
});
