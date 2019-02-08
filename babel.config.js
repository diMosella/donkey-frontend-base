'use strict';

module.exports = function (api) {
  api.cache(true);

  const presets = [
    [
      '@babel/env',
      { 'loose': true }
    ],
    '@babel/preset-react'
  ];
  const plugins = [
    '@babel/plugin-proposal-function-bind',
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import',
    'react-hot-loader/babel'
  ];
  const env = {
    'test': {
      'plugins': [
        'istanbul'
      ]
    }
  };

  return {
    presets,
    plugins,
    env
  };
};
