#!/usr/bin/env node
'use-strict';

const carrotOnAStick = require('../src/utils/carrotOnAStick.js');

const ACTIONS = {
  START: 'start',
  TEST: 'test'
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

console.log('[ Donkey ]: received parameters', parameters);

switch (parameters.action) {
  case ACTIONS.START:
    carrotOnAStick.start(parameters.config);
    break;
  default:
    console.warn('[ Donkey ]: the requested action was not recognized');
}
