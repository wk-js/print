import { PrintConfigExtension, PrintConfig } from "../print";

export const TagExtension = {
  name: 'tag',
  use: true,
  callback: function(this:PrintConfig, str:string, options: any, extension: PrintConfigExtension ) {
    const print = this.print as any

    let tag = `[${options.tag}]`

    if (options.styles) {
      for (let i = 0, ilen = options.styles.length; i < ilen; i++) {
        if (print[options.styles[i]]) {
          tag = print[options.styles[i]]( tag )
        }
      }
    }

    return `${tag} ${str}`
  }
}