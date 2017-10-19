'use strict'

const { Print, Plugins, Levels } = require('../index')

const P = new Print

// Test default log
P.log('Hello World')

// Test level
P.config.level('debug', {
  style: ['grey', 'underline']
})
P.debug('White log')

// Test level with a plugin
P.config.plugin('style', Plugins.style)
P.debug('Grey log underlined')

// Test custom plugin
P.config.plugin('arrow', function(str) {
  return `➜ ` + str
})
P.config.level('debug', {
  arrow: true
})
P.debug('Grey log underlined with an arrow')

// Override plugin
P.config.level('debug', {
  arrow: { tiret: true }
})
P.config.plugin('arrow', function(str, options) {
  // console.log(P.hex('#ffaa22')('lol'))
  return P.green(options.tiret ? '- ' : '➜ ') + str
})
P.debug('Grey log underlined with a green tiret')

// Use preconfigured level
P.config.level('warn', Levels.warn)
P.warn('Yellow log')

// Add more plugins
P.config.plugin('date', Plugins.date)
P.config.plugin('tag', Plugins.tag)
P.warn('Yellow log with date and tag')

// Update log visibility
P.config.visibility('warn', false)
P.warn('Yellow log hidden')  // Nothing printed

P.config.visibility('warn', true)
P.warn('Yellow log visible') // Somethin printed

// Hide every log
P.config.silent()
P.log('Log hidden')
P.debug('Debug log hidden')
P.warn('Warn log hidden')

// Show every log
P.config.verbose()
P.log('Log visible')
P.debug('Debug log visible')
P.warn('Warn log visible')

// Disable auto trim
P.log('\nLog not trimmed\n')
P.log(P.config.trim('\nLog trimmed\n'))
P.config.auto_trim = true
P.log('\nLog trimmed\n')
