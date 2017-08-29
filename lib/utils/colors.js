'use strict'

const styles = require('ansi-styles')

module.exports = {}

for (const key in styles) {
  module.exports[key] = function() {
    const str = [...arguments].join(' ')
    return `${styles[key].open}${str}${styles[key].close}`
  }
}

