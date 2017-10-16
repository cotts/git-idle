#!/usr/bin/env node


const program = require('commander');
const pkg = require('../package.json');
const { gitIdle } = require('./gitIdle');

program.version(pkg.version).description('List, clone and install dependencies from a github repository direct by terminal').usage('<user> [options]').arguments('user, <user>', 'Select Github User Repository', { required: true }).option('-f, --filter <filter>', 'Filter for a specific name included').option('-n, --notforked', 'Show only not forked repositorires').option('-s, --skip', 'Skip install dependencies').parse(process.argv);

if (!program.args[0]) {
  program.help();
}

gitIdle(program.args[0], program.filter, program.notforked, program.skip);