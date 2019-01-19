const inquirer = require('inquirer');
const {dest} = require('gulp');
const localeQ = require('./questions/name');
const Locale = require('./pipes/locale');

/**
  * Generate locale
  */
module.exports = function locale()
{
  return inquirer.prompt([
      localeQ
    ]).then(answers =>
      new Locale(answers.localeName).pipeline().pipe( dest('./src/locale') )
    );
}
