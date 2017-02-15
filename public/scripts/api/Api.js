
define([
  'require'
], function (api_require) {

  "use strict";

  var Api = function () {

    return function (module) {
      var deferred = $.Deferred();
      api_require([module], function (module) {
        deferred.resolve(module);
      });
      return deferred.promise();
    };
  };

  return new Api();

});