'use-strict';

const childProcess = require('child_process');
const path = require('path');
const fs = require('fs');
const donkeyLog = require('./donkey-log');

const SRC = 'src';
const TEST = 'test';
const MODULES = 'node_modules';
const PROJECT = 'project';
const UP = '../';
const ARG_LABELS = {
  CONFIG: '--projectConfig',
  PATH: '--projectPath',
  MODULES: '--projectModules'
};
const COMMAND_PATHS = {
  DEV_SERVER: `${MODULES}/.bin/webpack-dev-server`,
  TEST_RUNNER: `${MODULES}/.bin/mocha`
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
   * @param {string[]} args The arguments to pass to the command
   * @param {func} callback The function to call when finished, to enable error reporting
   */
const runCommand = (commandPath, args, callback) => {
  // keep track of whether callback has been invoked to prevent multiple invocations
  let invoked = false;
  const forkedProcess = childProcess.fork(`${commandPath}`, args);
  // errors might prevent triggering the exit event
  forkedProcess.on('error', (error) => {
    if (!invoked) {
      invoked = true;
      callback(error);
    }
  });
  // execute the callback once the forkedProcess has finished running
  forkedProcess.on('exit', (code) => {
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
  const projectModulesPath = path.join(projectPath, MODULES);

  syncProjectSourcePath(baseModulePath, projectPath);
  process.chdir(baseModulePath);

  runCommand(serverCommandPath,
    [ARG_LABELS.CONFIG, configPath, ARG_LABELS.PATH, projectPath, ARG_LABELS.MODULES, projectModulesPath],
    (error) => {
      if (error) {
        donkeyLog.error(error.message);
        throw error;
      }
      donkeyLog.info('finished running the server command');
    }
  );
};

exports.test = (configPath) => {
  donkeyLog.info('about to go testing');
  const baseModulePath = path.join(__dirname, UP);
  const testCommandPath = path.join(baseModulePath, COMMAND_PATHS.TEST_RUNNER);
  const testConfigPath = path.join(baseModulePath, '.mocharc.js');

  process.env.NODE_ENV = TEST;
  process.env.NODE_PATH = `${process.env.NODE_PATH}:${path.join(baseModulePath, MODULES)}`;
  process.env.DONKEY_PATH = baseModulePath;
  runCommand(testCommandPath, [ '--config', testConfigPath ], (error) => {
    if (error) {
      donkeyLog.error(error.message);
    }
    donkeyLog.info('finished running the test command');
  });
};
