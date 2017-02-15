
// http://www.webdeveasy.com/optimize-requirejs-projects/

({
  optimize: 'uglify',
  useStrict: true,
  baseUrl: './public/scripts',
  out : './dist/js',
  removeCombined: true,
  modules : [{
    name: 'main'
  },{
    name: 'forms/forms'
  },{
    name: 'api/api'
  }],
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
    'parallax': {
      deps: ['jquery'],
      exports: 'parallax'
    }
  }
});