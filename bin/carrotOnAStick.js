'use-strict';

const childProcess = require('child_process');
const path = require('path');
const fs = require('fs');
const donkeyLog = require('./donkey-log');

const SRC = 'src';
const PROJECT = 'project';
const UP = '../';
const OPTIONS = {
  CONFIG: '--projectConfig',
  PATH: '--projectPath'
};
const COMMAND_PATHS = {
  DEV_SERVER: 'node_modules/.bin/webpack-dev-server',
  TEST_RUNNER: ''
};

/**
 * Check if there is a symbolic link at ./src/project, which points to a project source folder,
 * if this is not the case, it will be created irrespective of the current contents at this location
 * @param {string} baseModulePath The root path of this baseModule
 * @param {string} projectPath The root path of the project
 */
const syncProjectSourcePath = (baseModulePath, projectPath) => {
  const localProjectPath = path.join(baseModulePath, SRC, PROJECT);
  let isLinkToProjectSrc = false;
  const projectExists = fs.existsSync(localProjectPath) === true;
  if (projectExists) {
    const projectPathStat = fs.lstatSync(localProjectPath);
    if (projectPathStat.isSymbolicLink() === true) {
      const realProjectPath = fs.realpathSync(localProjectPath);
      if (typeof realProjectPath === 'string' && realProjectPath === path.join(projectPath, SRC)) {
        isLinkToProjectSrc = true;
      }
    }
  }

  if (projectExists && !isLinkToProjectSrc) {
    donkeyLog.warning(`the directory [${path.join(SRC, PROJECT)}] already exists`,
      `in that case it should point to the project source, but it doesn't. Therefore it wil be replaced...`);
    fs.unlinkSync(localProjectPath);
  }

  if (!isLinkToProjectSrc) {
    donkeyLog.info(`creating a symbolic link at location [./${path.join(SRC, PROJECT)}]`,
      `pointing to the project source`);
    process.chdir(path.join(baseModulePath, SRC));
    fs.symlinkSync(path.join(projectPath, SRC), PROJECT);
  } else {
    donkeyLog.info(`found a symbolic link at location [./${path.join(SRC, PROJECT)}]`,
      `pointing to the project source`);
  }
};

/**
   * Command runner
   * @param {string} commandPath The command to execute
   * @param {func} callback The function to call when finished, to enable error reporting
   */
const runCommand = (commandPath, options, callback) => {
  // keep track of whether callback has been invoked to prevent multiple invocations
  let invoked = false;
  const process = childProcess.fork(`${commandPath}`, options);
  // errors might prevent triggering the exit event
  process.on('error', (error) => {
    if (!invoked) {
      invoked = true;
      callback(error);
    }
  });
  // execute the callback once the process has finished running
  process.on('exit', (code) => {
    if (!invoked) {
      invoked = true;
      const error = code !== 0
        ? new Error('exit code ' + code)
        : null;
      callback(error);
    }
  });
};

exports.start = (configPath) => {
  const projectPath = path.join(process.cwd());
  const baseModulePath = path.join(__dirname, UP);
  const serverCommandPath = path.join(baseModulePath, COMMAND_PATHS.DEV_SERVER);

  syncProjectSourcePath(baseModulePath, projectPath);
  process.chdir(baseModulePath);

  runCommand(serverCommandPath, [OPTIONS.CONFIG, configPath, OPTIONS.PATH, projectPath], (error) => {
    if (error) {
      donkeyLog.error(error.message);
      throw error;
    }
    donkeyLog.info('finished running the server command');
  });
};

exports.test = (configPath) => {
  donkeyLog.info('about to go testing');
};
