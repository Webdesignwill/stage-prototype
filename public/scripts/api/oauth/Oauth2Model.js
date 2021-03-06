
define([], function () {

  "use strict";

  var Oauth2Model = Backbone.Model.extend({

    namespace : 'wdw-',

    app : {
      secret : 'd2ViZGVpc25nd2lsbGlzbnRoZWJzdWVpbndoaHF5YmI6d2hlbm55b3V0aGluZ2t0aHN0YXdlYmRlaXNuZ3dpbGlzYWxtb3N0ZG9uZXRoZW5hb3l1a253b3doYXRqcWtpbnVyZW9rd2lhbXpuamNua24='
    },

    urls : {
      token : '/api/oauth/token'
    },

    defaults : {
      access_token: "",
      refresh_token: ""
    },

    initialize : function () {

      this.listenTo(this, 'change', function (oauth2) {
        this.setLocalStorage(oauth2);
      }, this);

      var localStorageProp;
      for(var key in this.defaults) {
        localStorageProp = window.localStorage.getItem(this.namespace + key);
        if(localStorageProp) {
          this.set(key, localStorageProp, {silent:true});
        }
      }
    },

    setLocalStorage : function (model) {
      if(model.keys().length) {
        for(var key in model.attributes) {
          window.localStorage.setItem(this.namespace + key, this.get(key));
        }
      } else {
        this.clearTokens();
      }
    },

    clearTokens : function () {
      for(var prop in this.defaults) {
        window.localStorage.removeItem(this.namespace + prop);
      }
    },

    refreshToken : function (done) {
      $.ajax({
        type : 'POST',
        context : this,
        url : this.urls.token,
        contentType : 'application/x-www-form-urlencoded',
        headers : {
          Authorization : 'Basic ' + this.app.secret
        },
        data : {
          'grant_type' : 'refresh_token',
          'refresh_token' : this.get('refresh_token')
        },
        success : function (data, status) {
          this.set({
            refresh_token : data.refresh_token,
            access_token : data.access_token
          });
          if(done) return done(true, data, status);
        },
        error : function (data, status) {
          if(done) return done(false, data, status);
        }
      });
    },

    requestAccessToken : function (user, done) {
      $.ajax({
        type : 'POST',
        context : this,
        url : this.urls.token,
        contentType : 'application/x-www-form-urlencoded',
        headers : {
          Authorization : 'Basic ' + this.app.secret
        },
        data : {
          'grant_type' : 'password',
          'username' : user.email,
          'password' : user.password
        },
        success : function (data, status) {
          this.set({
            refresh_token : data.refresh_token,
            access_token : data.access_token
          });
          if(done) return done(true, data, status);
        },
        error : function (data, status) {
          if(done) return done(false, data, status);
        }
      });
    }

  });

  return Oauth2Model;

});
