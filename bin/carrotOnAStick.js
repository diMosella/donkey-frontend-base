'use-strict';

const childProcess = require('child_process');
const path = require('path');
const fs = require('fs');
const donkeyLog = require('../src/utils/donkey-log');

const SRC = 'src';
const TEST = 'test';
const MODULES = 'node_modules';
const PROJECT = 'project';
const UP = '../';
const IDEM = './';
const ARG_LABELS = {
  CONFIG: '--projectConfig',
  PATH: '--projectPath',
  MODULES: '--projectModules',
  MOCHA: {
    CONFIG: '--config',
    WATCH: '--watch',
    REPORTER: '--reporter',
    EXTENSIONS: '--watch-extensions'
  },
  WEBPACK: {
    MODE: '--mode'
  }
};
const ARG_VALUES = {
  MOCHA: {
    CONFIG: '.mocharc.js',
    REPORTER: 'min',
    EXTENSIONS: 'jsx'
  },
  WEBPACK: {
    MODE: 'production'
  }
};
const COMMAND_PATHS = {
  DEV_SERVER: `${MODULES}/.bin/webpack-dev-server`,
  TEST_RUNNER: `${MODULES}/.bin/mocha`,
  COVERAGE_RUNNER: `${MODULES}/.bin/nyc`,
  BUILD: `${MODULES}/.bin/webpack`
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
      if (baseModulePath === projectPath) {
        donkeyLog.info(`the locations are the same`,
          `in that case the project source is already included. Therefore the symbolic link will be removed...`);
        fs.unlinkSync(localProjectPath);
        return;
      }
    }
  }

  if (projectExists && !isLinkToProjectSrc) {
    donkeyLog.warning(`the location [${path.join(SRC, PROJECT)}] already exists`,
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
  const projectPath = path.join(process.cwd(), IDEM);
  const baseModulePath = path.join(__dirname, UP);
  const serverCommandPath = path.join(baseModulePath, COMMAND_PATHS.DEV_SERVER);
  const projectModulesPath = path.join(projectPath, MODULES);

  syncProjectSourcePath(baseModulePath, projectPath);
  process.chdir(baseModulePath);
  const commandArgs = [ARG_LABELS.PATH, projectPath, ARG_LABELS.MODULES, projectModulesPath];
  if (typeof configPath === 'string') {
    commandArgs.unshift(ARG_LABELS.CONFIG, configPath);
  }

  runCommand(serverCommandPath, commandArgs, (error) => {
    if (error) {
      donkeyLog.error(error.message);
      throw error;
    }
    donkeyLog.info('finished running the server command');
  });
};

exports.test = () => {
  const baseModulePath = path.join(__dirname, UP);
  const testCommandPath = path.join(baseModulePath, COMMAND_PATHS.TEST_RUNNER);
  const testConfigPath = path.join(baseModulePath, ARG_VALUES.MOCHA.CONFIG);

  process.env.NODE_ENV = TEST;
  process.env.NODE_PATH = `${process.env.NODE_PATH}:${path.join(baseModulePath, MODULES)}`;
  process.env.DONKEY_PATH = baseModulePath;
  const commandArgs = [ ARG_LABELS.MOCHA.CONFIG, testConfigPath ];
  runCommand(testCommandPath, commandArgs, (error) => {
    if (error) {
      donkeyLog.error(error.message);
    }
    donkeyLog.info('finished running the test command');
  });
};

exports.testWithCoverage = () => {
  const baseModulePath = path.join(__dirname, UP);
  const coverageCommandPath = path.join(baseModulePath, COMMAND_PATHS.COVERAGE_RUNNER);
  const testCommandPath = path.join(baseModulePath, COMMAND_PATHS.TEST_RUNNER);
  const testConfigPath = path.join(baseModulePath, ARG_VALUES.MOCHA.CONFIG);

  process.env.NODE_ENV = TEST;
  process.env.NODE_PATH = `${process.env.NODE_PATH}:${path.join(baseModulePath, MODULES)}`;
  process.env.DONKEY_PATH = baseModulePath;
  runCommand(coverageCommandPath, [ testCommandPath, ARG_LABELS.MOCHA.CONFIG, testConfigPath ], (error) => {
    if (error) {
      donkeyLog.error(error.message);
    }
    donkeyLog.info('finished running the test with coverage command');
  });
};

exports.build = (configPath) => {
  const projectPath = path.join(process.cwd(), IDEM);
  const baseModulePath = path.join(__dirname, UP);
  const buildCommandPath = path.join(baseModulePath, COMMAND_PATHS.BUILD);
  const projectModulesPath = path.join(projectPath, MODULES);

  syncProjectSourcePath(baseModulePath, projectPath);
  process.chdir(baseModulePath);
  const commandArgs = [ARG_LABELS.PATH, projectPath, ARG_LABELS.MODULES, projectModulesPath,
    ARG_LABELS.WEBPACK.MODE, ARG_VALUES.WEBPACK.MODE];
  if (typeof configPath === 'string') {
    commandArgs.unshift(ARG_LABELS.CONFIG, configPath);
  }

  runCommand(buildCommandPath, commandArgs, (error) => {
    if (error) {
      donkeyLog.error(error.message);
      throw error;
    }
    donkeyLog.info('finished running the build command');
  });
};
