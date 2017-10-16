const request = require('request-promise-native');

const reqParams = (page, user) => ({
  method: 'GET',
  url: `https://api.github.com/users/${user}/repos?page=${page}&per_page=100`,
  headers: {
    'User-Agent': 'git-idle CLI',
    host: 'api.github.com',
  },
});

let responseFull = [];


const requestPage = (page, user) => request(reqParams(page, user)).then(data => JSON.parse(data));

const getRepositories = async (page, user) => {
  const pagedResponse = await requestPage(page, user);
  responseFull = responseFull.concat(pagedResponse);
  if (pagedResponse.length === 100) {
    const size = page + 1;
    await getRepositories(size, user);
  }

  return responseFull;
};

const filterRepositories = (data, param) => data.filter(item => item.name.includes(param));

const nonForked = data => data.filter(item => item.fork === false);


module.exports = { getRepositories, filterRepositories, nonForked };
