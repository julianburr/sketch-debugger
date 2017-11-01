var fs = require('fs-extra');
var chalk = require('chalk');
var webpack = require('webpack');

var webpackConfig = require('../../config/plugin/webpack');
var paths = require('../../config/plugin/paths');

var manifest = require('../../src/plugin/manifest.json');
var pkg = require('../../package.json');

function build (callback) {
  console.log(chalk.grey.italic('Build plugin'));

  console.log('  ✓ Remove old build...');
  fs.emptyDirSync(paths.build);

  webpack(webpackConfig).run((err, stats) => {
    // Catch all errors
    var error = null;
    if (err) {
      error = err;
    } else if (stats.compilation.errors.length) {
      error = stats.compilation.errors;
    } else if (process.env.CI && stats.compilation.warnings.length) {
      error = stats.compilation.warnings;
    }

    if (error) {
      callback(error);
      return;
    }

    // HACK!
    // Add global handlers
    console.log('  ✓ Add global handlers');
    manifest.commands.forEach(function (command) {
      var file = paths.build + '/' + command.script;
      var compiled = fs.readFileSync(file);
      if (command.handler) {
        compiled +=
          '\n\nvar ' + command.handler + ' = handlers.' + command.handler + ';';
      } else if (command.handlers && command.handlers.actions) {
        Object.keys(command.handlers.actions).map(action => {
          const handler = command.handlers.actions[action];
          compiled += '\n\nvar ' + handler + ' = handlers.' + handler + ';';
        });
      }
      fs.writeFileSync(file, compiled);
    });

    // Copy manifest.json + add version number form manifest
    console.log('  ✓ Copy manifest (version ' + pkg.version + ')');
    manifest.version = pkg.version;
    fs.outputJson(paths.build + '/manifest.json', manifest);

    // Copy framework(s)
    if (fs.existsSync(paths.frameworks)) {
      var list = fs.readdirSync(paths.frameworks);
      var frameworks = list.filter(item => item.endsWith('.framework'));
      if (frameworks.length) {
        console.log('  ✓ Copy frameworks');
        fs.emptyDirSync(paths.frameworksBuild);
        frameworks.forEach(function (item) {
          fs.copySync(
            paths.frameworks + '/' + item,
            paths.frameworksBuild + '/' + item
          );
        });
      }
    }

    // Done :)
    console.log(chalk.green.bold('  ✓ Plugin compiled successfully'));
    console.log();

    callback();
  });
}

module.exports = build;
