const inquirer = require('inquirer');
const {dest} = require('gulp');
const templateQ = require('./questions/name.json');
const Templates = require('./pipes/templates');

/**
  * Generate template
  */
module.exports = function template()
{
  return inquirer.prompt([
      templateQ
    ]).then(answers =>
      new Templates({tplName: answers.templateName}).pipeline().pipe( dest('./src/tpl') )
    );
}
