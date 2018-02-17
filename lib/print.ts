import chalk, { ChalkOptions, Level } from 'chalk'
import { createHash } from 'crypto';
import { merge } from 'lol/utils/object';
import { LogCategory } from './categories/log';
import { StyleExtension } from './extensions/style';

function ExtensionNOOP(str:string) { return str }

export class Print extends chalk.constructor {

  static prints: { [key:string]: Print } = {}

  private _uid:string
  config: PrintConfig

  constructor(options?:ChalkOptions) {
    super(options)
    this._uid = createHash('md5').update(Date.now()+'').digest('hex')
    Print.prints[this._uid] = this
    this.config = new PrintConfig( this._uid )
  }

}

export interface PrintConfigCategory {
  name: string,
  visible?: boolean,
  extensions?: {
    [key:string]: any
  }
}

export interface PrintConfigExtension {
  name: string,
  use?: boolean,
  config?: any,
  callback: (this: PrintConfig, value:string, categoryOptions:any, extension:PrintConfigExtension) => string
}

export class PrintConfig {

  categories: { [key:string]: PrintConfigCategory } = {}
  extensions: { [key:string]: PrintConfigExtension } = {}
  use        = {}

  auto_trim: boolean = false

  constructor(private print_id:string) {
    this.category(LogCategory)
    this.extension(StyleExtension)
  }

  get print() {
    return Print.prints[this.print_id]
  }

  color(enabled?:boolean) {
    if (typeof enabled === 'boolean') {
      this.print.enabled = enabled
    }
    return this.print.enabled
  }

  level(level?:Level) {
    if (typeof level === 'boolean') {
      this.print.level = level
    }
    return this.print.level
  }

  category( keyOrCategory:string | PrintConfigCategory ) {
    let key: string, options: PrintConfigCategory | null = null

    if (typeof keyOrCategory === 'string') {
      key = keyOrCategory as string
    } else {
      options = keyOrCategory
      key = options.name
    }

    if (!options) {
      return this.categories[key]
    }

    if (this.categories.hasOwnProperty(key)) {
      merge( this.categories[key], options )
      return this.categories[key]
    }

    const category = this.categories[ key ] = Object.assign({
      visible: true
    }, (options || {}) as PrintConfigCategory)

    const self = this

    const print = this.print as any
    print[key] = function(...messages:any[]) {
      let str = Array.prototype.slice.apply(arguments).join(' ')

      // Test log category visibility
      if (!category.visible) return

      // Apply extensions
      str = self._applyExtensions( category, str )

      self._log( str )
    }

    return this.categories[key];
  }

  extension( keyOrExtension:string | PrintConfigExtension ) {
    let key: string, options: PrintConfigExtension | null = null

    if (typeof keyOrExtension === 'string') {
      key = keyOrExtension as string
    } else {
      options = keyOrExtension
      key = options.name
    }

    if (!options) {
      return this.extensions[key]
    }

    this.extensions[key] = Object.assign({
      use: true,
      config: {},
      callback: ExtensionNOOP
    }, options)
  }

  trim(value:any) {
    return value.toString().replace(/^(\s|\n)+|(\s|\n)+$/g, '')
  }

  display(category:string, visible?:boolean) {
    const cat = this.categories[ category ]
    if (!cat) return false;

    if (typeof visible === 'boolean') {
      cat.visible = visible
    }

    return cat
  }

  silent() {
    for (const key in this.categories) {
      this.display(key, false)
    }
  }

  verbose() {
    for (const key in this.categories) {
      this.display(key, true)
    }
  }

  filter(category:string) {
    this.silent()
    this.display(category, true)
  }

  private _log(...messages:any[]) {
    console.log(this._format.apply(this, messages))
  }

  private _format(...messages:any[]) {
    const args = Array.prototype.slice.apply(messages)

    if (this.auto_trim) {
      for ( let i = 0, len = args.length; i < len; i++ ) {
        if (typeof args[i] === 'string' && args[i].trim)
          args[i] = args[i].trim()
      }
    }

    return args.join(' ')
  }

  private _applyExtensions( category:PrintConfigCategory, str:string ) {
    if (!category.extensions) return str

    for (const key in category.extensions) {
      if (this.extensions[key] && this.extensions[key].use) {
        str = this.extensions[key].callback.call(this, str, category.extensions[key], this.extensions[key])
      }
    }

    return str
  }

}