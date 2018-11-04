'use-strict';

const childProcess = require('child_process');
const path = require('path');

exports.start = (config) => {
  const projectPath = path.join(process.cwd());
  const configPath = path.join(config);
  const baseModulePath = path.join(__dirname, '../../');
  const serverCommandPath = path.join(baseModulePath, 'node_modules/.bin/webpack-dev-server');
  process.chdir(baseModulePath);

  /**
   * Command runner
   * @param {string} commandPath The command to execute
   * @param {func} callback The function to call when finished, to enable error reporting
   */
  const runCommand = (commandPath, callback) => {
    // keep track of whether callback has been invoked to prevent multiple invocations
    let invoked = false;
    const process = childProcess.fork(`${commandPath}`, ['--projectConfig', configPath, '--projectPath', projectPath]);

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

  runCommand(serverCommandPath, (error) => {
    if (error) {
      throw error;
    }
    console.log('[ Donkey ]: finished running the server command');
  });
};
