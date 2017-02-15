var app_require = require.config({

  baseUrl: '/',
  context: 'app_require',

  packages: [{
    name: 'forms',
    location: 'scripts/forms'
  }, {
    name: 'api',
    location: 'scripts/api'
  }],

  paths: {

    config: 'scripts/config',

    jquery: 'scripts/libs/jquery/jquery.min',
    Parallax: 'scripts/libs/parallax/parallax.min',
    Backbone: 'scripts/libs/backbone/backbone.min',
    Validation: 'scripts/libs/backbone/backbone.validation.min',
    underscore: 'scripts/libs/underscore/underscore.min',
    handlebars: 'scripts/libs/handlebars/handlebars',
    text: 'scripts/libs/require/text.min',
    domReady: 'scripts/libs/require/domReady',
    bootstrap: 'scripts/libs/bootstrap/bootstrap.min',

    App: 'scripts/App',
    utils: 'scripts/utils',
    Router: 'scripts/Router',
    PageFactory: 'scripts/pages/PageFactory',
    Sitemap: 'scripts/Sitemap',
    Preloader: 'scripts/Preloader',

    /* Extensions */
    pageExt: 'scripts/pages/pageExt',

    /* Site models */
    PageModel: 'scripts/models/PageModel',

    /* Pages */
    DefaultPage: 'scripts/pages/store/DefaultPage',

    /* Views */
    PreLoaderView: 'scripts/display/preloader/PreLoaderView',
    BodyView: 'scripts/display/body/BodyView',
    ModalView: 'scripts/display/modal/ModalView',
    Stage: 'scripts/display/stage/Stage',
    NavBar: 'scripts/display/navbar/NavBar',
    NavItem: 'scripts/display/navbar/NavItem',

    /* Messages */
    VerifyReminderView: 'scripts/display/messages/VerifyReminderView',
    ThanksForRegisteringView: 'scripts/display/messages/ThanksForRegisteringView',

    /* Forms */
    LoginView: 'scripts/display/forms/LoginView',
    RegisterView: 'scripts/display/forms/RegisterView',
    ProfileView: 'scripts/display/forms/ProfileView'

  },
  shim: {
    'Backbone': {
      deps: ['jquery', 'underscore', 'handlebars'],
      exports: "Backbone"
    },
    'handlebars': {
      exports: 'Handlebars'
    },
    'bootstrap': {
      deps: ['jquery'],
      exports: 'bootstrap'
    },
    'Parallax': {
      exports: 'Parallax'
    }
  },
  deps: ['jquery', 'underscore', 'Backbone', 'domReady', 'bootstrap', 'pageExt', 'Validation'],
  callback: function($, _, Backbone, domReady, bootstrap, pageExt) {

    "use strict";

    domReady(function() {
      app_require(['App', 'PreLoaderView'], function(App, PreLoaderView) {
        new PreLoaderView();
        App.load();
      });
    });
  }
});
