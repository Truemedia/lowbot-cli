#!/usr/bin/env node
const yargs = require('yargs')
const inquirer = require('inquirer')
const report = require('signale')
const initStarter = require('./init-starter')

const q = fn => (...args) => {
  return inquirer.prompt([
    {
      name: 'stack',
      type: 'list',
      message: 'Which JAMstack are you using to power the bot as a data service?',
      choices: ['Gatsby', 'Gridsome']
    }
  ]).then(answers => {
    console.log('stack', answers.stack);
    return fn(...args)
  }).then(
    () => process.exit(0),
    err => report.error(err)
  )
}

// Base
let cli = yargs()
cli
  .usage(`Usage: $0 <command> [options]`)
  .alias(`h`, `help`)
  .alias(`v`, `version`)
  .option(`verbose`, {
    default: false,
    type: `boolean`,
    describe: `Turn on verbose output`,
    global: true,
  })
  .option(`no-color`, {
    default: false,
    type: `boolean`,
    describe: `Turn off the color in output`,
    global: true,
  })

// Commands
return cli
      .command({
        command: `new [rootPath] [starter]`,
        desc: `Create new Lowbot project.`,
        handler: q(
          ({ rootPath, starter = `Truemedia/lowbot-starter-default` }) => {
            return initStarter(starter, { rootPath })
          }
        )
        // handler: handlerP(
        //   ({ rootPath, starter = `lowbot/lowbot-starter-default` }) => {
        //     return initStarter(starter, { rootPath })
        //   }
        // ),
      })
      .wrap(cli.terminalWidth())
      .demandCommand(1, `Pass --help to see all available commands and options.`)
      .strict()
      .showHelpOnFail(true)
      .recommendCommands()
      .parse( process.argv.slice(2) )
