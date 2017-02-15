define(function(require, exports, module) {
  module.exports = function() {
    return {
      baseUrl: '/scripts/api',
      context: 'api_require',
      paths: {

        config: '../config',

        Api: 'Api',

        MeModel: 'me/MeModel',
        Oauth2Model: 'oauth/Oauth2Model',
        MailerModel: 'mailer/MailerModel'
      },
      deps: ['Api']
    };
  };
});
