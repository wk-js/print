"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StyleExtension = {
    name: 'style',
    use: true,
    callback: function (str, options, extension) {
        const print = this.print;
        if (options.styles) {
            for (let i = 0, ilen = options.styles.length; i < ilen; i++) {
                if (print[options.styles[i]]) {
                    str = print[options.styles[i]](str);
                }
            }
        }
        return str;
    }
};
