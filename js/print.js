"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const crypto_1 = require("crypto");
const object_1 = require("lol/utils/object");
const log_1 = require("./categories/log");
const style_1 = require("./extensions/style");
function ExtensionNOOP(str) { return str; }
class Print extends chalk_1.default.constructor {
    constructor(options) {
        super(options);
        this._uid = crypto_1.createHash('md5').update(Date.now() + '').digest('hex');
        Print.prints[this._uid] = this;
        this.config = new PrintConfig(this._uid);
    }
}
Print.prints = {};
exports.Print = Print;
class PrintConfig {
    constructor(print_id) {
        this.print_id = print_id;
        this.categories = {};
        this.extensions = {};
        this.use = {};
        this.auto_trim = false;
        this.category(log_1.LogCategory);
        this.extension(style_1.StyleExtension);
    }
    get print() {
        return Print.prints[this.print_id];
    }
    color(enabled) {
        if (typeof enabled === 'boolean') {
            this.print.enabled = enabled;
        }
        return this.print.enabled;
    }
    level(level) {
        if (typeof level === 'boolean') {
            this.print.level = level;
        }
        return this.print.level;
    }
    category(keyOrCategory) {
        let key, options = null;
        if (typeof keyOrCategory === 'string') {
            key = keyOrCategory;
        }
        else {
            options = keyOrCategory;
            key = options.name;
        }
        if (!options) {
            return this.categories[key];
        }
        if (this.categories.hasOwnProperty(key)) {
            object_1.merge(this.categories[key], options);
            return this.categories[key];
        }
        const category = this.categories[key] = Object.assign({
            visible: true
        }, (options || {}));
        const self = this;
        const print = this.print;
        print[key] = function (...messages) {
            let str = Array.prototype.slice.apply(arguments).join(' ');
            // Test log category visibility
            if (!category.visible)
                return;
            // Apply extensions
            str = self._applyExtensions(category, str);
            self._log(str);
        };
        return this.categories[key];
    }
    extension(keyOrExtension) {
        let key, options = null;
        if (typeof keyOrExtension === 'string') {
            key = keyOrExtension;
        }
        else {
            options = keyOrExtension;
            key = options.name;
        }
        if (!options) {
            return this.extensions[key];
        }
        this.extensions[key] = Object.assign({
            use: true,
            config: {},
            callback: ExtensionNOOP
        }, options);
    }
    trim(value) {
        return value.toString().replace(/^(\s|\n)+|(\s|\n)+$/g, '');
    }
    display(category, visible) {
        const cat = this.categories[category];
        if (!cat)
            return false;
        if (typeof visible === 'boolean') {
            cat.visible = visible;
        }
        return cat;
    }
    silent() {
        for (const key in this.categories) {
            this.display(key, false);
        }
    }
    verbose() {
        for (const key in this.categories) {
            this.display(key, true);
        }
    }
    filter(category) {
        this.silent();
        this.display(category, true);
    }
    _log(...messages) {
        console.log(this._format.apply(this, messages));
    }
    _format(...messages) {
        const args = Array.prototype.slice.apply(messages);
        if (this.auto_trim) {
            for (let i = 0, len = args.length; i < len; i++) {
                if (typeof args[i] === 'string' && args[i].trim)
                    args[i] = args[i].trim();
            }
        }
        return args.join(' ');
    }
    _applyExtensions(category, str) {
        if (!category.extensions)
            return str;
        for (const key in category.extensions) {
            if (this.extensions[key] && this.extensions[key].use) {
                str = this.extensions[key].callback.call(this, str, category.extensions[key], this.extensions[key]);
            }
        }
        return str;
    }
}
exports.PrintConfig = PrintConfig;
