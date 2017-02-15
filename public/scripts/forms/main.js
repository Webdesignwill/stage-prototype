
define(function (require, exports, module) {

  "use strict";

  module.exports = function() {
    return {
      baseUrl: '/scripts/forms/',
      context: 'app_forms',
      paths: {

        text: '../libs/require/text.min',
        handlebars: '../libs/handlebars/handlebars',

        Forms: 'Forms',
        FormView: 'FormView',

        valExt: 'valExt',

        // User
        LoginModel: 'login/LoginModel',
        ProfileModel: 'profile/ProfileModel',
        RegisterModel: 'register/RegisterModel',

        // components
        TextInput: 'components/TextInput',
        TextArea: 'components/TextArea'
      },
      deps: ['Forms', 'valExt']
    };
  };
});