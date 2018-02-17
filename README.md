## Print

```js
'use strict'

const { Print } = require( 'wk-print/js/print' )
const { WarnCategory } = require('wk-print/js/categories/warn')
const { DateExtension } = require( 'wk-print/js/extensions/date' )
const { StyleExtension } = require( 'wk-print/js/extensions/style' )
const { TagExtension } = require( 'wk-print/js/extensions/tag' )

const P = new Print

// Test default log
P.log('Hello World')

// Test level
P.config.category({
  name: 'debug',
  extensions: {
    style: { styles: ['grey', 'underline'] }
  }
})

// Test level with a plugin
P.config.extension(StyleExtension)
P.debug('Grey log underlined')

// Test custom plugin
P.config.extension({
  name: 'arrow',
  callback: function(str) {
    return `➜ ` + str
  }
})
P.config.category({
  name: 'debug',
  extensions: {
    arrow: true
  }
})
P.debug('Grey log underlined with an arrow')

// Override plugin
P.config.category({
  name: 'debug',
  extensions: {
    arrow: { tiret: true }
  }
})
P.config.extension({
  name: 'arrow',
  callback: function(str, options) {
    // console.log(P.hex('#ffaa22')('lol'))
    return P.green(options.tiret ? '- ' : '➜ ') + str
  }
})
P.debug('Grey log underlined with a green tiret')

// Use preconfigured level
P.config.category(WarnCategory)
P.warn('Yellow log')

// Add more plugins
P.config.extension(DateExtension)
P.config.extension(TagExtension)
P.warn('Yellow log with date and tag')

// Update log display
P.config.display('warn', false)
P.warn('Yellow log hidden')  // Nothing printed

P.config.display('warn', true)
P.warn('Yellow log display') // Somethin printed

// Hide every log
P.config.silent()
P.log('Log hidden')
P.debug('Debug log hidden')
P.warn('Warn log hidden')

// Show every log
P.config.verbose()
P.log('Log display')
P.debug('Debug log display')
P.warn('Warn log display')

// Disable auto trim
P.log('\nLog not trimmed\n')
P.log(P.config.trim('\nLog trimmed\n'))
P.config.auto_trim = true
P.log('\nLog trimmed\n')
```