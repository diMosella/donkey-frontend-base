'use strict';

const registerConfig = process.env.DONKEY_PATH
  ? { root: process.env.DONKEY_PATH }
  : null;

module.exports = require('@babel/register')(registerConfig);
