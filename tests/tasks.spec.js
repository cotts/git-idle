const nock = require('nock');
const chai = require('chai');
const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const sinonStubPromise = require('sinon-stub-promise');
const inquirer = require('inquirer');
const chalk = require('chalk');
const listr = require('listr');
const execa = require('execa');

const {
  taskChoose,
  taskChangeName,
  existsPath,
  execCheck,
  execRename,
  cloneGit,
  installPackages,
  skipInstall,
} = require('../src/tasks');

chai.use(sinonChai);
sinonStubPromise(sinon);

describe('Tasks Methods', () => {
  const responseMock = [
    { name: 'AFNetworking', fork: true },
    { name: 'aptly', fork: true },
    { name: 'github', fork: false },
    { name: 'desktop', fork: false },
  ];

  const choose = {
    type: 'list',
    name: 'name',
    message: `Select repository you wanna clone > ${chalk.green(4)} repositories available`,
    choices: responseMock,
  };

  const change = {
    type: 'input',
    name: 'name',
    message: 'Do you want to change the name?',
  };

  const exists = {
    type: 'input',
    name: 'name',
    message: `path ${chalk.yellow('github')} already exists! Change name to continue`,
  };

  let inquirerStub;
  let inquirerPromise;
  let execStub;

  beforeEach(() => {
    inquirerStub = sinon.stub(inquirer, 'prompt');
    inquirerPromise = inquirerStub.returnsPromise();
    execStub = sinon.stub(execa, 'stdout');
  });

  afterEach(() => {
    inquirerStub.restore();
    execStub.restore();
  });

  describe('Smoke Tests', () => {
    it('should taskChoose method to exists', () => {
      expect(inquirerStub).to.exist;
    });
    it('should taskChange method to exist', () => {
      expect(inquirerStub).to.exist;
    });
    it('should existsPath method to exist', () => {
      expect(inquirerStub).exist;
    });
    it('should execCheck method to exist', () => {
      expect(execCheck).to.exist;
    });
    it('should execRename method to exist', () => {
      expect(execRename).to.exist;
    });
    it('should cloneGit method to exist', () => {
      expect(cloneGit).to.exist;
    });
    it('should exist the skipInstall Method', () => {
      expect(skipInstall).to.exist;
    });
    it('should installPackages method to exist', () => {
      expect(installPackages).to.exist;
    });
  });

  describe('Prompt Methods Call working', () => {
    it('should return a list of repositories when the CLI started with a valid user', () => {
      const task = taskChoose(responseMock);
      expect(inquirerStub.getCall(0).args[0]).to.contains(choose);
    });

    it('should show a prompt to change name if wanted', () => {
      const wannaChange = taskChangeName('github');
      expect(inquirerStub.getCall(0).args[0]).to.contains(change);
    });

    it('should return a prompt if path already exists', () => {
      const hasPath = existsPath('github');
      expect(inquirerStub.getCall(0).args[0]).to.contains(exists);
    });
  });

  describe('Executable Runners', () => {
    context('Validate path', () => {
      it('should return false if a path does not exist', () => {
        const exist = execCheck('../node');
        expect(exist).to.be.eql(false);
      });
      it('should return path if path does not exist', () => {
        const rename = execRename('node');
        expect(rename).to.be.eql('node');
      });
    });

    it('should execute git-clone after the prompts finishes', () => {
      const clone = cloneGit('github', 'desktop');
      expect(execStub).to.have.been.calledWith('git', ['clone', 'https://github.com/github/desktop.git', '']);
    });

    context('should run npm install inside folder after git clone execute', () => {
      it('run inside the same folder if there is no changed name', () => {
        const install = installPackages('github');
        expect(execStub).to.have.been.calledWith('npm', ['install'], { cwd: 'github' });
      });
      it('run inside the another folder when the name is changed', () => {
        const install = installPackages('desktop');
        expect(execStub).to.have.been.calledWith('npm', ['install'], { cwd: 'desktop' });
      });
    });
  });
});
