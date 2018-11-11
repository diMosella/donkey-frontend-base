'use strict';

// https://raw.githubusercontent.com/omnidan/node-emoji/master/lib/emoji.json
const SYMBOLS = {
  INFO: '🌶',
  WARNING: '❓',
  ERROR: '✖️'
};

const DELIMITER = ', ';

const PREFIX = '｢donkey｣:';

// see https://en.wikipedia.org/wiki/ANSI_escape_code#Colors for colored output
const COLORS = {
  INFO: '\x1b[38;5;208m%s\x1b[38;5;223m\x1b[3m%s\x1b[0m',
  WARNING: '\x1b[38;5;226m%s\x1b[38;5;223m\x1b[3m%s\x1b[0m',
  ERROR: '\x1b[38;5;196m%s\x1b[38;5;223m\x1b[1m\x1b[3m%s\x1b[0m'
};

// TODO: markdown to ansi syntax?

exports.info = (...message) =>
  console.log(COLORS.INFO, SYMBOLS.INFO, ` ${PREFIX}`, `info - ${message.join(DELIMITER)}`);
exports.warning = (...message) =>
  console.warn(COLORS.WARNING, SYMBOLS.WARNING, ` ${PREFIX}`, `warning - ${message.join(DELIMITER)}`);
exports.error = (...message) =>
  console.error(COLORS.ERROR, SYMBOLS.ERROR, ` ${PREFIX}`, `error - ${message.join(DELIMITER)}`);
