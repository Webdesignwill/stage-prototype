define(function (require, exports, module) {
  module.exports = function() {
    return {

      "images": {
        "preload": [
          "/assets/img/pages/about/layer-1.png",
          "/assets/img/pages/about/layer-2.png",
          "/assets/img/pages/about/layer-3.png",
          "/assets/img/pages/about/layer-4.png",
          "/assets/img/pages/about/layer-5.png",
          "/assets/img/pages/about/layer-6.png",
          "/assets/img/pages/about/layer-7.png",
          "/assets/img/pages/about/layer-8.png",

          "/assets/img/pages/home/layer-1.png",
          "/assets/img/pages/home/layer-2.png",
          "/assets/img/pages/home/layer-3.png",
          "/assets/img/pages/home/layer-4.png",
          "/assets/img/pages/home/layer-5.png",
          "/assets/img/pages/home/layer-6.png",
          "/assets/img/pages/home/layer-7.png",
          "/assets/img/pages/home/layer-8.png",

          "/assets/img/pages/friends/layer-1.png",
          "/assets/img/pages/friends/layer-2.png",
          "/assets/img/pages/friends/layer-3.png",
          "/assets/img/pages/friends/layer-4.png",
          "/assets/img/pages/friends/layer-5.png",
          "/assets/img/pages/friends/layer-6.png",
          "/assets/img/pages/friends/layer-7.png",
          "/assets/img/pages/friends/layer-8.png",

          "/assets/img/pages/contact/layer-1.png",
          "/assets/img/pages/contact/layer-2.png",
          "/assets/img/pages/contact/layer-3.png",
          "/assets/img/pages/contact/layer-4.png",
          "/assets/img/pages/contact/layer-5.png",
          "/assets/img/pages/contact/layer-6.png",
          "/assets/img/pages/contact/layer-7.png",
          "/assets/img/pages/contact/layer-8.png",

          "/assets/img/pages/services/layer-1.png",
          "/assets/img/pages/services/layer-2.png",
          "/assets/img/pages/services/layer-3.png",
          "/assets/img/pages/services/layer-4.png",
          "/assets/img/pages/services/layer-5.png",
          "/assets/img/pages/services/layer-6.png",
          "/assets/img/pages/services/layer-7.png",
          "/assets/img/pages/services/layer-8.png"
        ]
      },

      pages: [{
        "_id": "03a8f5726f01f738b875218906f21583",
        "title": "Home",
        "name": "home",
        "path": "",
        "page": "DefaultPage",
        "template": "home",
        "homepage": true
      }, {
        "_id": "9d78f28a42c88d6381a8f0a456be63ca",
        "title": "Services",
        "name": "services",
        "path": "services",
        "page": "DefaultPage",
        "template": "services"
      }, {
        "_id": "a2719b3a03dd493f593058a0d42a65a8",
        "title": "About",
        "name": "about",
        "path": "about",
        "page": "DefaultPage",
        "template": "about"
      }, {
        "_id": "73559018ccc597265e6c22aa7609bb97",
        "title": "Friends",
        "name": "friends",
        "path": "friends",
        "page": "DefaultPage",
        "template": "friends"
      }, {
        "_id": "05f97653596c6948bad2b8c9a0736180",
        "title": "Contact",
        "name": "contact",
        "path": "contact",
        "page": "DefaultPage",
        "template": "contact"
      }]
    };
  };
});