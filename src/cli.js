#!/usr/bin/env node
const yargs = require('yargs')
const inquirer = require('inquirer')
const report = require('signale')
const initStarter = require('./init-starter')
const generators = require('./gulpfile');

var exec = require('child_process').exec;
function execute(command, callback){
    exec(command, function(error, stdout, stderr){ callback(stdout); });
};

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

// Python namespace on CLI
function py(version)
{
  let cmd = null
  switch (version) {
    case 3:
      cmd = 'python3'
    break
    default:
      cmd = 'python'
    break
  }
  return cmd
}

// Base
let cli = yargs()
cli
  .usage(`Usage: $0 <command> [options]`)
  .alias(`h`, `help`)
  .alias(`py`, `python`)
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
  .option(`python`, {
    default: null,
    type: 'number',
    describe: `Python version to use (2 or 3)`,
    global: true
  })

// Commands
return cli
      .command({ // Learn intents
        command: `learn intents`,
        desc: `Train bot to recognise intents`,
        handler: (argv) => {
          console.log('Training bot to recognise intents...');
          let python = py(argv.py);
          execute(`${python} -m rasa_nlu.train -c nlu_config.yml --data nlu_data/training_data.json -o models --fixed_model_name nlu --project current --verbose`, function(output) {
            console.log(output);
          });
        }
      })
      .command({ // Generate development files
        command: `make [generator]`,
        desc: `Generate files for extending Mind Stack functionality`,
        handler: ({generator}) => {
          return generators[generator]()
        }
      })
      .command({ // Create new bot instance
        command: `new [rootPath] [starter]`,
        desc: `Create a new Mind Stack project.`,
        handler: q(
          ({ rootPath, starter = `Truemedia/mindstack-starter-default` }) => {
            return initStarter(starter, { rootPath })
          }
        )
        // handler: handlerP(
        //   ({ rootPath, starter = `mindstack/mindstack-starter-default` }) => {
        //     return initStarter(starter, { rootPath })
        //   }
        // ),
      })
      .command({ // Launch NLU pipeline
        command: `pipeline nlu`,
        desc: `Run NLU pipeline`,
        handler: (argv) => {
          console.log('Running Rasa server...');
          let python = py(argv.py);
          execute(`${python} -m rasa_nlu.server --path models/`, function(output) {
            console.log(output);
          });
        }
      })
      .command({ // Run a bot instance
        command: `run`,
        desc: `Run a bot instance`,
        handler: () => {
          execute('node index.js', function(output) {
            process.stdout.write(output);
          });
        }
      })
      .wrap(cli.terminalWidth())
      .demandCommand(1, `Pass --help to see all available commands and options.`)
      .strict()
      .showHelpOnFail(true)
      .recommendCommands()
      .parse( process.argv.slice(2) )
