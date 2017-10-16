const chai = require('chai');
const { expect } = require('chai');
const { exec } = require('child_process');


const gitIdle = './src/main.js';
const pkg = require('../package.json');

describe('Main Function git-idle', () => {
  it('should show help if no arguments is passed', (done) => {
    exec(`node ${gitIdle}`, (err, stdout, stderr) => {
      expect(stdout.includes('Usage: main <user> [options]')).to.be.true;
      done();
    });
  });

  it('should return version of git-idle', (done) => {
    exec(`node ${gitIdle} --version`, (err, stdout, stderr) => {
      if (err) throw err;
      expect(stdout.replace('\n', '')).to.be.equal(pkg.version);
      done();
    });
  });

  it('should return the description when git-idle --help', (done) => {
    exec(`node ${gitIdle} --help`, (err, stdout, stderr) => {
      if (err) throw err;
      expect(stdout.includes('List, clone and install dependencies from a github repository direct by terminal')).to.be.true;
      done();
    });
  });
  it('should return the user parameter when git-idle --help', (done) => {
    exec(`node ${gitIdle} --help`, (err, stdout, stderr) => {
      if (err) throw err;
      expect(stdout.includes('<user>')).to.be.true;
      done();
    });
  });

  it('should return the filter option when git-idle --help', (done) => {
    exec(`node ${gitIdle} --help`, (err, stdout, stderr) => {
      if (err) throw err;
      expect(stdout.includes('--filter')).to.be.true;
      done();
    });
  });

  it('should return the not-forked option when git-idle --help', (done) => {
    exec(`node ${gitIdle} --help`, (err, stdout, stderr) => {
      if (err) throw err;
      expect(stdout.includes('--notforked')).to.be.true;
      done();
    });
  });
  it('should return not install dependencies option when git-idle --help', (done) => {
    exec(`node ${gitIdle} --help`, (err, stdout, stderr) => {
      if (err) throw err;
      expect(stdout.includes('--skip')).to.be.true;
      done();
    });
  });
});
