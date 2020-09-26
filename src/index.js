#!/usr/bin/env node
const chalk = require('chalk');
const { increment, setVersion } = require('./semVerManifest');

// function semVerManifest() {
// }

// semVerManifest();


require('yargs') // eslint-disable-line
  .scriptName('ui5-semver')
  .usage('Usage: $0 <command> [options]')
  .command('increment', 'increment given version category of manifest.json', (yargs) => {
    yargs
      .positional('category', {
        alias: 'c',
        describe: 'version category to increment',
        default: 'patch',
        choices: ['major', 'minor', 'patch'],
        type: 'string'
      });
  }, (argv) => {
    console.log(chalk.yellow('>>> semantic versioning manifest.json >>>'));

    try {
      increment(argv.category, argv.verbose);
    } finally {
      console.log(chalk.yellow('<<< semantic versioning manifest.json <<<'));
    }
  })
  .alias('increment', 'i')
  .nargs('i', 1)
  .command('specify', 'specify version of manifest.json', (yargs) => {
    yargs
      .positional('number', {
        alias: 'n',
        describe: 'version number to set, format <X.X.X> with X = integer from 0 to 999',
        type: 'string'
      });
  }, (argv) => {
    if (argv.verbose) console.log(chalk.yellow('>>> semantic versioning manifest.json >>>'));

    try {
      setVersion(argv.number, argv.verbose);
    } finally {
      if (argv.verbose) console.log(chalk.yellow('<<< semantic versioning manifest.json <<<'));
    }
  })
  .alias('specify', 's')
  .nargs('number', 1)
  .help('help')
  .alias('help', 'h').argv;
