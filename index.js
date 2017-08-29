'use strict'

const Print = require('./lib/print')

module.exports = {
  Print: Print,

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