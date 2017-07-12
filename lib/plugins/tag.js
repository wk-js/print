'use strict'

const chalk = require('chalk')

module.exports = function(str, options) {
  let tag = `[${options.tag}]`

  if (options) {
    if (options.style) {
      options.styles = [ options.style ]
    }

    if (Array.isArray(options.styles)) {
      for (let i = 0, ilen = options.styles.length; i < ilen; i++) {
        if (chalk[options.styles[i]]) {
          tag = chalk[options.styles[i]]( tag )
        }
      }
    }
  }

  return `${tag} ${str}`
}