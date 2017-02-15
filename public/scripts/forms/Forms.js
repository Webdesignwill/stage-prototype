
define([
  'require'
], function (forms_require) {

  "use strict";

  var Forms = function () {

    var formView = {},
        self = this,
        model,
        apiResource,
        action,
        done;

    function loadForm () {
      forms_require(['FormView'], function (FormView) {

        formView = new FormView({
          validationModelName : self.options.validationModelName,
          name : self.options.name,
          el : self.options.el,
          displayModel : apiResource
        });

        formView.$formChannel.on('valid', formValid);

        self.options.el.height('auto');
      });
    }

    function formValid (event, options) {
      makeRequest(options, function (result, data, status) {
        done(result, data, status);
      });
    }

    function makeRequest (options, done) {
      apiResource[action](options.validationModel.attributes, function (result, data, status) {
        if(!result) {
          formView.$formChannel.trigger('error');
        }
        done(result, data, status);
      });
    }

    function formCancel () {
      formView.destroy();
      done('close', null, null);
    }

    function clear () {
      formView.clear();
    }

    function destroy () {
      formView.destroy();
    }

    function init (r, options, d) {
      self.options = options;
      apiResource = r;
      action = options.action;
      done = d;

      return loadForm();
    }

    return {
      init : init,
      destroy : destroy
    };

  };

  return Forms;

});
