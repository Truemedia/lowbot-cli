#!/usr/bin/env node
const yargs = require('yargs')
const initStarter = require('./init-starter')

const handlerP = fn => (...args) => {
  Promise.resolve(fn(...args)).then(
    () => process.exit(0),
    err => report.panic(err)
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
        handler: handlerP(
          ({ rootPath, starter = `lowbot/lowbot-starter-default` }) => {
            return initStarter(starter, { rootPath })
          }
        ),
      })
      .wrap(cli.terminalWidth())
      .demandCommand(1, `Pass --help to see all available commands and options.`)
      .strict()
      .showHelpOnFail(true)
      .recommendCommands()
      .parse( process.argv.slice(2) )
