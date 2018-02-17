import { PrintConfigExtension, PrintConfig } from "../print";
import { pad } from "lol/utils/string";

export const DateExtension = {
  name: 'date',
  use: true,
  callback: function(this:PrintConfig, str:string, options: any, extension: PrintConfigExtension ) {
    const print = this.print as any

    const d = new Date();
    const h = pad(d.getHours()  .toString(), 2, '0', false)
    const m = pad(d.getMinutes().toString(), 2, '0', false)
    const s = pad(d.getSeconds().toString(), 2, '0', false)

    let date = `[${h}:${m}:${s}]`

    if (options.styles) {
      for (let i = 0, ilen = options.styles.length; i < ilen; i++) {
        if (print[options.styles[i]]) {
          date = print[options.styles[i]]( date )
        }
      }
    }

    return `${date} ${str}`
  }
}