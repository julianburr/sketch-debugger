process.env.NODE_ENV = 'production';

var rollup = require('rollup');
var babel = require('rollup-plugin-babel');
var fs = require('fs-extra');
var chalk = require('chalk');

var config = require('../../config/lib/rollup');
var paths = require('../../config/lib/paths');

// Start by clearing current build folder
console.log('Remove old lib production build...');
fs.emptyDirSync(paths.build);

// Then start rollup
console.log('Create new lib production build...');
build();

function build () {
  rollup.rollup(config).then(function (bundle) {
    // Write bundle to file
    console.log('Bundle rolled up...');
    bundle.write({
      format: 'cjs',
      dest: paths.build + '/index.js',
      exports: 'auto',
      sourceMap: false
    });

    // Done :)
    console.log(chalk.green('✓ Compiled successfully.'));
  }).catch(function (error) {
    // Catch any possible parse errors
    console.log(chalk.red('Compile failed!'), error);
  });
}