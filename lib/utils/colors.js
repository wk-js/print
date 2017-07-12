'use strict'

const chalk = require('chalk')

module.exports = {}

for (const key in chalk.styles) {
  module.exports[key] = function() {
    const str = [...arguments].join(' ')
    return `${chalk.styles[key].open}${str}${chalk.styles[key].close}`
  }
}

