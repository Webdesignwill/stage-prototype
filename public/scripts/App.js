
define([
  'Backbone',
  'require',
  'config'
], function (Backbone, app_require, config) {

  "use strict";

  var App = Backbone.Model.extend({

    defaults : {
      Oauth2 : null,
      Me : null,
      Router : null,
      status : null,
      message : null
    },

    initialize : function () {

      var to;

      this.listenTo(this, 'change', function (app) {
        for(var key in app.changed) {
          to = typeof app.changed[key] !== 'object' ? ' to : ' + app.changed[key] + ' ' : ' ';
          console.log('%c App changed ' + key + to, 'background: #222222; color: #00feff;');
        }
      }, this);
    },

    load : function () {

      var self = this;

      function getApi () {
        app_require(['api'], function (config) {
          function load () {
            req(['Api'], function (Api) {
              self.Api = Api;
              getOauth2();
            });
          }
          var req = window.require(config(), load);
        });
      }

      function getOauth2 () {
        self.Api('Oauth2Model').then(function (Oauth2Model) {
          self.set('Oauth2', new Oauth2Model());
          getMe();
        });
      }

      function getMe () {
        self.Api('MeModel').then(function (MeModel) {
          self.set('Me', new MeModel({
            App : self
          }));
          getMailer();
        });
      }

      function getMailer () {
        self.Api('MailerModel').then(function (MailerModel) {
          self.set('Mailer', new MailerModel());
          getForms();
        });
      }

      function getForms () {
        app_require(['forms'], function (config) {
          function load () {
            req(['Forms'], function (Forms) {
              self.Forms = Forms;
              getRouter();
            });
          }
          var req = window.require(config(), load);
        });
      }

      function getRouter () {
        app_require(['Router'], function (Router) {
          self.set('Router', new Router());
          loadPages();
        });
      }

      function loadPages () {
        self.get('Sitemap').add(config().pages, {parse:true});
        getBody();
      }

      function getBody () {
        app_require(['BodyView'], function (BodyView) {
          self.start();
        });
      }

      app_require(['Sitemap'], function (Sitemap) {
        self.set('Sitemap', Sitemap);
        getApi();
      });

      app_require(['Preloader']);

    },

    start : function () {

      this.set({
        status : 'ready',
        message : 'Enjoy'
      });

      var hash = window.location.hash,
            initialPage = hash ? hash : '!/';

      Backbone.history.start();
      this.get('Router').navigate(initialPage, {trigger : true});

      window.App = this;

    }
  });

  return new App();

});
