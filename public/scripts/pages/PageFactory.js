
define([
  'Backbone',
  'App'
], function (Backbone, App) {

    "use strict";

    var PageFactory = function () {

      function closePage (done) {
        var page = App.get('page');
        if(page && typeof page.view.close === 'function') {
          return $.when(page.view.close()).then(done);
        }
        done();
      }

      this.make = function ($container, pageModel, Page, identifier) {

        App.set({
          nextPage : {
            id : pageModel.get('id'),
            model : pageModel
          },
          prevPage : {
            id : App.get('page', 'id'),
            model : App.get('page', 'model')
          }
        });

        function produce () {
          var page = new Page({
            model : pageModel,
            id : pageModel.get('name') + '-page',
            identifier : identifier || null,
            $container : $container
          });

          $.when(page.ready()).then(function () {
            App.set('page', {
              name : pageModel.get('name'),
              id : pageModel.get('id'),
              view : page,
              model : pageModel
            });

            page.open();
          });
        }

        closePage(produce);

      };
    };

    return PageFactory;

});