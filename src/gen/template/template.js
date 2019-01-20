const inquirer = require('inquirer');
const {dest} = require('gulp');
const templateQ = require('./questions/name.json');
const TemplateFiles = require('./pipes/templates');

/**
  * Generate template
  */
module.exports = function template()
{
  return inquirer.prompt([
      templateQ
    ]).then(answers =>
      new TemplateFiles({tplName: answers.templateName}).render().pipe( dest('./src/tpl') )
    );
}
