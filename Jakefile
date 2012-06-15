/*global namespace: false, desc: false, task: false */

var fs        = require('fs');
var template  = require('./tasks/compileTemplate');

var templatesDir          = 'app/javascripts/templates';
var compiledTemplatesFile = 'app/javascripts/templates.js';

desc('Build the application.');
task('build', ['build:templates']);

namespace('build', function () {
  desc('Precompile the applications templates.');
  task('templates', [], function (params) {
    console.log('Building the templates...');

    var files = fs.readdirSync(templatesDir);

    var templates = {};
    var i;
    for (i = 0; i < files.length; i++) {
      if (/\.jst$/.test(files[i])) {
        templates[files[i].replace(/\.jst$/, '')] = template.compile(templatesDir + '/' + files[i]);
        console.log('.');
      }
    }
    template.write(compiledTemplatesFile, templates);
    console.log('Finished compiling templates');
  });
});