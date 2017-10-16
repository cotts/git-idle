const nock = require('nock');
const chai = require('chai');
const { expect } = require('chai');


const {
  getRepositories, filterRepositories, nonForked, skipInstall,
} = require('../src/options');

describe('Options Methods', () => {
  const responseMock = [
    { name: 'AFNetworking', fork: true },
    { name: 'aptly', fork: true },
    { name: 'github', fork: false },
    { name: 'desktop', fork: false },
  ];
  describe('Smoke Tests', () => {
    it('should exist the getRepositories Method', () => {
      expect(getRepositories).to.exist;
    });
    it('should exist the filterRepositories Method', () => {
      expect(filterRepositories).to.exist;
    });
    it('should exist the nonForked Method', () => {
      expect(nonForked).to.exist;
    });
  });

  describe('Generic List', () => {
    it('should return a list of repositories from a github user', async () => {
      nock('https://api.github.com/users/github/repos?page=0&per_page=100', { reqheaders: { 'User-Agent': 'git-idle CLI' } })
        .get('')
        .query(true)
        .reply(200, responseMock);

      const repos = await getRepositories(0, 'github');
      expect(repos).to.be.eql(responseMock);
    });

    it('should filter when a parameter after --filter is passed', () => {
      const filtered = filterRepositories(responseMock, 'git');
      expect(filtered).to.be.eql([{ name: 'github', fork: false }]);
    });

    it('should filter for non-forked repositories when option --nf is passed', () => {
      const notFork = nonForked(responseMock);
      expect(notFork).to.be.eql([{ name: 'github', fork: false }, { name: 'desktop', fork: false }]);
    });
  });
});
