#!/usr/bin/env node
'use-strict';

const donkeyLog = require('./donkey-log');
const carrotOnAStick = require('./carrotOnAStick.js');

const ACTIONS = {
  START: 'start',
  BUILD: 'build',
  TEST: 'test',
  TEST_COVERAGE: 'test:cover'
};
const OPTIONS = {
  CONFIG: '--config'
};

const parseArguments = () => {
  const [,, ...args] = process.argv;
  let action = null;
  let config = null;
  if (Array.isArray(args) && args.length > 0) {
    if (typeof args[0] === 'string') {
      const actionMatch = Object.entries(ACTIONS).find((entry) => entry[1] === args[0]);
      if (typeof actionMatch !== 'undefined') {
        action = actionMatch[1];
      }
    }
    const configIndex = args.findIndex((argument) => typeof argument === 'string' && argument === OPTIONS.CONFIG) + 1;
    config = configIndex > 1 && configIndex < args.length ? args[configIndex] : null;
  }
  return {
    action,
    config
  };
};

const parameters = parseArguments();

donkeyLog.info(`retrieved [${parameters.action.toUpperCase()}] context`,
  `using [${parameters.config}] for configuration`);

switch (parameters.action) {
  case ACTIONS.START:
    carrotOnAStick.start(parameters.config);
    break;
  case ACTIONS.TEST:
    carrotOnAStick.test();
    break;
  case ACTIONS.TEST_COVERAGE:
    carrotOnAStick.testWithCoverage();
    break;
  default:
    donkeyLog.error('the requested action was not recognized');
}
