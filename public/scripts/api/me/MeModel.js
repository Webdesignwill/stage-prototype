
define([],

function () {

  "use strict";

  var MeModel = Backbone.Model.extend({

    defaults : {
      loggedin : false
    },

    urls : {
      register : '/api/me/register',
      login : '/api/me/login',
      logout : '/api/me/logout',
      me : '/api/me',
      sendVerification : '/api/me/sendVerification',
      verify : '/api/me/verify'
    },

    initialize : function (app_inherit) {
      var self = this;

      this.App = app_inherit.App;

      this.App.on('user:logout', function () {
        self.logout();
      });

      if(this.App.get('Oauth2').get('refresh_token')) {
        this.App.get('Oauth2').refreshToken(function (result, data, status) {
          if (result) { return self.getMe(null); }
          this.App.get('Oauth2').clearTokens();
        });
      }
    },

    register : function (user, done) {
      $.ajax({
        type : 'POST',
        context : this,
        url : this.urls.register,
        contentType : 'application/x-www-form-urlencoded',
        data : user,
        success : function (data, status) {
          if(done) return done(true, data, status);
        },
        error : function (data, status) {
          if(done) return done(false, data, status);
        }
      });
    },

    sendVerification : function (done) {
      $.ajax({
        type : 'POST',
        context : this,
        url : this.urls.sendVerification,
        contentType : 'application/x-www-form-urlencoded',
        data : {email : this.get('email')},
        success : function (data, status) {
          if(done) return done(true, data, status);
        },
        error : function (data, status) {
          if(done) return done(false, data, status);
        }
      });
    },

    verify : function (done) {
      $.ajax({
        type : 'POST',
        context : this,
        url : this.urls.verify,
        contentType : 'application/x-www-form-urlencoded',
        data : {},
        success : function (data, status) {
          if(done) return done(true, data, status);
        },
        error : function (data, status) {
          if(done) return done(false, data, status);
        }
      });
    },

    login : function (user, done) {
      var self = this;
      this.App.get('Oauth2').requestAccessToken(user, function (result, data, status) {
        if (result) { return self.getMe(done); }
        done(false, data, status);
      });
    },

    getMe : function (done) {
      $.ajax({
        type : 'GET',
        context : this,
        url : this.urls.me,
        contentType : 'application/x-www-form-urlencoded',
        headers : {
          Authorization : 'Bearer ' + this.App.get('Oauth2').get('access_token')
        },
        success : function (data, status) {
          this.set(data);
          if(done) return done(true, data, status);
        },
        error : function (data, status) {
          if(data.status === 404) {
            this.App.get('Oauth2').clearTokens();
          }
          if(done) return done(false, data, status);
        }
      });
    },

    put : function (user, done) {
      $.ajax({
        type : 'PUT',
        context : this,
        url : this.urls.me,
        contentType : 'application/x-www-form-urlencoded',
        headers : {
          Authorization : 'Bearer ' + this.App.get('Oauth2').get('access_token')
        },
        data : user,
        success : function (data, status) {
          this.set(data);
          if(done) return done(true, data, status);
        },
        error : function (data, status) {
          if(done) return done(false, data, status);
        }
      });
    },

    deleteMe : function (done) {
      $.ajax({
        type : 'DELETE',
        context : this,
        url : this.urls.me,
        contentType : 'application/x-www-form-urlencoded',
        headers : {
          Authorization : 'Bearer ' + this.App.get('Oauth2').get('access_token')
        },
        success : function (data, status) {
          this.clearUser();
          if(done) return done(true, data, status);
        },
        error : function (data, status) {
          if(done) return done(false, data, status);
        }
      });
    },

    logout : function () {
      $.ajax({
        type : 'POST',
        context : this,
        url : this.urls.logout,
        contentType : 'application/x-www-form-urlencoded',
        headers : {
          Authorization : 'Bearer ' + this.App.get('Oauth2').get('access_token')
        },
        success : function (data, status) {
          this.clearUser();
        }
      });
    },

    clearUser : function () {
      this.clear({silent : true});
      this.App.get('Oauth2').clear();
      this.set(this.defaults);
    }

  });

  return MeModel;

});
