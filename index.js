'use strict'

const Print  = require('./lib/print')
const Print2 = require('./lib/print2')

module.exports = {
  Print: Print,
  Print2: Print2,

  Plugins: {
    style: require('./lib/plugins/style'),
    date: require('./lib/plugins/date'),
    tag: require('./lib/plugins/tag')
  },

  Levels: {
    log: {},

    debug: {
      style: 'grey',
      date: true
    },

    warn: {
      style: 'yellow',
      tag: {
        tag: '?!',
        style: 'yellow'
      },
      date: true
    },

    error: {
      style: 'red',
      tag: {
        tag: '!!',
        style: 'red'
      },
      date: true
    }
  }
}