
define([

], function () {

  "use strict";

  var Utils = function () {

    var pfx = ["webkit", "moz", "MS", "o", ""];

    return {
      prefixEvent : function (element, type, callback) {
        for (var p = 0; p < pfx.length; p++) {
          if (!pfx[p]) type = type.toLowerCase();
          element.addEventListener(pfx[p]+type, callback, false);
        }
      },
      removeEvent : function (element, type, callback) {
        for (var p = 0; p < pfx.length; p++) {
          if (!pfx[p]) type = type.toLowerCase();
          element.removeEventListener(pfx[p]+type, callback, false);
        }
      }
    };
  };

  return new Utils();

});