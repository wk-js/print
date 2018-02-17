import { PrintConfigExtension, PrintConfig } from "../print";

export const StyleExtension = {
  name: 'style',
  use: true,
  callback: function(this:PrintConfig, str:string, options: any, extension: PrintConfigExtension ) {
    const print = this.print as any

    if (options.styles) {
      for (let i = 0, ilen = options.styles.length; i < ilen; i++) {
        if (print[options.styles[i]]) {
          str = print[options.styles[i]]( str )
        }
      }
    }

    return str
  }
}