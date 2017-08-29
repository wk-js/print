'use strict'

const { Print, Plugins, Levels } = require('../index')

const P = new Print

// Test default log
P.log('Hello World')

// Test level
P.level('debug', {
  style: ['grey', 'underline']
})
P.debug('White log')

// Test level with a plugin
P.plugin('style', Plugins.style)
P.debug('Grey log underlined')

// Test custom plugin
P.plugin('arrow', function(str) {
  return `➜ ` + str
})
P.level('debug', {
  arrow: true
})
P.debug('Grey log underlined with an arrow')

// Override plugin
P.level('debug', {
  arrow: { tiret: true }
})
P.plugin('arrow', function(str, options) {
  return P.green(options.tiret ? '- ' : '➜ ') + str
})
P.debug('Grey log underlined with a green tiret')

// Use preconfigured level
P.level('warn', Levels.warn)
P.warn('Yellow log')

// Add more plugins
P.plugin('date', Plugins.date)
P.plugin('tag', Plugins.tag)
P.warn('Yellow log with date and tag')

// Update log visibility
P.visibility('warn', false)
P.warn('Yellow log hidden')
P.visibility('warn', true)
P.warn('Yellow log visible')

// Hide every log
P.silent()
P.log('Log hidden')
P.debug('Debug log hidden')
P.warn('Warn log hidden')

// Show every log
P.verbose()
P.log('Log visible')
P.debug('Debug log visible')
P.warn('Warn log visible')

// Disable auto trim
P.log('\nLog not trimmed\n')
P.log(P.trim('\nLog trimmed\n'))
P.auto_trim = true
P.log('\nLog trimmed\n')
