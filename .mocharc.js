'use strict';

const path = require('path');
const donkeyPath = process.env.DONKEY_PATH || './';
const babelRegister = path.join(donkeyPath, 'register.wrapper');
const setUp = path.join(donkeyPath, 'test', 'setup.js');

module.exports = {
  require: [
    babelRegister,
    'ignore-styles'
  ],
  file: setUp,
  spec: './src/**/*.spec.js'
};
