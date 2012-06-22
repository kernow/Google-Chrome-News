/*global namespace: false, desc: false, task: false, jake: false, complete: false */

var fs        = require('fs');
var template  = require('./tasks/compileTemplate');

var templatesDir          = 'app/javascripts/templates';
var compiledTemplatesFile = 'app/javascripts/templates.js';

desc('Build the application.');
task('build', ['build:templates', 'build:docs']);

namespace('build', function () {
  desc('Precompile the applications templates.');
  task('templates', [], function () {
    jake.logger.log('Building the templates...');

    var files = fs.readdirSync(templatesDir);

    var templates = {};
    var i;
    for (i = 0; i < files.length; i++) {
      if (/\.jst$/.test(files[i])) {
        templates[files[i].replace(/\.jst$/, '')] = template.compile(templatesDir + '/' + files[i]);
        jake.logger.log('.');
      }
    }
    template.write(compiledTemplatesFile, templates);
    jake.logger.log('Finished compiling templates');
  });

  desc('Compile the documentation');
  task('docs', [], function(){
    jake.logger.log('Building documentation...');
    var commands = [
      "rm -r ./docs/*",
      "docco ./app/javascripts/background/*.js",
      "docco ./app/javascripts/lib/**/*.js",
      "docco ./app/javascripts/models/*.js",
      "docco ./app/javascripts/views/*.js",
      "docco ./app/javascripts/*.js"
    ];
    jake.exec(commands, function () {
      jake.logger.log('Documentation saved to docs folder');
      complete();
    });
  });
});
