
module.exports.characters = function () {
  var names = ['finch', 'finch-space', 'sybil', 'hattrick'];
  return names[Math.floor((Math.random() * names.length))] + '-full';
};

module.exports.postIcons = function () {
  var urls = [
      'icon-brocoli-brains.png',
      'icon-crab.png',
      'icon-kiwi-arrow.png',
      'icon-lemon-settings.png',
      'icon-pencil-carot.png',
      'icon-union-light.png',
      'icon-video.png'
  ];
  return urls[Math.floor((Math.random() * urls.length))];
};