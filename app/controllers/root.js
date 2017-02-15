
var phantom = require('phantom'),
      deferred = require('deferred'),
      config = require('../../config/config')(),
      characters = require('./../randomImage').characters,
      postIcons = require('./../randomImage').postIcons;

module.exports = function (req, res, next) {

  var options = {
    hostname: config.ip,
    path: require('path').dirname(config.phantom_executable) + '/'
  };

  if(req.query._escaped_fragment_ !== undefined) {
    phantom.create(function (ph) {

      ph.createPage(function (page) {
        return page.open('http://' + config.ip + ':' + config.port + '/#!' + req.query._escaped_fragment_, function (status) {

          function appReady () {

            var def = deferred();

            function test (result) {
              if(result) {
                clearInterval(poll);
                def.resolve(result);
              }
            }

            var poll = setInterval(function () {
              page.evaluate(function () {
                if(document.querySelector('.all-loaded')) {
                  return document.querySelector('.all-loaded').innerHTML;
                }
              }, test);
            }, 500);

            return def.promise;
          }

          appReady().done(function (result) {
            // TODO Send back the URL based on Google spec. Should send back the proper !#
            ph.exit();
            res.send(200, result);
          });
        });
      });
    }, options);
  } else {
    res.render('pages/index', {
      character : characters(),
      postIcon : postIcons()
    });
  }
};
