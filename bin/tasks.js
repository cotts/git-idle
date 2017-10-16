const fs = require('fs');
const inquirer = require('inquirer');
const chalk = require('chalk');
const execa = require('execa');

const taskChoose = data => inquirer.prompt({
  type: 'list',
  name: 'name',
  message: `Select repository you wanna clone > ${chalk.green(data.length)} ${data.length > 1 ? 'repositories' : 'repository'} available`,
  choices: data
});

const taskChangeName = path => inquirer.prompt({
  type: 'input',
  name: 'name',
  message: 'Do you want to change the name?',
  default: () => path
});

const existsPath = path => inquirer.prompt({
  type: 'input',
  name: 'name',
  message: `path ${chalk.yellow(path)} already exists! Change name to continue`,
  default: () => path
});

const execCheck = path => !!(fs.existsSync(path) && fs.lstatSync(path).isDirectory());

const execRename = path => execCheck(path) ? existsPath(path).then(data => execRename(data.name)) : path;

const cloneGit = (user, repository, changed = null) => execa.stdout('git', ['clone', `https://github.com/${user}/${repository}.git`, `${changed || ''}`]);

const skipInstall = path => !fs.existsSync(`${path}/package.json`);

const installPackages = path => execa.stdout('npm', ['install'], { cwd: path });

module.exports = {
  taskChoose,
  taskChangeName,
  existsPath,
  execCheck,
  execRename,
  cloneGit,
  installPackages,
  skipInstall
};