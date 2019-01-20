const inquirer = require('inquirer');
const {dest} = require('gulp');
const localeQ = require('./questions/name');
const LocaleFile = require('./pipes/locale');

/**
  * Generate locale
  */
module.exports = function locale()
{
  return inquirer.prompt([
      localeQ
    ]).then(answers => {
      let build = answers;
      new LocaleFile(build).render().pipe( dest('./src/locale') )
    });
}
