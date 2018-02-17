"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagExtension = {
    name: 'tag',
    use: true,
    callback: function (str, options, extension) {
        const print = this.print;
        let tag = `[${options.tag}]`;
        if (options.styles) {
            for (let i = 0, ilen = options.styles.length; i < ilen; i++) {
                if (print[options.styles[i]]) {
                    tag = print[options.styles[i]](tag);
                }
            }
        }
        return `${tag} ${str}`;
    }
};
