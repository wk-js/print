'use strict'

const chalk = require('chalk')

function pad(value, max, character, after) {
  if (value === undefined) return
  const s = value.toString();
  return s.length < max ? pad(after ? value+character : character+value, max, character, after) : s
}

module.exports = function(str, options) {
  const d = new Date();
  const h = pad(d.getHours(), 2, '0')
  const m = pad(d.getMinutes(), 2, '0')
  const s = pad(d.getSeconds(), 2, '0')

  let date = `[${h}:${m}:${s}]`

  if (typeof options === 'object') {
    if (options.style) {
      options.styles = [ options.style ]
    }

    if (Array.isArray(options.styles)) {
      for (let i = 0, ilen = options.styles.length; i < ilen; i++) {
        if (chalk.style[options.styles[i]]) {
          date = chalk.style[options.styles[i]]( date )
        }
      }
    }
  } else {
    date = chalk.cyan( date )
  }

  return `${date} ${str}`
}