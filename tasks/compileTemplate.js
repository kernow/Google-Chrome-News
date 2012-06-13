var fs    = require('fs');
var _und  = require('../app/javascripts/vendor/underscore.min');

exports.compile = function(file){
  var template = fs.readFileSync(file, 'utf8');
  return _und.template(template).source;
};

exports.write = function(file, templates){
  var code = 'App.templates = {';
  _und.each(templates, function(template, key) {
    code += '"'+key+'": '+template+',';
  });
  code += '};';
  fs.writeFileSync(file, code, 'utf8');
};
