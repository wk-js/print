"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const string_1 = require("lol/utils/string");
exports.DateExtension = {
    name: 'date',
    use: true,
    callback: function (str, options, extension) {
        const print = this.print;
        const d = new Date();
        const h = string_1.pad(d.getHours().toString(), 2, '0', false);
        const m = string_1.pad(d.getMinutes().toString(), 2, '0', false);
        const s = string_1.pad(d.getSeconds().toString(), 2, '0', false);
        let date = `[${h}:${m}:${s}]`;
        if (options.styles) {
            for (let i = 0, ilen = options.styles.length; i < ilen; i++) {
                if (print[options.styles[i]]) {
                    date = print[options.styles[i]](date);
                }
            }
        }
        return `${date} ${str}`;
    }
};
