'use strict'

const crypto = require('crypto')
const chalk  = require('chalk')
const styles = require('ansi-styles')

class PrintConfig {

  constructor( id ) {
    this._print = id

    this.chalk = new chalk.constructor

    for (const key in styles) {
      this.print[key] = this.chalk[key]
    }

    this.levels  = {}
    this.plugins = {}
    this.use     = {}

    // Defaults
    this.auto_trim = false

    this.level('log')
  }

  get print() {
    return Print._prints[this._print]
  }

  get use_color() {
    return this.chalk.enabled
  }

  set use_color(value) {
    this.chalk.enabled = value
  }

  get chalk_level() {
    return this.chalk.level
  }

  set chalk_level(value) {
    this.chalk.level = value
  }

  level(level, options) {

    if (this.levels.hasOwnProperty(level)) {
      Object.assign(this.levels[level], options)
      return
    }

    this.levels[level] = Object.assign({
      visible: true
    }, options || {})

    this.print[level] = function() {
      let str = [...arguments].join(' ')

      // Test log level visibility
      if (!this.levels[level].visible) return

      // Apply options
      str = this._applyPlugins( this.levels[level], str )

      this._log( str )
    }

    this.print[level] = this.print[level].bind( this )

    this.print[level].format = function() {
      let str = [...arguments].join(' ')

      // Test log level visibility
      if (!this.levels[level].visible) return

      // Apply options
      str = this._applyPlugins( this.levels[level], str )

      return this._format( str )
    }

    this.print[level].format = this.print[level].format.bind( this )

  }

  plugin(name, fn, useByDefault) {
    this.plugins[name] = fn.bind(this)
    this.use[name]     = typeof useByDefault === 'boolean' ? useByDefault : true
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
    console.log.apply(
      null,
      this.format.apply(this, arguments)
    )
  }

  _format() {
    const args = Array.prototype.slice.apply(arguments)

    if (this.auto_trim) {
      for ( let i = 0, len = args.length; i < len; i++ ) {
        if (typeof args[i] === 'string' && args[i].trim)
          args[i] = args[i].trim()
      }
    }

    return args.join(' ')
  }

  _applyPlugins(level, str) {
    for (const key in level) {
      if (this.plugins[key] && this.use[key]) {
        str = this.plugins[key].call(this, str, level[key])
      }
    }

    return str
  }

}

class Print {

  constructor() {
    this.id = crypto.createHash('md5').update(Date.now().toString()).digest('hex')
    Print._prints[this.id] = this
    this.config = new PrintConfig( this.id )
  }

}

Print._prints = {}

module.exports = Print