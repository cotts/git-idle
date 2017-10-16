const Listr = require('listr');
const ora = require('ora');
const { getRepositories, filterRepositories, nonForked } = require('./options');

const {
  taskChoose,
  taskChangeName,
  execRename,
  cloneGit,
  installPackages,
  skipInstall
} = require('./tasks');

const spinner = ora({
  text: 'Retrieving User Repositories...',
  color: 'yellow'
});

const gitIdle = async (user, filter = null, forked = null, skip) => {
  console.log('Starting git-idle');
  spinner.start();

  let list = await getRepositories(0, user);

  if (filter) list = await filterRepositories(list, filter);
  if (forked) list = await nonForked(list);

  spinner.stop();

  const repository = await taskChoose(list);
  const isChanged = await taskChangeName(repository.name).then(data => execRename(data.name));

  const tasks = new Listr([{
    title: `Starting Clone ${repository.name} ${isChanged !== repository.name ? `into ${isChanged} ` : ''}from ${user}`,
    task: () => cloneGit(user, repository.name, isChanged)
  }, {
    title: 'Installing packages with NPM',
    skip: () => {
      if (skipInstall(isChanged)) return 'No package.json found inside repository';
      if (skip) return 'Install dependencies skipped by user';
      return '';
    },
    task: () => installPackages(isChanged)
  }]);

  tasks.run();
};

module.exports = { gitIdle };