const inquirer = require('inquirer');
const {dest} = require('gulp');
const resolverQ = require('./questions/name.json');
const templateQ = require('./../template/questions/name.json');
const ResolverFile = require('./pipes/resolver');

/**
  * Generate resolver
  */
module.exports = function resolver()
{
  return inquirer.prompt([
      resolverQ, Object.assign(templateQ, {default: answers => answers.resolverName})
    ]).then(answers => {
      let build = answers;
      new ResolverFile(build).render().pipe( dest('./src/resolvers') )
    });
}
