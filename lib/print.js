'use strict'

const _colors = require('./utils/colors')

class Print {

  constructor() {
    Object.assign(this, _colors)

    this.levels  = {}
    this.plugins = {}

    // Defaults
    this.auto_trim = false

    this.level('log')
  }

  new() {
    return new Print
  }

  level(level, options) {

    if (this.levels.hasOwnProperty(level)) {
      Object.assign(this.levels[level], options)
      return
    }

    this.levels[level] = Object.assign({
      visible: true
    }, options || {})

    this[level] = function() {
      let str = [...arguments].join(' ')

      // Test log level visibility
      if (!this.levels[level].visible) return

      // Apply options
      str = this._applyPlugins( this.levels[level], str )

      this._log( str )
    }

  }

  plugin(name, fn, useByDefault) {
    this.plugins[name] = fn.bind(this)
    this['use_'+name]  = typeof useByDefault === 'boolean' ? useByDefault : true
  }

  /**
   *
   *
   * @param string
   * @returns {string}
   */
  trim(value) {
    if (value === undefined) return
    return value.toString().replace(/^(\s|\n)+|(\s|\n)+$/g, '')
  }

  visibility(level, visibility) {
    if (this.levels[level]) {
      this.levels[level].visible = visibility
    }
  }

  silent() {
    for (const key in this.levels) {
      this.visibility(key, false)
    }
  }

  verbose() {
    for (const key in this.levels) {
      this.visibility(key, true)
    }
  }

  _log() {
    const args = arguments

    if (this.auto_trim) {
      for ( let i = 0, len = args.length; i < len; i++ ) {
        if (typeof args[i] === 'string' && args[i].trim)
          args[i] = args[i].trim()
      }
    }

    console.log.apply(null, args)
  }

  _applyPlugins(level, str) {
    for (const key in level) {
      if (this.plugins[key] && this['use_' + key]) {
        str = this.plugins[key](str, level[key])
      }
    }

    return str
  }

}

module.exports = Print