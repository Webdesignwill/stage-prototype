
var relations = require('relations');

module.exports = function (app, config) {

  relations.use(relations.stores.mongoose);

};