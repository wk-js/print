'use strict'

const chalk = require('chalk')

module.exports = function(str, styles) {

  let res  = str
  let stls = []

  if (typeof styles === 'string') stls.push( styles )

  if (Array.isArray(styles)) {
    stls = stls.concat(styles)
  }

  for (let i = 0, ilen = stls.length; i < ilen; i++) {
    if (chalk[stls[i]]) {
      res = chalk[stls[i]]( res )
    }
  }

  return res
}